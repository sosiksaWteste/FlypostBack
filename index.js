const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());

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
    var obj = JSON.parse(req.body);
    var values = Object.values(obj);

    db.query(`INSERT INTO payment(payment_data) values(${obj["payment_data"]});`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200);
    });
});

app.post('/users', (req, res) => {
    var obj = JSON.parse(req.body);
    var values = Object.values(obj);

    db.query(`INSERT INTO users(login, password, role) values(${obj["login"]}, ${obj["password"]}, ${obj["role"]});`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
