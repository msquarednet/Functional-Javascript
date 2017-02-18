//03 Enforce a null check with composable code branching using Either

//const Either = Right || Left....
//function(err, okayfine) {}
let result;

//1
// const Right = x => ({
//   map: f => Right(f(x)),  
//   inspect: () => ` - Right(${x})`
// })
// const Left = x => ({
//   map: f => Left(x),  //no f!!! // no function called!!! important for c.slice(1) below
//   inspect: () => ` - Left(${x})`
// })

// result = Right(3).map(x => x+1).map(x => x/2)   //Right(2)
// result = Left(3).map(x => x+1).map(x => x/2)   //Left(3) ...untouched

//2
// const Right = x => ({
//   map: f => Right(f(x)),  
//   fold: (f,g) => g(x),
//   inspect: () => ` - Right(${x})`
// })
// const Left = x => ({
//   map: f => Left(x),  
//   fold: (f,g) => f(x),
//   inspect: () => ` - Left(${x})`
// })

// result = Right(2).map(x => x+1).map(x => x/2).fold(x => 'error', x => x) //1.5 okay
// result = Left(2).map(x => x+1).map(x => x/2).fold(x => 'error', x => x) //error

//3
const Right = x => ({
  map: f => Right(f(x)),  
  fold: (f,g) => g(x),
  inspect: () => ` - Right(${x})`
})
const Left = x => ({
  map: f => Left(x),  
  fold: (f,g) => f(x),
  inspect: () => ` - Left(${x})`
})
//3a
// const findColor = name => ({red: '#f00', green: '#0f0', blue: '#00f'})[name]
//3b
// const findColor = name => {
//   const found = ({red: '#f00', green: '#0f0', blue: '#00f'})[name]
//   return found ? Right(found) : Left(null);
// }

//3a
// result = findColor('red') //#f00  okay
// result = findColor('purple') //undefined (!)
// result = findColor('red').slice(1).toUpperCase() //F00 okay
// result = findColor('purple').slice(1).toUpperCase() //CRASH!!! cannot call slice of undefined
//3b
// result = findColor('purple')
//   .map(c => c.slice(1))
//   .fold(e => 'no color', 
//         c => c.toUpperCase())

//4
const fromNullable = x => (x != null) ? Right(x) : Left(null);

const findColor = name => 
  fromNullable({red: '#f00', green: '#0f0', blue: '#00f'}[name])

result = findColor('purple')
  .map(c => c.slice(1))
  .fold(e => 'no color', 
        c => c.toUpperCase())


console.log(result)
