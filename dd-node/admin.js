const express = require('express');
const app = express();
//引入模板
const ejs = require("ejs");
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
//配置静态资源目录
app.use("/static", express.static("static"));
app.use("/upload", express.static("upload"));
//格式化post请求参数
app.use(express.urlencoded({extends:true}));
app.use(express.json());
//引入session
const session = require('express-session');
app.use(session(
    {
        secret: "keyborard cat",
        cookie: { maxAge: 60000*60*24 }
    }));

//引入文件模块
const fs=require('fs');
//解析表单
const multiparty = require('multiparty');
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
const user = new Schema({
    username:String,
    password:Number
})
//实例化模型
const Book = mongoose.model('Book', book);
const Type = mongoose.model('Type', type);
const User = mongoose.model('User', user);
//默认跳转
app.get('/',(req,res) => {
   res.render('login');
});
//登录
app.post('/login',(req,res) => {
    User.findOne(req.body,(err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        if (data !== null) {
            //设置session
            session.user = {
                username:data.username,
                password:data.password
            };
            //跳转到图书列表
            res.redirect('/admin/booklist');
        } else {
            res.send("<script>alert('账户或密码错误！');location.href='/';</script>")
        }
    })
});
//退出
app.get('/loginout',(req,res) => {
    session.user = null;
    res.render('login');
});
//获取图书列表
app.get('/admin/booklist',(req,res) => {
    Book.find({}, (err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('list',{booklist:data});
    });
});
//删除图书
app.get('/admin/delbook',(req,res) => {
    let id = req.query.id;
    //先删除图片
    Book.findById(id,(err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        let img = __dirname+data.image;
        fs.unlink(img,(err)=>{
            if(err){
                console.log(err);
                return;
            }
        });
    });
    //删除图书
    Book.deleteOne({_id:id},(err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send("<script>alert('删除成功！');location.href='/admin/booklist';</script>")
    });
});
//修改图书页面
app.get('/admin/edit',(req,res) => {
    let id = req.query.id;
    Book.findById(id,(err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("edit", {
            book: data
        });
    });
});
//修改图书
app.post('/admin/edit',(req,res) => {
    let form = new multiparty.Form();
    form.uploadDir='upload';
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
        //接收数据
        let id = fields.id[0];
        let name = fields.name[0];
        let price = fields.price[0];
        let old_price = fields.old_price[0];
        let desc = fields.desc[0];
        let image = files.image[0];
        let updateData = {};
        if(image.originalFilename==""){
            //没有图片
            updateData = { name, price, old_price,desc}
        }else{
            //有图片
            image = "/" + image.path.replace(/\\/, "/");
            updateData= { name, price, old_price,desc,image}
            //删除原来的照片
            Book.findById(id,(err,data) => {
                if(err){
                    console.log(err);
                    return;
                }
                let img = __dirname+data.image;
                fs.unlink(img,(err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                });
            });
        }
        Book.updateOne({_id:id},updateData,(err,data) => {
            if(err){
                console.log(err);
                return;
            }
            res.send("<script>alert('修改图书成功');location.href='/admin/booklist'</script>")
        })
    });
});
//添加页面
app.get('/admin/add', (req, res) => {
    res.render('add');
});
//添加图书
app.post('/admin/add',(req,res) => {
    let form = new multiparty.Form();
    //指定上传文件的一个目录
    form.uploadDir = 'upload';
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
        let name = fields.name[0];
        let price = fields.price[0];
        let old_price = fields.old_price[0];
        let desc = fields.desc[0];
        let image = files.image[0].path;
        image = "/" + image.replace(/\\/, "/");
        Book.insertMany([{ name, price, old_price, desc, image }],(err,data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(
                "<script>alert('图书添加成功');location.href='/admin/booklist';</script>"
            );
        });
    });
});
//商品分类列表
app.get('/admin/types',(req,res) => {
    Type.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('type/list',{types:data});
    });
});
//添加商品分类
app.get('/admin/addType', (req, res) => {
    res.render('type/add');
});
app.post('/admin/addType',(req,res) => {
    let form = new multiparty.Form();
    //指定上传文件的一个目录
    form.uploadDir = 'upload';
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
        let name = fields.name[0];
        let image = files.image[0].path;
        image = "/" + image.replace(/\\/, "/");
        Type.insertMany([{ name, image }],(err,data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(
                "<script>alert('分类添加成功');location.href='/admin/types';</script>"
            );
        });
    });
});
//删除分类
app.get('/admin/deltype',(req,res) => {
    let id = req.query.id;
    //先删除图片
    Type.findById(id,(err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        let img = __dirname+data.image;
        fs.unlink(img,(err)=>{
            if(err){
                console.log(err);
                return;
            }
        });
    });
    //删除分类
    Type.deleteOne({_id:id},(err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send("<script>alert('删除成功！');location.href='/admin/types';</script>")
    });
});
//修改分类页面
app.get('/admin/edittype',(req,res) => {
    let id = req.query.id;
    Type.findById(id,(err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("type/edit", {
            type: data
        });
    });
});
//修改分类
app.post('/admin/edittype',(req,res) => {
    let form = new multiparty.Form();
    form.uploadDir='upload';
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
        //接收数据
        let id = fields.id[0];
        let name = fields.name[0];
        let image = files.image[0];
        let updateData = {};
        if(image.originalFilename==""){
            //没有图片
            updateData = { name }
        }else{
            //有图片
            image = "/" + image.path.replace(/\\/, "/");
            updateData= { name, image}
            //删除原来的照片
            Type.findById(id,(err,data) => {
                if(err){
                    console.log(err);
                    return;
                }
                let img = __dirname+data.image;
                fs.unlink(img,(err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                });
            });
        }
        Type.updateOne({_id:id},updateData,(err,data) => {
            if(err){
                console.log(err);
                return;
            }
            res.send("<script>alert('修改分类成功');location.href='/admin/types'</script>")
        })
    });
});
//设置拦截
app.use((req,res,next) => {
    if (req.url == '/login') {
        next();
    } else {
        if (session.user) {
            next();
        } else {
            res.render('login');
        }
    }
});
app.listen(9000,() => {
    console.log('9000端口已启动')
})