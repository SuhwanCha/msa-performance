const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const eurekaHelper = require('./eureka-helper');
var prime_factors = require('prime-factors')
app.listen(PORT, () => {
  console.log("node-msa-example on 3000");
})

app.get('/', (req, res) => {
  res.json("node-msa-example")
})

app.get('/async-100', (req, res) => {
  let pre = Date.now()
  setTimeout(() => {
    let post = Date.now()
    res.json(post - pre)
  }, 100)
})

app.get('/async-300', (req, res) => {
  let pre = Date.now()
  setTimeout(() => {
    let post = Date.now()
    res.json(post - pre)
  }, 300)
})

app.get('/async-500', (req, res) => {
  let pre = Date.now()
  setTimeout(() => {
    let post = Date.now()
    res.json(post - pre)
  }, 500)
})


app.get('/async-3000', (req, res) => {
  let pre = Date.now()
  setTimeout(() => {
    let post = Date.now()
    res.json(post - pre)
  }, 3000)
})

app.get('/calc-cpu-1', (req, res) => {
  let temp = 0
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    temp = i
  }
  let post = Date.now()

  res.json(post - pre)

})
app.get('/calc-cpu-2', (req, res) => {
  let temp = 0
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      temp = i * j
    }
  }
  let post = Date.now()

  res.json(post - pre)

})

app.get('/calc-cpu-3', (req, res) => {
  let temp = 0
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      for (let k = 0; k < 100; k++) {
        temp = i * j * k
      }
    }
  }
  let post = Date.now()

  res.json(post - pre)

})

app.get('/calc-cpu-4', (req, res) => {
  let temp = 0
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      for (let k = 0; k < 100; k++) {
        for (let l = 0; l < 100; l++) {
          temp = i * j * k * l
        }
      }
    }
  }
  let post = Date.now()
  console.log('1 called')
  res.json(post - pre)

})

app.get('/calc-cpu-5', (req, res) => {
  let temp = 0
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      for (let k = 0; k < 100; k++) {
        for (let l = 0; l < 100; l++) {
          for (let o = 0; o < 100; o++) {
            temp = i * j * k * l * o
          }
        }
      }
    }
  }
  let post = Date.now()

  res.json(post - pre)

})


app.get('/calc-ram-1', (req, res) => {
  let temp = []
  let pre = Date.now()
  for (let i = 0; i < 256; i++) {
    temp.push('aaaa')
  }
  let post = Date.now()
  let mem = []
  Object.entries(process.memoryUsage()).forEach(item => mem.push(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`))

  res.json([post - pre, mem])

})

app.get('/calc-ram-2', (req, res) => {
  let temp = []
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    temp = []
    for (let j = 0; j < 256; j++) {
      temp.push('aaaa')
    }
  }
  let post = Date.now()
  let mem = []
  Object.entries(process.memoryUsage()).forEach(item => mem.push(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`))

  res.json([post - pre, mem])

})

app.get('/calc-ram-3', (req, res) => {
  let temp = []
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      temp = []
      for (let k = 0; k < 256; k++) {
        temp.push('aaaa')
      }
    }
  }
  let post = Date.now()
  let mem = []
  Object.entries(process.memoryUsage()).forEach(item => mem.push(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`))

  res.json([post - pre, mem])

})

app.get('/calc-ram-4', (req, res) => {
  let temp = []
  let pre = Date.now()
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      for (let k = 0; k < 100; k++) {
        temp = []
        for (let l = 0; l < 256; l++) {
          temp.push('aaaa')
        }
      }
    }
  }
  let post = Date.now()
  let mem = []
  Object.entries(process.memoryUsage()).forEach(item => mem.push(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`))

  res.json([post - pre, mem])

})


eurekaHelper.registerWithEureka('node-msa-example', PORT);

