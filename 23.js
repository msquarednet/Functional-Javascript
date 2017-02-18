// 23 - Maintaining structure whilst asyncing
//traverse

const fs = require('fs')
const Task = require('data.task')
const { List, Map } = require('immutable-ext')

let result;

const httpGet = (path, params) =>
  Task.of(`${path} result`)

result = Map({home: '/', about: '/about-us', blog: '/blog'})
  .traverse(Task.of, route => httpGet(route, {}))
  .fork(console.error, console.log)











console.log(result)