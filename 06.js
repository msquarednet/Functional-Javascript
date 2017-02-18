// 06 - Create types with Semigroups
// a type with a 'concat()' method

let result;
//const result = "a".concat("b").concat("c")  //string is semigroup
// result = [1,2].concat([3,4]).concat([5,6])  //array is semigroup
// result = [1,2].concat( [3,4].concat([5,6]) )  //associativity - append prepend doesnt matter

//Sum semigroup
const Sum = x => ({
  x,
  // concat: o => Sum(x + o.x),
  concat: ({x: y}) => Sum(x + y),
  inspect: () => ` - Sum(${x})`
})
result = Sum(1).concat(Sum(2))  //Sum(3)

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: () => ` - All(${x})`
})
result = All(true).concat(All(false)) //All(false)

const First = x => ({
  x,
  concat: () => First(x),
  inspect: () => ` - First(${x})`
})
result = First("foo").concat(First("bar")) //First(false)




console.log(result)
