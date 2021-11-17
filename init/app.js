const express = require('express')
const app = express()
const port = 3000
const fs = require('fs-extra');


//gets a path and returns a list of items in this path
app.get('/api/folders/get/', (req, res) => {
  try {
    //getting the path
    const path = req.headers.path;

    //get files of path
    const res = fs.readdirSync(path);

    // TODO: add [] to folders
    
    return res.status(200).send(res);
  } catch (err) {
    return res.status(500).send(res);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})