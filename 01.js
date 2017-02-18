//01 Create linear data flow with container style types (Box)

//1
// const nextCharForNumberString = str => {
//   const trimmed = str.trim()
//   const number = parseInt(trimmed)
//   const nextNumber = number + 1
//   return String.fromCharCode(nextNumber)
// }

//2
// const nextCharForNumberString = str => {
//   return String.fromCharCode(parseInt(str.trim()) + 1)  //boo
// }

// //3
// const nextCharForNumberString = str => //{
//   [str]  //put it in a box
//   .map(s => s.trim())
//   .map(s => parseInt(s))
//   .map(i => i + 1)
//   .map(i => String.fromCharCode(i))
// //}

//4
const Box = x => ({
  map: f => Box(f(x)),  //make our own, custom map!
  fold: f => f(x),
  inspect: () => ` - Box(${x})`
})
const nextCharForNumberString = str => 
  Box(str)
  .map(s => s.trim())
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
  .fold(c => c.toLowerCase())



const result = nextCharForNumberString('   64  ');
console.log(result)