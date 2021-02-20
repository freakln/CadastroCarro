const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database');

db.run("CREATE TABLE carros_dt (carro_id INTEGER PRIMARY KEY AUTOINCREMENT,placa text NOT NULL,chassi text NOT NULL," +
    "renavam text NOT NULL,modelo text NOT NULL,marca text NOT NULL,ano smallint NOT NULL)");


db.close()
