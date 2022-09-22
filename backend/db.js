const mysql = require('mysql');

const config = {
    host: 'localhost',   // 服务器的地址
    port: 3306,          // 端口号
    user: 'root',        // 用户名
    password: 'nfttest123',
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

        // //建表 @ID：整型；用户名、密码、MetaMask账户地址、性别、邮箱、电话号码、学院、专业
        let sql = `create table if not exists user  ( 
                    id INT(11) NOT NULL UNIQUE,
                    uname VARCHAR(20) NOT NULL UNIQUE,
                    pwd VARCHAR(32) NOT NULL,
                    address VARCHAR(50) NOT NULL UNIQUE,
                    email VARCHAR(50) DEFAULT NULL,
                    gender char(1),
                    phone VARCHAR(11),
                    college VARCHAR(10),
                    major VARCHAR(10),
                    PRIMARY KEY(id)
                );` +
            `create table if not exists admin (
                uname VARCHAR(20) NOT NULL UNIQUE,
                address VARCHAR(50) NOT NULL UNIQUE,
                pwd VARCHAR(32) NOT NULL
             );`;
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