//引入mongoose模块
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/todu');

//创建图表
var tosoSchema = new mongoose.Schema({
    item: String
});

//存储数据
var Todo = mongoose.model('Todo', tosoSchema);

// Todo({ item: '你好' }).save(function (err, data) {
//     if (err) throw err
//     console.log('Item Save')
// });


var bodyParser = require('body-parser');

//创建application/json解析
var jsonParser = bodyParser.json();

//创建application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var data = [
//     { item: "欢迎使用1" },
//     { item: "欢迎使用2" },
//     { item: "欢迎使用3" }
// ]


module.exports = function (app) {

    //获取数据
    app.get('/todo', function (req, res) {

        Todo.find({}, function (err, data) {
            if (err) throw err

            res.render('todo', { todos: data })
        })
        //res.send("您所访问的页面地址是：" + req.url);

    })

    //传递数据
    app.post('/todo', urlencodedParser, function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        } else {
            Todo(req.body).save(function (err, data) {
                if (err) throw err
                res.json(data)
            })

        }

    })

    //删除数据
    app.delete('/todo/:item', function (req, res) {
        //console.log(req.params.item)

        Todo.find({ item: req.params.item }).remove(function (err, data) {
            if (err) throw err
            res.json(data);
        })
        // data = data.filter(function (todo) {
        //     return req.params.item != todo.item;
        // })
        //res.json(data);

    })
}