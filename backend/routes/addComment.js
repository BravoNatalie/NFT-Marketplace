const express = require("express")
var router = express.Router()

const pool = require('../db');

class Node {//节点类
    //构造函数
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {  // 链表类
    //构造函数
    constructor() {
        this.head = null;
        this.length = 0;
    }
    //新增节点
    append(val) {
        let node = new Node(val);
        let current; //暂存当前位置
        if(this.head === null) { // 如果头结点为空,当前节点作为头结点
            this.head = node;
        } else {
            current = this.head;
            while(current.next) {     //遍历找到链表尾部
                current = current.next;
            }
            current.next = node;    //在链表尾部加入新节点
        }
        this.length++; //更新链表长度
    }
    //删除节点,并获得删除节点的值
    removeAt(index) {
        if(index > -1 && index < this.length) { //预防下标越界
            var current = this.head;//暂存当前位置
            var previous; //暂存当前位置的前一个
            var position = 0;
            if(index === 0) {  //要删除的是第一个位置，就得改变头指针指向
                this.head = current.next;
            } else {
                while(position++ < index) { //遍历直到current处于index位置
                    previous = current;
                    current = current.next;  //此时current处于index处,previous在index-1处
                }
                previous.next = current.next; //改变链表结构,跳过index处
            }
            this.length--; //更新链表长度
            return current.val; //返回index处的值
        } else {
            return null;    //下标越界返回空
        }
    }
    //插入节点
    insert(index,val) {
        if(index > -1 && index <= this.length) {
            let node = new Node(val);
            let current = this.head;
            let previous;
            let position = 0;
            if(index === 0) {
                node.next = current;
                this.head = node;
            } else {
                while(position++ < index) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true; //插入成功
        } else {
            return false; //插入失败
        }
    }
    //获取索引
    indexOf(val) {
        let current = this.head;
        let position = 0;
        while(current) {
            if(current.val === val) {
                return position;
            }
            position++;
            current = current.next;
        }
        return -1; //未找到索引
    }
    //将链表转换成字符串
    toString() {
        let current = this.head;
        let string = '';
        while(current) {
            string += current.val + ((current.next ? ',': ''));
            current = current.next;
        }
        return string;
    }
    //链表长度
    size() {
        return this.length;
    }
    //判断链表是否为空
    isEmpty() {
        return this.length === 0;
    }
}

class BinarySearchTree {
    constructor () {
        this.root = null;
    }

    // 向树中插入一个节点
    insert (key) {
        let newNode = new Node(key);

        if (this.root === null) this.root = newNode;
        else insertNode(this.root, newNode);
    }

    // 通过中序遍历方式遍历树中的所有节点
    inOrderTraverse () {}

    // 通过先序遍历方式遍历树中的所有节点
    preOrderTraverse () {}

    // 通过后序遍历方式遍历树中的所有节点
    postOrderTraverse () {}

    // 从树中移除一个节点
    remove (key) {}
}

router.get("/", (req, res) =>{
    console.debug("addComments");
    let insertSql = `ALTER TABLE comments AUTO_INCREMENT =1;` + `INSERT INTO comments(comment, worksId, commenterId, fatherCommentId) VALUES(?,?,?,?)`;
    let Param = [req.query.comment, req.query.worksId, req.query.commenterId, req.query.fatherCommentId]

    pool.getConnection((err, conn) =>{
        if (err)
            console.debug("err");
        conn.query(insertSql, Param, function (err, result) {
            if (err)
                console.debug("find in db fail")
            res.send(result)
        });
        conn.release();
    })
    }
)