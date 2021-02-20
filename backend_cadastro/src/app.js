const express = require("express");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../database');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());




app.get("/carro", (request, response) => {
    const sql = "select * from carros_dt";
    db.all(sql,(err, carros) => {
        if (err) {
            response.status(400).json({"error":err.message});
            return;
        }
        response.json({carros})
    });
});

app.post("/carro", (request, response) => {
    let carro =  request.body

    let value = Array()
    for(let cr in carro){
        value.push(carro[cr])
    }
    const sql = 'INSERT INTO carros_dt(placa, chassi, renavam, modelo, marca, ano)  VALUES (?,?,?,?,?,?)';
    db.run(sql, value, function (err, result) {
        if (err){
            response.status(400).json({"error": err.message})
            return;
        }
        response.status(201).json({
            "Status": "Carro criado com sucesso",
            "id" : this.lastID
        })
    });
});
app.put("/carro/:id", (request, response, next) => {
    const sql = 'update carros_dt set placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ? where carro_id = ?'


    let carro =  request.body

    let value = Array()
    for(let cr in carro){
        value.push(String(carro[cr]))
    }
    value.push(request.params.id)

    db.run(sql,value,
        function (err, result) {
            if (err){
                response.status(400).json({"error": response.message})
                return;
            }
            response.status(202).json({
                message: "Alterado com sucesso",
                'rows afetadas' : this.changes
            })
        });
})

app.delete("/carro/:id", (request, response, next) => {
    db.run(
        'DELETE FROM carros_dt WHERE carro_id = ?',
        request.params.id,
        function (err, result) {
            if (err){
                response.status(400).json({"error": response.message})
                return;
            }
            response.json({"Status":"Carro apagado com sucesso", 'rows afetadas' : this.changes})
        });
})
module.exports = app;
