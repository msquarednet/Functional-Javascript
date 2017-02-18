// 24 - Principled type conversions with Natural Transformations
//one functor to another
//F a -> G a

const Either = require('./either')
const {Right, Left, fromNullable} = Either
const Box = require('./box')
const Task = require('data.task')

let result, r1, r2;

// LAW natural transformation:
// nt(x).map(f) == nt(x.map(f))

const eitherToTask = e => e.fold(Task.rejected, Task.of)
// eitherToTask(Right('nightingale'))   //Left('nightingale') -> err
//   .fork(e => console.error('err:',e), r => console.log('yay:', r))

const boxToEither = b => b.fold(Right)  //b.fold(x => Right(x))
r1 = boxToEither(Box(100)).map(x => x*2)  //same
r2 = boxToEither(Box(100).map(x => x*2))  //same (see law above) note that b.fold(LEFT) would NOT work

const first = xs => fromNullable(xs[0])
r1 = first([1,2,3]).map(x => x*2) //same
r2 = first([1,2,3].map(x => x*2)) //same


//             map(f)
// F(a) ------------------>  F(b)
//     |                   |
//     |                   |
//  nt |                   | nt
//     |                   |
//     V                   V
// G(a) ------------------>  G(b)
//             map(f)

console.log(r1, r2)