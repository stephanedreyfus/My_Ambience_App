
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const db = require('./db');
const path = require('path');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
const JWT_OPTIONS = {expiresIn: 60 * 60}


app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// ********  ROUTES  *********


                //  ***** REGISTER AND LOGIN ROUTES *****
// handle http request, place in database, get back data
app.post('/register', async (req, res) =>{
  let {name, email, password} = req.body;
  // if any of the form fields are empty
  if(!name || !email || !password){
    res.send({
      error: "Missing Registration Information"
    })
    return;
  }

  
  // looking up user in database
  const userLookup = await db.query(`SELECT * FROM users WHERE user_name='${name}'`)
  if(userLookup.rows.length > 0){
    res.send({
      error: "User Already Exists",
    });
    return;
  }
  const encryptedPassword = bcrypt.hashSync(password, 10)
  let result = await db.query(`INSERT INTO users (user_name, user_email, user_password) VALUES ('${name}', '${email}', '${encryptedPassword}') RETURNING user_name, user_email`)
  result = result.rows[0]
  let token = jwt.sign({
    name: result.user_name,
    email: result.user_email
  }, SECRET_KEY)
  res.json({token})
})



app.post('/login', async (req, res) =>{
  // get data from quest body
  let {name, password} = req.body;
  // get user from database by name
  let result = await db.query(`SELECT * FROM users WHERE user_name='${name}'`)
  if(result.rows.length === 0){
    res.send({
      error: "Invalid Credentials"
    })
    return;
  }
  result = result.rows[0]
  // compare user passwored ui vs database. use bcrupt to compare them
  const matchingPassword = await bcrypt.compare(password, result.user_password)
  if(matchingPassword) {
    let token = jwt.sign({
      name: result.user_name,
      email: result.user_email
    }, SECRET_KEY)
    res.json({token})
  } else {
    res.send({
      error: "Invalid Credentials"
    })
  }
})



// APP ROUTES
 //  http://localhost:3000

 app.get("/", (req, res) => {
   res.send("Back Server Page: Running on port 3000")
 }) 

    //  http://localhost:3001/quote
app.get("/quote", async (req, res) => {
  const results = await db.query('SELECT * FROM quote');

  console.log(results);
  res.json(results.rows[Math.floor(Math.random() * results.rows.length)]);
});




app.get("/videos/:query", async (req, res) => {
  let results = await db.query(`SELECT * FROM videos WHERE query='${req.params.query}'`);
  results = results.rows
  if (results.length === 0) {
    let url = `https://www.googleapis.com/youtube/v3/search?q=${req.params.query}&part=snippet&key=${process.env.API}`
    let response = await fetch(url)
    let data = await response.json();
    results = data.items.map((item) => {
      return{
        videoid: item.id.videoId,
        videoname: item.snippet.title,
        videothumbnail: item.snippet.thumbnails.default.url
      }
    })
    // insert items form API to database, so we want have to call the api
    for(let item of results){
      await db.query(`INSERT INTO videos (query, videoid, videoname, videothumbnail) VALUES ('${req.params.query}','${item.videoid}', '${item.videoname}', '${item.videothumbnail}') `)
    }
  }
  console.log(results);
  res.json(results);



  // 

});

app.post('/user/name', (req, res) => {
  if(req.body.token ) {
    let payload = jwt.verify(req.body.token, SECRET_KEY)
    if(payload){
      res.send({name: payload.name})
    }
  }
  res.send({
    error: "Unauthorized"
  })
})






const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server up & listening on port ${port}`);
});




