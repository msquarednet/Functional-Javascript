const Task = require('data.task')
//lazy

//0
// Task.rejected(1)

// Task.of(1)   //like a Box
//   .map(x => x + 1)
//   .chain(x => Task.of(x + 1))
//   .fork(e => console.log('err', e),
//         x => console.log('success', x))

const launchMissiles = () => 
  new Task( (rej, res) => {
    console.log("bombs away!")
    res("ka-boom")
  } )

//1
// launchMissiles()
//   .map(x => x+"!!!")
//   .fork(e => console.log('err', e),
//         x => console.log('success', x))

//fork pulls the trigger

//2
const app = launchMissiles()
  .map(x => x+"!!!")  //not launched, yet
  
// app.fork(e => console.log('err', e),
//          x => console.log('success', x))
app.map(x => x + "!!!!!!!!!!!!!!").fork(e => console.log('err', e),
         x => console.log('success', x))

// extendable, and remains pure
