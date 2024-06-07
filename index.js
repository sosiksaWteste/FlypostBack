const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;
const jwt = require('jsonwebtoken');
let date_ob = new Date();

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

app.get('/cities', (req, res) => {
    db.query('SELECT * FROM city', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/packagePrice/:id', (req, res) => {
    db.query(`SELECT price FROM delivery WHERE package_id = ${req.params['id']}`, (err, rows) => {
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
    db.query(`SELECT email, first_name, last_name, middle_name, office_id, phone, salary, start_work, user_id, login FROM employee INNER JOIN user ON employee.user_id = user.id`, (err, rows) => {
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

app.get('/offices', (req, res) => {
    db.query('SELECT * FROM office', (err, rows) => {
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

app.get('/offices/:id', (req, res) => {
    db.query(`SELECT * FROM office WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/clients/:id', (req, res) => {
    db.query(`SELECT * FROM client WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/employees/:id', (req, res) => {
    db.query(`SELECT * FROM employee WHERE id = ${req.params['id']}`, (err, rows) => {
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

app.post('/packages', (req, res) => {
    db.query(`INSERT INTO package(description, height, insurance, length, weight, width) 
    values('${req.body.package.description}', ${req.body.package.height}, ${req.body.package.price}, ${req.body.package.length}, ${req.body.package.weight}, ${req.body.package.width});`, (err, rows) => {
        if (err) {
            throw err;
        }
    });
    let sender;
    let recipient;
    let from;
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    db.query(`SELECT * FROM client WHERE email = '${req.body.sender.email}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        sender = rows;
    });

    db.query(`SELECT * FROM client WHERE email = '${req.body.receiver.email}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        recipient = rows;
    });

    db.query(`SELECT office_id FROM employee INNER JOIN user ON user.id = employee.user_id WHERE login = '${req.body.username}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        from = rows;
    });
    
    db.query(`SELECT * FROM package WHERE description = '${req.body.package.description}' AND height = ${req.body.package.height} AND insurance = ${req.body.package.price} AND length = ${req.body.package.length} AND weight = ${req.body.package.weight} AND width = ${req.body.package.width};`, (err, rows) => {
        if (err) {
            throw err;
        }
        db.query(`INSERT INTO delivery(package_id, sender_id, recipient_id, send_date, send_from, send_to, price, current_position, status)
        values(${rows[0].id}, ${sender[0].id}, ${recipient[0].id}, '${year}-${month}-${date}', ${from[0].office_id}, ${req.body.receiver.officeId}, 1000, ${from[0].office_id}, 'start' );`, (err, rows2) => {
            if (err) {
                throw err;
            }
        });
    });
    
    res.sendStatus(200);
});

app.post('/offices', (req, res) => {
    db.query(`INSERT INTO office(address, city_id, cord_x, cord_y, office_number) 
    values('${req.body.address}', ${req.body.city_id}, ${req.body.cord_x}, ${req.body.cord_y}, ${req.body.office_number});`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.post('/payments/:id', (req, res) => {
    db.query(`INSERT INTO payment(payment_data, payment_date) values('${req.body.payment_data}', '${req.body.payment_date}');`, (err, rows) => {
        if (err) {
            throw err;
        }
    });

    db.query(`SELECT * FROM payment WHERE payment_data = '${req.body.payment_data}' AND payment_date = '${req.body.payment_date}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        db.query(`UPDATE delivery SET package_id = ${rows[0].id} WHERE package_id = ${req.params['id']}`, (err, rows2) => {
            if (err) {
                throw err;
            }
            
            res.sendStatus(200);
        });
    });
    res.end();
});

app.post('/users', (req, res) => {
    db.query(`INSERT INTO user(login, password, role) values('${req.body.login}', '${req.body.password}', ${req.body.role});`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.post('/employees', (req, res) => {
    if (req.body.user_id == -1) {
        db.query(`INSERT INTO user(login, password, role) values('${req.body.email}', '123', 1);`, (err, rows) => {
            if (err) {
                throw err;
            }
        });

        db.query(`SELECT * FROM user WHERE login = '${req.body.email}' AND password = '123' AND role = 1;`, (err, rows) => {
            if (err) {
                throw err;
            }
            db.query(`INSERT INTO employee(email, first_name, last_name, middle_name, office_id, phone, salary, start_work, user_id)
            values('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.middle_name}', ${req.body.office_id}, '${req.body.phone}', ${req.body.salary}, '${req.body.start_work}', ${rows[0].id});`, (err, rows2) => {
                if (err) {
                    throw err;
                }
            res.sendStatus(200);
            });
        });
    }
    
    db.query(`INSERT INTO employee(email, first_name, last_name, middle_name, office_id, phone, salary, start_work, user_id)
    values('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.middle_name}', ${req.body.office_id}, '${req.body.phone}', ${req.body.salary}, '${req.body.start_work}', ${req.body.user_id});`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
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
        else{
            const token = jwt.sign(
                {
                    id: rows[0].id,
                    login: rows[0].login,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
                },
                `${process.env.JWT_SECRET_KEY}`
            );

            res.json({ token : token, username : rows[0].login, role : rows[0].role });
            res.end();
        }
    });
});

app.delete('/offices/:id', (req, res) => {
    db.query(`DELETE FROM office WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.delete('/users/:id', (req, res) => {
    db.query(`DELETE FROM user WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.delete('/packages/:id', (req, res) => {
    db.query(`DELETE FROM package WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.delete('/employees/:id', (req, res) => {
    db.query(`DELETE FROM employee WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.put('/offices/:id', (req, res) => {
    db.query(`UPDATE office SET address = '${req.body.address}', city_id = ${req.body.city_id}, cord_x = ${req.body.cord_x}, cord_y = ${req.body.cord_y}, office_number = ${req.body.office_number} WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.put('/users/:id', (req, res) => {
    db.query(`UPDATE user SET login = '${req.body.login}', password = '${req.body.password}', role = ${req.body.role} WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.put('/packages/:id', (req, res) => {
    db.query(`UPDATE package SET description = '${req.body.description}', height = ${req.body.height}, insurance = ${req.body.insurance}, length = ${req.body.length}, weight = ${req.body.weight}, width = ${req.body.width} WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.put('/employees/:id', (req, res) => {
    db.query(`UPDATE employee SET email = '${req.body.email}', first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', middle_name = '${req.body.middle_name}', office_id = ${req.body.office_id}, phone = '${req.body.phone}', salary = ${req.body.salary}, start_work = '${req.body.start_work}', user_id = ${req.body.user_id} WHERE id = ${req.params['id']}`, (err, rows) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
    res.end();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
