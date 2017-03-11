var http = require('http');
var url = require('url');
var util = require('util');

http.createServer (function (req, res)	{
	//发送 HTTP 头部
	//HTTP 状态值 ：200 ：OK
	//内容类型：text/plain
	res.writeHead(200, {'Content-type': 'text/plain; charset=utf8'});

	//解析url函数
	var params = url.parse(req.url, true).query;
	var phone = params.phone;
	res.write('接收到的电话号码为:' + phone);
	//发送响应数据 "Hello World"
	// response.end('Hello World!\n');
	res.end();
}).listen(8888);

//终端打印如下信息
// console.log("Server running at http://127.0.0.1:8888/");