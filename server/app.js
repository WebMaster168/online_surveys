require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const ExcelJS = require("exceljs");

const app = express();
app.use(cors());
app.use(express.json());


// Подключение к MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error("Ошибка подключения:", err);
        return;
    }
    console.log("Подключено к MySQL");
});

// API для сохранения анкеты
app.post("/saveSurvey", (req, res) => {
    const { name, description, questions } = req.body;

    const query = "INSERT INTO surveys (name, description) VALUES (?, ?)";
    db.query(query, [name, description], (err, result) => {
        if (err) return res.status(500).json(err);

        const surveyId = result.insertId;

        // Сохраняем вопросы с порядком
        const questionQuery = 
            `INSERT INTO questions (survey_id, type, text, required, question_order) VALUES ?`
        ;

        const questionValues = questions.map((q, index) => [
            surveyId,
            q.type,
            q.text,
            q.required ? 1 : 0,
            index + 1, // порядок в анкете
        ]);

        db.query(questionQuery, [questionValues], (err, questionResult) => {
            if (err) return res.status(500).json(err);

            const firstQuestionId = questionResult.insertId;
            const optionValues = [];

            questions.forEach((q, index) => {
                if (q.options && q.options.length) {
                    q.options.forEach(option => {
                        optionValues.push([
                            firstQuestionId + index,
                            surveyId,
                            JSON.stringify(option), // Сохраняем объект как JSON
                        ]);
                    });
                }
            });

            if (optionValues.length) {
                const optionQuery =
                    "INSERT INTO options (question_id, survey_id, text) VALUES ?";
                db.query(optionQuery, [optionValues], (err) => {
                    if (err) return res.status(500).json(err);
                    res.status(200).json({ message: "Анкета сохранена" });
                });
            } else {
                res.status(200).json({ message: "Анкета сохранена" });
            }
        });
    });
});
app.get("/getSurvey/:id", (req, res) => {
    const surveyId = req.params.id;
    const query = 
        `SELECT s.id, s.name, s.description, 
               q.id AS question_id, q.type, q.text, q.required, q.question_order,
               o.id AS option_id, o.text AS option_text
        FROM surveys s
        JOIN questions q ON s.id = q.survey_id
        LEFT JOIN options o ON q.id = o.question_id AND o.survey_id = s.id
        WHERE s.id = ?
        ORDER BY q.question_order`
    ;

    db.query(query, [surveyId], (err, results) => {
        if (err) return res.status(500).json(err);
        if (!results.length) return res.status(404).json({ message: "Анкета не найдена" });

        const survey = {
            id: results[0].id,
            name: results[0].name,
            description: results[0].description,
            questions: [],
        };

        const questionMap = new Map();

        results.forEach(row => {
            if (!questionMap.has(row.question_id)) {
                questionMap.set(row.question_id, {
                    id: row.question_id,
                    type: row.type,
                    text: row.text,
                    required: !!row.required,
                    order: row.question_order,
                    options: [],
                });
            }

            if (row.option_id) {
                let parsedOption = row.option_text;
                try {
                    parsedOption = JSON.parse(row.option_text);
                } catch (e) {
                    // fallback на строку
                }

                questionMap.get(row.question_id).options.push({
                    id: row.option_id,
                    ...parsedOption, // если это объект, разворачиваем его
                });
            }
        });

        survey.questions = Array.from(questionMap.values());
        res.status(200).json(survey);
    });
});

app.post("/updateSurvey", (req, res) => {
    const { surveyId, name, description, questions } = req.body;

    // 1. Обновляем основную информацию анкеты
    const updateSurveyQuery = "UPDATE surveys SET name = ?, description = ? WHERE id = ?";
    db.query(updateSurveyQuery, [name, description, surveyId], (err) => {
        if (err) return res.status(500).json({ error: "Ошибка обновления анкеты", details: err });

        // 2. Обрабатываем вопросы
        const questionPromises = questions.map(q => {
            return new Promise((resolve, reject) => {
                if (q.id) {
                    // Если у вопроса есть ID → обновляем его
                    const updateQuestionQuery = "UPDATE questions SET type = ?, text = ? WHERE id = ?";
                    db.query(updateQuestionQuery, [q.type, q.text, q.id], (err) => {
                        if (err) return reject(err);
                        handleOptions(q.id, q.options, resolve, reject);
                    });
                } else {
                    // Если у вопроса нет ID → добавляем его в БД
                    const insertQuestionQuery = "INSERT INTO questions (survey_id, type, text) VALUES (?, ?, ?)";
                    db.query(insertQuestionQuery, [surveyId, q.type, q.text], (err, result) => {
                        if (err) return reject(err);
                        const newQuestionId = result.insertId; // ID нового вопроса
                        handleOptions(newQuestionId, q.options, resolve, reject);
                    });
                }
            });
        });

        Promise.all(questionPromises)
            .then(() => res.status(200).json({ message: "Анкета успешно обновлена" }))
            .catch(err => res.status(500).json({ error: "Ошибка обновления", details: err }));
    });
});

