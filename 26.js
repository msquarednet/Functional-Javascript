// 26 - Isomorphisms and round trip data transformations
//two data types hold the same info, so can convert back and forth, without losing anything

const Box = require('./box')
const Task = require('data.task')
const Either = require('./either')
const {Right, Left, fromNullable} = Either 
const {List, Map} = require('immutable-ext')

let result, r1, r2;

// from(to(x)) == x
// to(from(y)) == y


// String ~ [Char] *******************************
const Iso = (to,from) => ({
  to,
  from
})
const chars = Iso(s => s.split(''), c => c.join(''))
const truncate = str => chars.from(chars.to(str).slice(0,3).concat('...'))

// result = chars.from(chars.to('hello world'))
// result = truncate('foobar')


// [a] ~ Either | null | a **********************
const singleton = Iso(e => e.fold(  () => [], x => [x]  ),        //either to array
                      a => (a.length) ? Right(a[0]) : Left())     //array to either
                      // ([x]) => x ? Right(x) : Left())          //fancy deconstruction

const filterEither = (e, pred) => singleton.from(singleton.to(e).filter(pred))
result = filterEither(Right('ello'), s => s.match(/h/gi))
  .map(s => s.toUpperCase())
// -> Right(HELLO)
// -> Left(undefined)

console.log(result)