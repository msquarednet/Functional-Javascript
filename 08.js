// 08 - Ensure failsafe combination using monoids
// 'empty()' is the monoid

let result;

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  //empty: () => Sum(0),
  inspect: () => ` - Sum(${x})`
})
Sum.empty = () => Sum(0)

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: () => ` - All(${x})`
})
All.empty = () => All(true)

const First = x => ({
  x,
  concat: () => First(x),
  inspect: () => ` - First(${x})`
})
//remains a semigroup. cannot be promoted to a monoid

result = Sum.empty().concat(Sum(1)).concat(Sum(2))  //Sum(3)
result = All(true).concat(All(true)).concat(All.empty())  //All(true)

console.log(result)


//note:
const sum   = (xs) => xs.reduce((acc, x) => acc + x, 0)
const all   = (xs) => xs.reduce((acc, x) => acc && x, 0)
const first = (xs) => xs.reduce((acc, x) => acc)  //no initial/default, so may blowup (unsafe)

// console.log(first([]))
