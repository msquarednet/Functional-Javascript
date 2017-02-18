// 21 - Write applicatives for concurrent actions

const Task = require('data.task')

let result;

// const DB = ({})
const DB = {
  find: id =>
    new Task((rej,res) => 
      setTimeout(() => res({id: id, title: `Project ${id}`}), 100
      )
    )
}
const reportHeader = (p1, p2) => `Report: ${p1.title} compared to ${p2.title}`

//sequential
// result = DB.find(1).chain(p1 => 
//   DB.find(2).map(p2 => 
//     reportHeader(p1,p2)))

// simultaneous
Task.of(p1 => p2 => reportHeader(p1,p2))
  .ap(DB.find(10))
  .ap(DB.find(11))
  // .fork(e => console.error(e), r => console.log(r))
  .fork(console.error, console.log)


// result = 'foo'





// console.log(result)