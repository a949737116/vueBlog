const express = require('express')
const cookie = require('cookie-parser')
const path = require('path')
let app = express()
// 启用cookie插件
app.use(cookie());
//swig模板处理
    const swig = require('swig');
    //html使用swig模板解析
    app.engine('html',swig.renderFile);
    //关闭缓存
    swig.setDefaults({cache:false});
//Application Settings
    //views所在目录
    app.set('views','./admin/view');
    //默认模板扩展名
    app.set('view engine','html');
    //关闭缓存
    app.set('view cache',false);
//静态文件托管
app.use(express.static(path.join(__dirname,'./dist')))
app.use('/uploads', express.static('./upLoads'))
app.use('/admin',express.static('./admin'));
app.use('/data',express.static('./Data')); 
//请求头JSON格式解析
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true,limit:'20000kb'}));
// app.use('/admin',require('../admin/router'));
app.use('/admin', function(req, res, next){
  if (req.cookies.logInfo && req.cookies.logInfo.isAdmin){
    console.log('你是管理员')
    next();
  } else {
    res.send('你没有管理权限，请退出')
  }
}, require('./admin/router'))
app.use('/api',require('./admin/api'));
app.use('/*', function(req, res, next) {
  return res.redirect('/')
})
//数据库
const mongoose = require('mongoose');
//monogooseDB防止数据库报错
mongoose.Promise = global.Promise;
//连接数据库
mongoose.connect("mongodb://localhost:27032/Blog_pro", { useNewUrlParser: true },function(err){
  if (err) {
    console.log('数据库链接失败')
  }else{
    console.log('数据库已经链接成功了')
    app.listen(8032);
    console.log('项目跑在8032端口') 
  }
})
const dbStatus = mongoose.connection;
dbStatus.on('error',function(err){
  console.log(err)
})
dbStatus.on('open',function(){
  console.log('数据库链接稳定')
})
