const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const register = require('./controllers/register');
const signin  = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signin", (req,res) => {signin.handleSignin(req,res,knex,bcrypt)})
app.post("/register",(req,res)=>{register.handleRegister(req,res,knex,bcrypt)})
app.get("/profile/:id", (req,res) => {profile.handleProfileGet(req,res,knex)})
app.put("/image", (req,res) => {image.handleImage(req,res,knex)})
app.post("/imageurl", (req,res) => {image.handleApiCall(req,res)})

const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`app is listening on port ${PORT} `);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/