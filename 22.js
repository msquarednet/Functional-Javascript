// 22 - Leapfrogging types with Traversable 

const fs = require('fs')
const Task = require('data.task')
const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')

let result;

const readFile = futurize(fs.readFile)

// result = files.map(fn => readFile(fn, 'utf-8')) //returns an array of Tasks
// [ Task { fork: [Function], cleanup: [Function] },
//   Task { fork: [Function], cleanup: [Function] } ]

//we wanna move from [Task] to Task([]) //type inside-out, leapfrog the types
const files = List(['box.js', 'config.json'])
result = files.traverse(Task.of, fn => readFile(fn, 'utf-8')) //returns a Task of arrays, so 
  .fork(console.error, console.log)
// [ undefined, [ undefined, List [] ] ]
// List [ "const Box = x =>\n({\n  ap: b2 => b2.map(x) , \n  chain: f => f(x),\n  map: f => Box(f(x)),\n  fold: f => f(x),\n  inspect: () => `Box(${x})`\n})\n\n\nmodule.exports = Box", "{\"port\": \"8888\"}" ]


// traverse expects you to return an applicative functor to return, so 'Task.of'





console.log(result)