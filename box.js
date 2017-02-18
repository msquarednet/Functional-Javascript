const Box = x =>
({
  ap: b2 => b2.map(x) , //apply
  chain: f => f(x),
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})


module.exports = Box