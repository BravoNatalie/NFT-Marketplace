const express = require("express")

express().use(express.json());
express().use(express.urlencoded({ extended: false }));

var router = express.Router()
const pool = require("../db")

router.get("/", (req, res)=>{
    console.debug("get find");

    let selectSQL = `SELECT * where id = ?`;
    let selectParams = [req.query.id]

    pool.getConnection((err, conn) => {
        if (err)
            console.debug("find in db fail");
        conn.query(selectSQL, selectParams, function (err, result) {
            if (err)
                console.debug("find in db fail")
            res.send(result)
        });
        conn.release();
    })
})

router.post("/", (req, res) => {
    console.debug("post find");

    let selectSQL = `SELECT * FROM user where uname = ?`;
    let selectParams = [req.body.uname]
    console.log(req.body.uname);

    pool.getConnection((err, conn) => {
        if (err)
            console.debug("find in db fail");
        conn.query(selectSQL, selectParams, function (err, result) {
            if (err)
                console.debug("find in db fail")
            res.send(result)
        });
        conn.release();
    })
})

module.exports = router;