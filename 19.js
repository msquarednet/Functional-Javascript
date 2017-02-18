// 19 - Apply multiple functors as arguments to a function (Applicatives)

const Either = require('./either')

let result;


const liftA2 = (f, fx, fy) => fx.map(f).ap(fy)
const $ = selector => Either.of({selector, height:10})
// const getScreensize = (screen, head, foot) => screen - (head.height+foot.height)

//sequential
// $('header').chain(head =>
//   $('footer').map(foot => 
//     getScreensize(800,head,foot)))

//no, use applicatives...
// result = Either.of(header => footer => getScreensize(800, h, f))

//curry, instead...
//redefine getScreensize function...

const getScreensize = screen => head => foot => screen - (head.height+foot.height)
// result = Either.of(getScreensize(800)).ap($('header')).ap($('footer'))
result = liftA2(getScreensize(800), $('header'), $('footer'))

//Either no longer needed
//applies multiple functors, as arguments, to a function





console.log(result)