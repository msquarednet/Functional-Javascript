// 17 - Build curried functions
//split a multi-param function into multiple function, each one accepting 1 param
let result;

// const add = (x,y) => x+y
// const inc = (y) => 1+y
const add = x => (y => x + y)
const inc = add(1)  //(y => 1+y )
// result = add(1,2) //[Function] no longer accepts 2 args
// result = inc(2)

// const modulo = (dvr, dvd) => dvd%dvr    //divisor, dividend
// const isOdd = (dvd) => modulo(2,dvd)
const modulo = dvr => dvd => dvd % dvr    //add arrow
const isOdd = modulo(2)    //remove arrow
// result = isOdd(7)

const filter = fn => arr => arr.filter(fn)  //you end up wanting to put your data last (arr)
const getAllOdds = filter(isOdd)
// result = getAllOdds([0,1,2,3,4,5])

const replace = regx => repl => str => str.replace(regx, repl)
const censor = replace(/[aeiou]/gi)('*')
// result = censor('hello world') 

const map = f => arr => arr.map(f)
const censorEach = map(censor)
result = censorEach(['hello', 'world']) 
//censor works on single values, but it used by censorEach to work on arrays

console.log(result)