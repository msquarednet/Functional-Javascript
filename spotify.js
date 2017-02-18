// 28 - Retrieve and use data from an api with pure functional constructs

const request = require('request')
const Task = require('data.task')
const Either = require('data.either')  //different/similar ... folktale


const httpGet = url =>
  new Task((rej,res) => 
    request(url, (error, reponse, body) => 
      error ? rej(error) : res(body)
    )
  )
const getJson = url => 
  httpGet(url)  
  // .map(r => {console.log('r', r); return r})
  .map(parse)
  .chain(eitherToTask)

const first = arr => Either.fromNullable(arr[0])
const eitherToTask = e => e.fold(Task.rejected, Task.of)  //nt
const parse = Either.try(JSON.parse) //folktale specific

const findArtist = name =>
  getJson(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
  .map(result => result.artists.items)
  .map(first) //Task Either Artist
  .chain(eitherToTask)

const relatedArtists = id => 
  getJson(`https://api.spotify.com/v1/artists/${id}/related-artists`)
  .map(result => result.artists)




module.exports = {findArtist, relatedArtists}
