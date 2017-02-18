//05 - A collection of Either examples compared to imperative code (slideshow)

let result;
const fs = require('fs')

const Right = x => ({
  chain: f => f(x),  //just calls function, no 'boxing' into Right
  map: f => Right(f(x)),  
  fold: (f,g) => g(x),
  inspect: () => ` - Right(${x})`
})
const Left = x => ({
  chain: f => Left(x),  
  map: f => Left(x),  
  fold: (f,g) => f(x),
  inspect: () => ` - Left(${x})`
})
const fromNullable = x => (x != null) ? Right(x) : Left(null);
const tryCatch = (f) => {
  try {return Right(f())} 
  catch(e) {return Left(e)}
}


/* REFACTOR EXAMPLES **********************************/

// const openSite = () => {
//   if (ç) {
//     return renderpage(current_user)
//   } else {
//     return showLogin()
//   }
// }
var current_user = {foo: 'bar'}
const renderPage = (u) => u
const showLogin = () => 'login'
//REFACTOR
const openSite = () => 
  fromNullable(current_user)
  .fold(showLogin, renderPage)
  // .fold(e => showLogin, u => renderPage(u))  //also works
//TEST
// result = openSite()


// const getPrefs = (user) => {
//   if (user.premium) {return loadPrefs(user.preferences)}
//   else              {return defaultPrefs}
// }
var user = {premium: true, preferences: 'apt'}
const defaultPrefs = () => "default"
const loadPrefs = (p) => "loaded : " + p
//REFACTOR
const getPrefs = (user) => 
  (user.premium) ? Right(user) : Left('not premium')
  .map(u => u.prefences)
  .fold(() => defaultPrefs, p => loadPrefs(p))
//TEST
result = getPrefs(user)
//HMMM


// const streetName = (user) => {
//   const address = user.address
//   if (address) {
//     const street = address.street
//     if (street) {return street.name}
//   }
//   return 'no street'
// }
let u = {"address": {"street": {"name": "Oak St."}}}
//REFACTOR
const streetName = (user) => 
  fromNullable(user.address)
  .chain(a => fromNullable(a.street))
  // .fold(e => 'no street', s => s.name) //also works
  .map(s => s.name)
  .fold(e => 'no street', n => n)
//TEST
//result = streetName(u)



// const concatUniq = (x, ys) => {
//   const found = ys.filter(y => y===x)[0]
//   return (found) ? ys : ys.concat(x);
// }
const x = [0]
const ys= [0,1,1,0,1,0,1,0,0,1]
//REFACTOR
const concatUniq = (x, ys) => 
  fromNullable(ys.filter(y => y===x)[0])
  .fold( (e) => ys.concat(x), y => ys)
//TEST
// result = concatUniq(x, ys)



// const wrapExamples = (ex) => {
//   if (ex.previewPath) {
//     try {ex.preview = fs.readFileSync(ex.previewPath)}
//     catch(e) {}
//   }
//   return ex;
// }
const example = {previewPath: '/Users/msquared/Documents/Training/egghead-io/Functional-Javascript/notes.txt'}
const wrapExamples = (ex) => 
//REFACTOR
  fromNullable(ex.previewPath)
  .chain(path => tryCatch(() => fs.readFileSync(path).toString()))
  .fold(e => ex, preview => ex.preview = preview)  //also works (mine)
  // .fold(() => ex, x => Object.assign({preview:x}, x)) //'correct' answer not as good
//TEST
//result = wrapExamples(example)




// const parseDBUrl = (cfg) => {
//   try {
//     const c = JSON.parse(cfg)
//     if (c.url) {
//       return c.url.match(/./)
//     }
//   } catch (e) {return null;}
// }
const config = '{"url": "aa.aa.aa"}'
//REFACTOR
const parseDBUrl = (cfg) => 
  tryCatch(() => JSON.parse(cfg))
  .chain(c => fromNullable(c.url))
  .fold(e => null, u => u.match(/./) )
//TEST
result = parseDBUrl(config)




console.log(result)