// Функция для обновления или добавления вариантов ответов
function handleOptions(questionId, options, resolve, reject) {
    const optionPromises = options.map(opt => {
        return new Promise((resolveOpt, rejectOpt) => {
            if (opt.id) {
                // Обновление существующего варианта ответа
                const updateOptionQuery = "UPDATE options SET text = ? WHERE id = ?";
                db.query(updateOptionQuery, [opt.text, opt.id], (err) => {
                    if (err) return rejectOpt(err);
                    resolveOpt();
                });
            } else {
                // Добавление нового варианта ответа
                const insertOptionQuery = "INSERT INTO options (question_id, text) VALUES (?, ?)";
                db.query(insertOptionQuery, [questionId, opt.text], (err) => {
                    if (err) return rejectOpt(err);
                    resolveOpt();
                });
            }
        });
    });

    Promise.all(optionPromises)
        .then(() => resolve())
        .catch(reject);
}
app.get("/getSurveys", (req, res) => {
    const query = "SELECT id, name FROM surveys";

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

app.post("/saveAnswers", (req, res) => {
    const { id: surveyId, answersOnQuestions } = req.body;

    if (!surveyId || !answersOnQuestions) {
        return res.status(400).json({ error: "Некорректные данные" });
    }

    // Сохраняем общую запись об участии в опросе
    const insertSurveyAnswerQuery = "INSERT INTO survey_answers (survey_id) VALUES (?)";
    db.query(insertSurveyAnswerQuery, [surveyId], (err, result) => {
        if (err) return res.status(500).json({ error: "Ошибка сохранения анкеты", details: err });

        const surveyAnswerId = result.insertId;
        const values = [];

        answersOnQuestions.forEach(answer => {
            if (answer.optionId && answer.value) {
                console.log(answer)
                // Ранговый вопрос
                values.push([
                    surveyAnswerId,
                    surveyId,
                    answer.questionId,
                    answer.questionText,
                    `Опция "${answer.optionText}": место ${answer.value}`
                ]);
            } else if (answer.value) {
                // Открытый вопрос
                values.push([
                    surveyAnswerId,
                    surveyId,
                    answer.questionId,
                    answer.questionText,
                    answer.value
                ]);
            } else if (answer.options) {
                console.log(answer)
                // Радио/чекбоксы (массив выбранных)
                answer.options.forEach(opt => {
                    values.push([
                        surveyAnswerId,
                        surveyId,
                        answer.questionId,
                        answer.questionText,
                        opt.text
                    ]);
                });
            }
        });

        if (!values.length) {
            return res.status(200).json({ message: "Ответы сохранены (пусто)" });
        }

        const insertAnswersQuery = 
            `INSERT INTO answer_on_questions 
            (survey_answer_id, survey_id, question_id, question_text, answer_text) 
            VALUES ?`;

        db.query(insertAnswersQuery, [values], (err2) => {
            if (err2) return res.status(500).json({ error: "Ошибка сохранения ответов", details: err2 });
            res.status(200).json({ message: "Ответы успешно сохранены" });
        });
    });
});

app.get("/downloadAnswers/:surveyId", (req, res) => {
    const surveyId = req.params.surveyId;

    const query = 
        `SELECT sa.id AS survey_answer_id, sa.created_at,
               q.id AS question_id, ao.question_text AS question_text,
               q.question_order,
               ao.answer_text
        FROM survey_answers sa
        JOIN answer_on_questions ao ON sa.id = ao.survey_answer_id
        JOIN questions q ON ao.question_id = q.id
        WHERE sa.survey_id = ?
        ORDER BY sa.id, q.question_order`
    ;

    db.query(query, [surveyId], async (err, results) => {
        if (err) return res.status(500).json({ error: "Ошибка выборки", details: err });

        if (!results.length) {
            return res.status(404).json({ message: "Ответов нет" });
        }

        // Создаем книгу Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Ответы");

        // Заголовки
        worksheet.columns = [
            { header: "ID ответа", key: "survey_answer_id", width: 12 },
            { header: "Дата", key: "created_at", width: 20 },
            { header: "№ вопроса", key: "question_id", width: 12 },
            { header: "Вопрос", key: "question_text", width: 40 },
            { header: "Ответ", key: "answer_text", width: 40 },
        ];

        // Заполняем данными
        results.forEach(row => {
            worksheet.addRow({
                survey_answer_id: row.survey_answer_id,
                created_at: row.created_at,
                question_order: row.question_order,
                question_id: row.question_id,
                question_text: row.question_text,
                answer_text: row.answer_text,
            });
        });

        // Отправляем файл клиенту
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=survey_${surveyId}_answers.xlsx`
        );

        await workbook.xlsx.write(res);
        res.end();
    });
});

app.listen(5000, () => console.log("Сервер запущен на порту 5000"));