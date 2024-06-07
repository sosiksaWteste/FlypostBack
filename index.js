const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'administrator',
    database: 'flypost'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/clients', (req, res) => {
    db.query('SELECT * FROM client', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/packages', (req, res) => {
    db.query('SELECT * FROM package', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/deliveries', (req, res) => {
    db.query('SELECT * FROM delivery', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/users/:id', (req, res) => {
    db.query(`SELECT * FROM user WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/office/:id', (req, res) => {
    db.query(`SELECT * FROM office WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/client/:id', (req, res) => {
    db.query(`SELECT * FROM client WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/deliveries/:id', (req, res) => {
    db.query(`SELECT * FROM delivery WHERE recipient_id = ${req.params['id']} OR sender_id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/payments', (req, res) => {
    db.query('SELECT * FROM payment', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.post('/payments', (req, res) => {
    db.query(`INSERT INTO payment(payment_data) values('${req.body.payment_data}');`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200);
    });
});

app.post('/users', (req, res) => {
    db.query(`INSERT INTO user(login, password, role) values('${req.body.login}', '${req.body.password}', '${req.body.role}');`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200);
    });
});

app.post('/auth/login', (req, res) => {
    db.query(`SELECT * FROM user WHERE login = '${req.body.login}'`, (err, rows) => {
        if (err) {
            throw err;
        }

        if (rows[0] == null || req.body.password != rows[0].password) {
            res.status(400);
            res.end();
        }

        const token = jwt.sign(
            { id: rows[0].id, login: rows[0].login },
            `${process.env.JWT_SECRET_KEY}`
        )

        res.json({ token : token, username : rows[0].login, role : rows[0].role });
        res.end();
    });
});

app.put('/users', (req, res) => {
    console.log(req.body);
    db.query(`UPDATE user SET login = '${req.body.login}', password = '${req.body.password}', role = ${req.body.role} WHERE id = ${req.body.id}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200);
    });
    res.end();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
