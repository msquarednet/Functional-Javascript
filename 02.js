//02 Refactor imperative code to a single composed expression using Box

const Box = x => ({
  map: f => Box(f(x)),  
  fold: f => f(x),
  inspect: () => ` - Box(${x})`
})

//1
// const moneyToFloat = str => 
//   parseFloat(str.replace(/\$/g, ''))

// const percentToFloat = str => {
//   const replaced = str.replace(/\%/g, '')
//   const num = parseFloat(replaced)
//   return num * 0.01;
// }

// const applyDiscount = (price, discount) => {
//   const cost = moneyToFloat(price)
//   const savings = percentToFloat(discount)
//   return cost - cost*savings
// }

//2
const moneyToFloat = str => 
  Box(str)
  .map(s => s.replace(/\$/g, ''))
  .map(s => parseFloat(s))

const percentToFloat = str => 
  Box(str.replace(/\%/g, ''))
  .map(r => parseFloat(r))
  .map(n => n*0.01)


const applyDiscount = (price, discount) => 
  moneyToFloat(price)
  .fold(cost =>         //.map(cost => 
    percentToFloat(discount)
    .fold(savings =>    //.map(savings => 
      cost - cost*savings))


result = applyDiscount('$5.00', '20%')
console.log(result)

// map, map... //Box([object Object])   //box in a box :(
// fold, fold... 4 :)