var express = require('express');
// var async = require('async');
var fs = require('fs');
var app = express();

//连接mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'node_api',
});
//调试日志写入
var writeLog = function(fileName,logContent) {
	fs.appendFile(fileName, logContent, function(err) {
    		if (err){
    			return console.error(err);
    		}
    	})
}

connection.connect();

app.get('/', function(req, res) {
    res.send('Hello World');
})

//电话号码归属地 API
app.get('/getAreaByPhone', function(req, res) {
    //1.接受用户参数
    var phone = req.query.phone;
    //2.校验参数
    //3.参数通过校验，查询数据
    var AreaNum = phone.substr(0, 7);
    //通过mysql获取数据
    var sql = 'select * from mobile where mobile = ' + AreaNum;
    connection.query(sql, function(err, result) {
    	//记录执行的sql日志
    	writeLog('mysqlLog.txt',new Date().toLocaleString() + '###' + sql + '\n');
        // console.log(sql);
        if (err) {
            console.log('MySQL ERROR:', err.message);
            return;
        }
        result = result[0];
        //4.约定格式返回数据
        result.phone = parseInt(phone);
        // res.send('查询号码：' + phone + '\n' + JSON.stringify(result));
        res.send(result);
    })
})

var server = app.listen(8888, function() {

    // var host = server.address().address
    // var port = server.address().port

    console.log("this is api server")
})
