// 10 - Unbox types with foldMap

const {Map, List} = require('immutable-ext')
const {Sum} = require('./monoid')

let result;

result = [Sum(1), Sum(2), Sum(3)]
  .reduce((acc, x) => acc.concat(x), Sum.empty())

result = List.of(Sum(1), Sum(2), Sum(3))
  .fold(Sum.empty())  //unbox from type

result = Map({brian: Sum(1), sara: Sum(2)})
  .fold(Sum.empty())

result = Map({brian: 1, sara: 2})
  .map(x => Sum(x))
  .fold(Sum.empty())

//map then fold (so common)
result = Map({brian: 1, sara: 2})
  .foldMap(x => Sum(x), Sum.empty())



console.log(result)
