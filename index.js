var express = require('express')
var app = express()

// TODO: don't expose the entire directory just to get bower components working
app.use(express.static(__dirname))

var routes = [
  '/teams',
  '/classes/new',
  '/classes/:className'
]

routes.forEach(function(route) {
  app.get(route, function (req, res) {
    res.sendFile('index.html', { root: __dirname })
  })
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Improvparty listening at http://%s:%s', host, port)
})
