const express = require('express');
const app = express();
//引入mongoose
const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/mydd', {useNewUrlParser: true});
//建立模型
const Schema = mongoose.Schema;
const book = new Schema({
    id:Number,
    type:String,
    name:String,
    price:Number,
    old_price:Number,
    image:String,
    desc:String
});
const type = new Schema({
    name:String,
    image:String
});
//实例化模型
const Book = mongoose.model('Book', book);
const Type = mongoose.model('Type', type);
//查询所有图书类型
app.get('/typelist',(req,res) => {
    Type.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(data)
    });
});
//查询所有书籍
app.get('/booklist',(req,res) => {
    Book.find({}, (err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(data);
    })
});
//根据id查询一本书
app.get('/detail',(req,res) => {
    const id = req.query.id;
    Book.findOne({id:id},(err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(data);
    })
});
app.listen(9001,() => {
    console.log('服务器启动...');
});