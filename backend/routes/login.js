const express = require("express")

express().use(express.json());
express().use(express.urlencoded({ extended: false }));

var router = express.Router()

const pool = require('../db');

/*
客户端登录发送get/post请求，请求参数和数据库表一致，为uname和pwd
登录成功返回OK，失败返回FAIL
*/

router.get("/", (req, res) => {
    console.debug("get login");

    let selectSQL = `SELECT uname,pwd FROM user WHERE uname=? AND pwd=?`;
    let selectSqlParams = [req.query.uname, req.query.pwd];

    pool.getConnection((err, conn) => {
        if (err)
            console.debug("login db conn fail");

        conn.query(selectSQL, selectSqlParams,function (err, result) {
            if (err) {
                console.debug("[login ERROR] - ", err.message);
                res.end("FAIL");//登录失败给客户端返回FAIL
                return;
            }
            console.debug(result);
            if (result.length==0) {
                console.debug("[login WRONG pwd]");
                res.send("FAIL");//登录失败给客户端返回FAIL
            }
            else {
                console.debug("[login OK]");
                res.send("OK");//登录成功给客户端返回OK
            }
        });
        conn.release();
    })
})

router.post("/", (req, res) => {
    console.debug("post login");

    let selectSQL = `SELECT uname,pwd FROM user WHERE uname=? AND pwd=?`;
    let selectSqlParams = [req.body.uname, req.body.pwd];
    pool.getConnection((err, conn) => {
        if (err)
            console.debug("login db conn fail");
        conn.query(selectSQL, selectSqlParams, function (err, result) {
            if (err) {
                console.debug("[login ERROR] - ", err.message);
                return;
            }
            console.debug(result);
            if (result.length == 0) {
                console.debug("[login WRONG pwd]");
                res.send("FAIL");//登录失败给客户端返回FAIL
            }
            else {
                console.debug("[login OK]");
                res.send("OK");//登录成功给客户端返回OK
            }
        });
        conn.release();
    })
    console.log(selectSqlParams);
})

module.exports = router;