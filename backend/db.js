const mysql = require('mysql');

const config = {
    host: 'localhost',   // 服务器的地址
    port: 3306,          // 端口号
    user: 'root',        // 用户名
    password: 'mzr929929',
    database: 'nft',
    multipleStatements: true
}
var pool = mysql.createPool(config);


//for init
pool.getConnection((err, conn) => {
    if (!err)
        return;
    console.debug("init");
    if (err.code === 'ER_BAD_DB_ERROR') {

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
                    id INT(11) UNSIGNED AUTO_INCREMENT,
                    uname VARCHAR(20) NOT NULL UNIQUE,
                    pwd VARCHAR(32) NOT NULL,
                    address VARCHAR(50) NOT NULL UNIQUE,
                    email VARCHAR(50) DEFAULT NULL,
                    gender char(1),
                    phone VARCHAR(11),
                    college VARCHAR(10),
                    major VARCHAR(10),
                    PRIMARY KEY(id)
                )ENGINE=InnoDB DEFAULT CHARSET=utf8;` +
            `create table if not exists admin (
                uname VARCHAR(20) NOT NULL UNIQUE,
                address VARCHAR(50) NOT NULL UNIQUE,
                pwd VARCHAR(32) NOT NULL
            )ENGINE=InnoDB DEFAULT CHARSET=utf8;` +
            `create table if not exists works(
                worksId INT(11) UNSIGNED AUTO_INCREMENT,
                workName VARCHAR(100) NOT NULL,
                authorId INT(11) NOT NULL,
                introduction VARCHAR(254) NOT NULL,
                state INT(2) DEFAULT 0,
                admire INT(11) DEFAULT 0,
                investment INT(11) DEFAULT 0,
                investmentNum INT(11) DEFAULT 0,
                attention INT(11) DEFAULT 0,
                share INT(11) DEFAULT 0,
                time TIMESTAMP ,
                belongId INT(11) NOT NULL,
                primary key(worksId)
            )ENGINE=InnoDB DEFAULT CHARSET=utf8;` +
            `create table if not exists comments(
                commentId INT(11) UNSIGNED AUTO_INCREMENT,
                comment VARCHAR(255) NOT NULL,
                worksId INT(11) NOT NULL,
                commenterId INt(11) NOT NULL,
                fatherCommentId INT(11) NOT NULL ,
                PRIMARY KEY(commentId)
            )ENGINE=InnoDB DEFAULT CHARSET=utf8;` +//fatherCommentId是父评论ID
            `create table if not exists transaction(
                workId INT(11) UNSIGNED AUTO_INCREMENT,
                time DATETIME() NOT NULL,
                money INT(11) NOT NULL,
                salerId INT(11) NOT NULL,
                buyerId INT(11) NOT NULL,
                PRIMARY KEY(workId)
            )ENGINE=InnoDB DEFAULT CHARSET=utf8;` +
            `create table if not exists pictures(
                picId INT(11) UNSIGNED AUTO_INCREMENT,
                picUrl VARCHAR(255) NOT NULL UNIQUE,
                belongWorkId INT(11) NOT NULL,
                isSmallPic INT(1) NOT NULL,
                PRIMARY KEY(picID)
            )ENGINE=InnoDB DEFAULT CHARSET=utf8;`
            +`create table if not exists priceTable(
                workId INT(11) NOT NULL,
                time DATETIME() NOT NULL,
                price INT(11) NOT NULL
            )ENGINE=InnoDB DEFAULT CHARSET=utf8;`
        ;
        conn.query(sql, (err, result) => {
            if (err) {
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