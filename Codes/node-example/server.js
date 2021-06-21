const express = require('express');
const app = express();
const PORT = 3001;
const eurekaHelper = require('./eureka-helper');
const HOST = '0.0.0.0';
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.listen(PORT, HOST, () => {
  console.log("node-msa-example on 3000");
})

app.get('/', async (req, res) => {
  console.log('APP1 Called')
  const uid = null
  const contentId = '03Irh5bXnxO2SRPyDEUX'

  try {
    let contentRef = db.collection('contents').doc(contentId);
    let getContent = await contentRef.get()
      .then(doc => {
        return doc.data()
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    contentRef.update({
      views: admin.firestore.FieldValue.increment(1)
    })

    let snapshot2 = await db.collection(`contents/${contentId}/ingredients`).get();
    const ingredients = snapshot2.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    let getUserLiked
    if (uid) {
      let userRef = db.collection(`users/${uid}/liked-contents`);
      getUserLiked = userRef.get()
        .then(snapshot => {
          let flag = false
          snapshot.forEach(doc => {
            if (flag) return false
            if (contentId === doc.id) {
              flag = true
              return true
            }
          });
          return flag
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    } else {
      getUserLiked = false
    }

    getContent.restaurants.local.liked = true
    getContent.restaurants.abroad.liked = false

    res.json({
      ...(await getContent),
      rating: (getContent.rating_count ? getContent.rating / getContent.rating_count : 0).toFixed(1),
      liked: (await getUserLiked),
      ingredients: (await ingredients),
      price: 80000,

    })

  } catch (error) {
    console.error(error)
    res.json()
  }


})

app.get('/2', async (req, res) => {
  try {
    const contentId = '03Irh5bXnxO2SRPyDEUX'
    const text = 'testtesttest'
    const uid = 'uid'
    const resp = await db.collection(`contents/${contentId}/comments`).add({
      country: 'KR',
      likes: 0,
      text: text,
      nickname: 'test',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      uid: uid
    });

    const user = await db.collection(`users/${uid}/comments`).add({
      contentId: contentId,
      commentId: resp.id
    });

    res.json({
      commentId: resp.id
    })
  } catch (error) {
    console.error(error)
    res.json()
  }
})

app.get('/async-50', (req, res) => {
  let pre = Date.now()
  setTimeout(() => {
    let post = Date.now()
    res.json(post - pre)
  }, 50)
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


eurekaHelper.registerWithEureka('msa-node-app', PORT, 'msa-node-app');

