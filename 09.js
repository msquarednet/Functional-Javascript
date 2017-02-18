// 09 - A curated collection of Monoids and their uses (slideshow)
const {List} = require('immutable-ext')  
const fromNullable = x => (x != null) ? Right(x) : Left(null);


let result;

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: () => ` - Sum(${x})`
})
Sum.empty = () => Sum(0)

const Product = x => ({
  x,
  concat: ({x: y}) => Product(x * y),
  inspect: () => ` - Product(${x})`
})
Product.empty = () => Product(1)

const Any = x => ({
  x,
  concat: ({x: y}) => Any(x || y),
  inspect: () => ` - Any(${x})`
})
Any.empty = () => Any(false)

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: () => ` - All(${x})`
})
All.empty = () => All(true)

const Max = x => ({
  x,
  concat: ({x: y}) => Max(x > y ? x : y),
  inspect: () => ` - Max(${x})`
})
Max.empty = () => Max(-Infinity)

const Min = x => ({
  x,
  concat: ({x: y}) => Min(x < y ? x : y),
  inspect: () => ` - Min(${x})`
})
Min.empty = () => Min(Infinity)


const Right = x => ({
  // chain: f => f(x),  
  fold: (f,g) => g(x),
  map: f => Right(f(x)),
  concat: o => o.fold(e => Left(e), r => Right(x.concat(r))),  
  inspect: () => ` - Right(${x})`
})
const Left = x => ({
  // chain: f => Left(x),  
  fold: (f,g) => f(x),
  map: f => Left(x),  
  concat: o => Left(x),
  inspect: () => ` - Left(${x})`
})

// const First = x => ({
//   x,
//   concat: () => First(x),
//   inspect: () => ` - First(${x})`
// })

const First = either => ({
  fold: f => f(either),
  concat: o => either.isLeft ? o : First(either),
  inspect: () => ` - First(${either})`
})
First.empty = () => First(Left())

const Fn = f => ({
  fold: f,
  concat: o => Fn(x => f(x).concat(o.fold(x)))
})

const Pair = (x, y) => ({
  x,
  y,
  concat: ({x: x1, y: y1}) => Pair(x.concat(x1), y.concat(y1))
})


//**************** */


const stats = List.of(
  {page:'Home', views:40},
  {page:'About', views:10},
  {page:'Blog', views:5}  //views: null -> Left(null)
)
result = stats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum(0)))
  .fold(e => e, r => r) //also needed


const find = (xs, f) =>
  List(xs)
    .foldMap(x => First(f(x) ? Right(x) : Left()),  First.empty())
    .fold(r => r)
result = find([3,4,5,6], x => x > 4)  
// :P


// const hasVowels = x => !!x.match(/[aeiou]/gi)
// const longWord = x => x.length >= 5
// const both = Fn(compose(All, hasVowels)).concat(Fn(compose(All, longWord)))
// result = ['gym', 'bird', 'lilac'].filter(x => both.fold(x).x)   
// // :P

console.log(result)
