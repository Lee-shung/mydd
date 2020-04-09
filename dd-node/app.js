const express = require('express');
const app = express();
app.use("/upload", express.static("upload"));
//格式化post请求参数
app.use(express.urlencoded({extends:true}));
app.use(express.json());
//引入mongoose
const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/mydd', {useNewUrlParser: true});
//建立模型
const Schema = mongoose.Schema;
const book = new Schema({
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
const order = new Schema({
    order:[],
    count: Number,
    total: Number,
    openId: String
});

//实例化模型
const Book = mongoose.model('Book', book);
const Type = mongoose.model('Type', type);
const Order = mongoose.model('Order', order);
//添加订单
app.post('/order',(req,res) => {
    Order.insertMany(req.body,(err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({result:'购买成功!',status:200});
    })
});
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
    Book.findById(id,(err,data) => {
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