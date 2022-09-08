const mysql = require('mysql');

const config = {
    host: 'localhost',   // 服务器的地址
    port: 3306,          // 端口号
    user: 'root',        // 用户名
    password: '12345678',
    database: 'nft',
    multipleStatements: true
}
var pool = mysql.createPool(config);

//for init
pool.getConnection((err, conn) => {
    if (!err)
        return;
    console.debug("init");
    if (err.code == 'ER_BAD_DB_ERROR') {

        delete config.database;
        conn = mysql.createConnection(config);
        // //建数据库
        conn.query(`create database if not exists nft;`, (err, result) => {
            if (err) {
                console.debug("create db failed");
                throw err;
            }
        });

        conn.query(`use nft;`);

        // //建表 @账号：整型；密码、姓名、性别：字符串
        let sql = `create table if not exists user  ( 账号 int(10), 密码 char(10), 姓名 char(10), 性别 char(1) );` +
            `create table if not exists admin ( 账号 int(10), 密码 char(10), 姓名 char(10), 性别 char(1) );`;
        conn.query(sql, (err, result) => {
            if (err) {
                console.debug("create table failed");
                throw err;
            }
        })

        conn.end();

    }
    else {
        throw err;
    }
});

module.exports = pool;