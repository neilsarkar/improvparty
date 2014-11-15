var express = require('express');
var app = express();

app.use(express.static(__dirname + '/bower_components'))
app.use(express.static(__dirname + '/app'))

var routes = [
  '/teams',
  '/classes',
  '/classes/new',
  '/classes/:className/:hash',
  '/classes/:className/:hash/results'
]

routes.forEach(function(route) {
  app.get(route, function (req, res) {
    res.sendFile('app/index.html', { root: __dirname })
  })
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address

  console.log('Improvparty listening at http://%s:%s', host, port)
})
