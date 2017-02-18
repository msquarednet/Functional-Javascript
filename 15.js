// 15 - Lift into a Pointed Functor with of
//'of' generic interface to 'lift' a value into our type

const Box = require('./box')
const Either = require('./either')
const Task = require('data.task')


let result;

Task.of('hello')    //Task('hello')
Either.of('hello')  //Right('hello')  //not Left, duh
Box.of('hello')     //Box('hello')

Either.of('foo').map(x => x + '!')



console.log(result)