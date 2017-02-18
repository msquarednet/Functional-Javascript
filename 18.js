// 18 - Applicative Functors for multiple arguments

const Box = require('./box')

let result;

// result = Box(x => x + 1).ap(Box(2))
// result = Box(x => y => x + y).ap(Box(2))  //Box(y => 2 + y)
// result = Box(x => y => x + y).ap(Box(2)).ap(Box(1))

const add = x => y => x + y
result = Box(add).ap(Box(2)).ap(Box(1))

// LAW
//F(x).map(f) = F(f).ap(F(x))

// const liftA2 = (f, fx, fy) => F(f).ap(fx).ap(fy)  //what's F???
const liftA2 = (f, fx, fy) => fx.map(f).ap(fy)    //replace, via law above
result = liftA2(add, Box(2), Box(1))


//const liftA3 = (f, fx, fy, fz) => fx.map(f).ap(fy).ap(fz)
//etc







console.log(result)