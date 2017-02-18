// 14 - You've been using Functors
//have a 'map()' method

const Box = require('./box')
const Task = require('data.task')
const Either = require('./either')
const {Right, Left, fromNullable} = Either
const {List, Map} = require('immutable-ext')

let r1, r2;
/*
Law 1 - functor holding x, such that...
fx.map(f).map(g) == fx.map( x => g(f(x)))

Law 2 - functor x, and map id over type, is same as calling id on functor x
fx.map(id) == id(fx)
*/


//1
r1 = Box('doofyhead')
  .map(s => s.substr(5))
  .map(s => s.toUpperCase())

r2 = Box('doofyhead')
  .map(s => s.substr(5).toUpperCase())    //function composition


//2
const id = x => x
r1 = Box('crayons').map(id)
r2 = id(Box('crayons'))



console.log(r1, r2)