const express = require("express")
var router = express.Router()

const pool = require('../db');

/*
客户端注册发送get/post请求，请求参数和数据库表一致
注册成功返回OK，注册返回FAIL
*/

router.get("/signup", (req, res) => {
    console.debug("get signup");

    //ALTER保证id自增紧凑
    let insertSQL = ` ALTER TABLE user AUTO_INCREMENT =1;` + `INSERT INTO user(uname,pwd,address,email,gender,phone,college,major) VALUES(?,?,?,?,?,?,?,?)`;
    let insertSQLParams = [req.query.uname, req.query.pwd, req.query.address, req.query.email, req.query.gender, req.query.phone, req.query.college, req.query.major]

    pool.getConnection((err, conn) => {
        if (err)
            console.debug("signup db conn fail");

        conn.query(insertSQL, insertSQLParams,(err, result)=> {
            if (err) {
                res.send("FAIL");//注册失败给客户端返回FAIL
                console.debug("[signup ERROR] - ", err.message);
                return;
            }
            console.debug("[signup OK]");
            res.send("OK");//注册成功给客户端返回OK
        });
        conn.release();
    })
})

router.post("/signup", (req, res) => {
    console.debug("post signup");

    //ALTER保证id自增紧凑
    let insertSQL = ` ALTER TABLE user AUTO_INCREMENT =1;` + `INSERT INTO user(uname,pwd,address,email,gender,phone,college,major) VALUES(?,?,?,?,?,?,?,?)`;
    let insertSQLParams = [req.body.uname, req.body.pwd, req.body.address, req.body.email, req.body.gender, req.body.phone, req.body.college, req.body.major];

    pool.getConnection((err, conn) => {
        if (err)
            console.debug("signup db conn fail");
        conn.query(insertSQL, insertSQLParams, (err, result) => {
            if (err) {
                res.send("FAIL");//注册失败给客户端返回FAIL
                console.debug("[signup ERROR] - ", err.message);

                return;
            }
            console.debug("[signup OK]");
            res.send("OK");//注册成功给客户端返回OK
        });
        conn.release();
    })
})

module.exports = router;