const mysql = require('mysql2');//Importa o mysql

const pool = mysql.createPool({ //metodo para criar conexões
    connectionLimit:10,
    host:'localhost',
    user:'alunods',
    password:'senai@604',
    database:'vio_reservas' //nome do banco que está fazendo a conexão
});

module.exports = pool;//Para usar o mysql
