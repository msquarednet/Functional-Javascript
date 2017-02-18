//04 Use chain for composable error handling with nested Eithers

const fs = require('fs')

let result;

const Right = x => ({
  chain: f => f(x),  //just calls function, no 'boxing' into Right
  map: f => Right(f(x)),  
  fold: (f,g) => g(x),
  inspect: () => ` - Right(${x})`
})
const Left = x => ({
  chain: f => Left(x),  
  map: f => Left(x),  
  fold: (f,g) => f(x),
  inspect: () => ` - Left(${x})`
})
const fromNullable = x => (x != null) ? Right(x) : Left(null);

//0 refactor the following...
// const getPort = () => {
//   try {
//     const str = fs.readFileSync('config.json')
//     const config = JSON.parse(str)
//     return config.port
//   } catch(e) {
//     return 3000
//   }
// }

const tryCatch = (f) => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}
// //this works if 'config.json' exists, or NOT
// const getPort = () => 
//   tryCatch(() => fs.readFileSync('config.json'))
//     .map(c => JSON.parse(c))  //map doesnt actually run, if 'Left'
//     .fold(e => 3000, c => c.port)

//this also works if config.port exists, or NOT; or invalid JSON (in addition to above)
//note: chain added to Left and Right
const getPort = () => 
  tryCatch(() => fs.readFileSync('config.json')) //Right('')
    // .map(c => tryCatch(() => JSON.parse(c)))  //Right(Left(e)) || Right(Right('')) ... would have to fold twice, confusing!!!
    .chain(c => tryCatch(() => JSON.parse(c)))  //Right('') same one
    .fold(e => 3000, c => c.port)


result = getPort()
console.log(result)
