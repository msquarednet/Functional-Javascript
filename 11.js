// 11 - Delay Evaluation with LazyBox

let result;


const Box = (x) => ({
  map: f => Box(f(x)), 
  fold: f => f(x),
  inspect: () => ` - Box(${x})`
})

const LazyBox = (g) => ({
  map: f => LazyBox( () => f(g()) ), 
  fold: f => f(g())
})

// result = Box('   64  ')
result = LazyBox(() => '   64  ') //now passing in a function, instead of simple value
  .map(s => {/*console.log(s);*/ return s.trim()})
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
  .fold(c => c.toLowerCase())  //pulls the trigger. purity due to laziness

//variety of type define map with function, instead of value, passed (promises, observables streams)



console.log(result)
