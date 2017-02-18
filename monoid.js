// monoid

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


const Pair = (x, y) => ({
  x,
  y,
  concat: ({x: x1, y: y1}) => Pair(x.concat(x1), y.concat(y1))
})


//export default {Sum, All, First}
module.exports = {
  Sum, All, First
}