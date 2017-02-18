// 16 - You've been using Monads
/*
All Monads
Box, Either, Task, List
F.of, pure, chain, (flatMap, bind, >>=)
a monad is a (implicitive, pointer) functor
*/

const Box = require('./box')
const Task = require('data.task')
const Either = require('./either')
const {Right, Left, fromNullable} = Either
const {List, Map} = require('immutable-ext')

let r1, r2;

// httpGet('/user')
//   // .map(u => httpGet(`/comments/${u.id}`))    //Task(Task([coment]))
//   // .chain(u => httpGet(`/comments/${u.id}`))  //Task([coment])
//   .chain(u => httpGet(`/comments/${u.id}`)
//     .chain(cs => updateDOM(u,cs)
//     )
//   ) 
// without chaining.....Task(Task(Task(DOM))
// .....................u....cs...dom


//Box(Box(x)) //Box(x)
const join = m => m.chain(x => x)   //m is for monad (unbox)

//LAW1 *************
// join(m.map(join)) == join(join(m))
const m = Box(Box(Box('foo')))
r1 = join(m.map(join))
r2 = join(join(m))
//LAW2 *************
// join(F.of(m)) = join(m.map(F.of))
// const m = Box('rocks')
// r1 = join(Box.of(m)) 
// r2 = join(m.map(Box.of))


//m.chain(x => m.of(f(x)))

console.log(r1, r2)