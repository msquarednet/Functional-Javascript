// 27 - Build a data flow for a real world app

// SPOTIFY: Get related artists of 2 artists, find commonality (semigroups)...
// node 27.js metallica slayer
// https://developer.spotify.com/web-api/console/artists/
// https://developer.spotify.com/web-api/console/get-search-item/

// npm init
// npm install data.either data.task fantasy-identities request --save (fantasy-identities instead of Box)




// "https://api.spotify.com/v1/search?q=${query}&type=artist"  // artists: {items: []}
// "https://api.spotify.com/v1/artists/${id}/related-artists"  // artists: []

// class Spotify    OOP, nah flow for data to flow thru
// .getArtist()
// class Artist ... //etc

// console.log(process.argv)   //grabbing ambient state out of nowhere?


const Task = require('data.task')
const argv = new Task((rej,res) => res(process.argv))
const names= argv.map(arr => arr.slice(2)) //ignore argv[0] and argv[1]
// console.log(argv2.fork(console.error, console.log))

const related = (name) =>
  findArtist(name)
  .map(a => a.id)
  .chain(relatedArtists)  
  
// const main = (names) => console.log("foobar");     main(names) //works but...
const main = ([name1, name2]) => //"foo"
  // findArtist(name1).chain(a => relatedArtists(a.id))  //sketch
  // related(name1); related(name2)  //work on 2 pieces of data at the same time... applicatives
  // related making http call... Task
  Task.of(rel1 => rel2 => [rel1, rel2])
  .ap(related(name1))
  .ap(related(name2))
  //continued in 27a.js...

names.map(main).fork(console.error, console.log)










