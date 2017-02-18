// 25 - Apply Natural Transformations in everyday work
const {List} = require('immutable-ext')
const Either = require('./either')
const {Right, Left, fromNullable} = Either 
const Box = require('./box')
const Task = require('data.task')


let result, r1, r2;

//************* putting arr in constructor is nt
// ['hello', 'world'].chain(x => split('')) //arr not have 'chain'
result = List(['hello', 'world']).chain(x => List(x.split(''))) 

//************* umm...
const first = xs => fromNullable(xs[0])
const largeNumbers = xs => xs.filter(x => x>100)
const larger = x => x*2
// const app = xs => first(largeNumbers(xs).map(larger))  //all numbers made larger
// reminder: LAW natural transformation:
// nt(x).map(f) == nt(x.map(f))
// so...
const app = xs => first(largeNumbers(xs)).map(larger)   //ONLY first number is made larger
result = app([2,400,5,1000])

//************* err... task flattening
const fake = id => ({id:id, name:'user1', best_friend_id:id+1})
const DB = {
  find: id =>
    new Task((rej,res) => 
      res( id>=3 ? Right(fake(id)) : Left('not found') )
    )
}
const eitherToTask = e => e.fold(Task.rejected, Task.of)

result = DB.find(3) //Task(Right(user))
  // .chain(either => 
  //   either.map(user => 
  //     DB.find(user.best_friend_id))) //Right(Task(Right(user))) //yuck
  .chain(eitherToTask)  //Task(user)
  .chain(user => DB.find(user.best_friend_id)) 
  .chain(eitherToTask)  //Task(user)
  .fork(e => console.error(e), r => console.log(r))


// console.log(result)