// 07 - Semigroup examples
const {Map} = require('immutable-ext')  //magic???

let result;

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: () => ` - Sum(${x})`
})
const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: () => ` - All(${x})`
})
const First = x => ({
  x,
  concat: () => First(x),
  inspect: () => ` - First(${x})`
})

//Combine/merge two accounts (concat) into one
// const acct1 = {name:'Alice', isPaid:true, points:10, friends:['Andy']}
// const acct2 = {name:'Alice', isPaid:false, points:2, friends:['Bob']}
const acct1 = Map( {name:First('Alice'), isPaid:All(true), points:Sum(10), friends:['Andy']} )
const acct2 = Map( {name:First('Alice'), isPaid:All(false), points:Sum(2), friends:['Bob']} )

result = acct1.concat(acct2).toJS()




console.log(result)
