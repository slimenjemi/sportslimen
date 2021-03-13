const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sport', { useNewUrlParser: true, useUnifiedTopology: true });

const Player = require('./models/player');
const Team = require('./models/team');
const User = require('./models/user');
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// import body parser module
// create express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getAllPlayers', (req, res) => {
  Player.find((err, docs) => {
    if (err) {
      console.log('error with DB');
    } else {
      res.status(200).json({
        allPlayers: docs
      });
    }

  })
});
app.post('/addPlayers', (req, res) => {
  console.log("here in post ", req.body);
  const player = new Player({
    name: req.body.name,
    poste: req.body.poste,
    numero: req.body.numero,
    age: req.body.age,
    description: req.body.description
  });
  player.save().then((data) => {
    if (data) {
      res.status(200).json({
        message: 'Player added succesfull'
      })
    }
  }
  );

});
app.get("/getPlayerById/:id", (req, res) => {
  console.log("here in get by ID ", req.body);
  Player.findOne({_id: req.params.id}).then(
    (data) => {
      res.status(200).json({
        player: data
      })
    }
  )

});
app.delete("/deletePlayer/:id", (req, res) => {
  console.log(" delete player by Id ", req.params.id);
  Player.deleteOne({_id: req.params.id}).then(
    res.status(200).json({
      message: 'Player deleted with success'
    }))
  
})
app.put("/editPlayer/:id", (req, res) => {

  const player = new Player({
    _id: req.body._id,
    name: req.body.name,
    poste: req.body.poste,
    numero: req.body.numero,
    age: req.body.age,
    description: req.body.description
  });
  Player.update({ _id: req.params.id }, player).then((result) => {
    if (result) {
      res.status(201).json({
        message: "Updated successfully",
      });
    } else {
      console.log("here error");
    }
  });
});
app.get('/getAllTeams', (req, res) => {
  Player.find((err, docs) => {
    if (err) {
      console.log('error with DB');
    } else {
      res.status(200).json({
        allTeams: docs
      });
    }

  })
});
app.post('/addTeams', (req, res) => {
  console.log("here in post ", req.body);
  const team = new Team({
    name: req.body.name,
    foundation: req.body.foundation,
    staduim: req.body.staduim,
    country: req.body.country

  });
  team.save().then((data) => {
    if (data) {
      res.status(200).json({
        message: 'Player added succesfull'
      })
    }
  }
  );

});
app.get("/getTeamById/:id", (req, res) => {
  console.log("here in get by ID ", req.body);

});
app.delete("/deleteTeam/:id", (req, res) => {
  console.log(" delete team by Id ", req.params.id);
})
app.put("/editteam/:id", (req, res) => {

  console.log("new team", req.body);
})
///////////////////////////////////////////////

app.post('/api/signup', (req, res) => {
  bcrypt.hash(req.body.pwd, 10).then(
    (cryptedPwd) =>{
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: cryptedPwd,
      
        
    
      });
      user.save().then(
        res.status(200).json({
            message: 'user added succesfull'
          })
       
      );

    })
 

});
app.post("/api/login", (req, res) =>{
  console.log("here in login" , req.body);
  User.findOne({email:req.body.email}).then(
    (data)=>{
      if(!data){
        res.status(200).json({
          message:'0'
        })
      }
      bcrypt.compare(req.body.pwd, data.pwd);
    }).then(
      (findedUser)=>{
        res.status(200).json({
          message:'1'
        })
      })
      User.findOne({email: req.body.email}).then(
        (data)=>{
          const user ={
            email:req.body.email,
            firstName:data.firstName,
            lastName: data.lastName,

          }
          res.status(200).json({
            message:'2'
          })
        })
});
module.exports = app;
