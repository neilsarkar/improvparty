var express = require('express')
var app = express()

app.use(express.static(__dirname + '/bower_components'))
app.use(express.static(__dirname + '/app'))

console.log(__dirname)

var routes = [
  '/teams',
  '/classes/new',
  '/classes/:className'
]

routes.forEach(function(route) {
  app.get(route, function (req, res) {
    res.sendFile('app/index.html', { root: __dirname })
  })
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Improvparty listening at http://%s:%s', host, port)
})
