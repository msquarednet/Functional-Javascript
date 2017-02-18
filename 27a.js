// 27a - Build a data flow for a real world app
// 29 - Find the intersection of sets with Semigroups


const Task = require('data.task')
const Spotify = require('./spotify')
const {List} = require('immutable-ext')
const {Pair, Sum} = require('./monoid')


const argv = new Task((rej,res) => res(process.argv))
const names= argv.map(arr => arr.slice(2))

// [1,2,3,4] ^ [3,4,5] -> [3.4]   //Set intersection, use Semigroup
const Intersection = xs => ({
  xs,
  concat: ({xs: ys}) => Intersection( xs.filter(x => ys.some(y => x===y)) )
})

const related = (name) =>
  Spotify.findArtist(name)
  .map(a => a.id)
  .chain(Spotify.relatedArtists)
  .map(arr => arr.map(a => a.name))  
  

// const artistIntersection = rel1 => rel2 =>
//   Intersection(rel1).concat(Intersection(rel2)).xs

// const main = ([name1, name2]) => 
//   // Task.of(rel1 => rel2 => [rel1, rel2])
//   Task.of(artistIntersection)
//   .ap(related(name1))
//   .ap(related(name2))

const artistIntersection = rels =>
  // rels.foldMap(Intersection, [Intersection(List())]).xs //if no rels
  // rels.foldMap(Intersection).xs
  rels.foldMap(x => Pair(Intersection(x), Sum(x.length)))
  // .bimap(x => x.xs, y => y.x)
  // .toList()

const main = names =>
  List(names)
  // .map(related) //List of Tasks, no
  .traverse(Task.of, related)   //Task of Lists
  .map(artistIntersection)



names.chain(main).fork(console.error, console.log)










