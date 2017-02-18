// 20 - List comprehensions with Applicative Functors

const {List} = require('immutable-ext')

let result;

//imperative
// for (x in xs) {
//   for (y in ys) {
//     for (z in zs) {
//     }
//   } 
// }

//Applicative Functor
// result = List.of(x => x).ap(List([1,2,3]))   //List [ 1, 2, 3 ]
const merch = () =>
  List.of(x => y => z => `${x}-${y}-${z}`)
    .ap(List(['Tshirt', 'pants']))
    .ap(List(['small', 'medium', 'large']))
    .ap(List(['red', 'white', 'blue']))

result = merch()



console.log(result)