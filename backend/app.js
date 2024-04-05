import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";

const app = express();
const PORT = 3456;

// Database setup
const db = new sqlite3.Database("./database/task-it.db");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", (err, tasks) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        } else {
            res.json(tasks);
        }
    });
});

app.post("/tasks", (req, res) => {
    const { name, description, dueDate } = req.body;
    db.run(
        "INSERT INTO tasks (name, description, due_date) VALUES (?, ?, ?)",
        [name, description, dueDate],
        function (err) {
            if (err) {
                console.error(err);
                res.status(500).send("Internal server error");
            } else {
                res.status(201).send(`Task ${this.lastID} created successfully`);
            }
        }
    );
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
