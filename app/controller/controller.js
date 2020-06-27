require("dotenv").config();
const db = require("../../models/index");
const User = db.User;
const Todo = db.Todo;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// check if db is connected
db.sequelize
  .authenticate()
  .then(function (err) {
    console.log('Database connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res
        .status(200)
        .json({ status: 200, message: "User registered successfully!" });
    })
    .catch((err) => {
      res.status(400).json({ status: 400, message: "Error -> " + err });
    });
};

exports.signin = (req, res) => {
  console.log("Sign-In");

  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          auth: false,
          accessToken: null,
          reason: "Username or Password invalid",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          accessToken: null,
          reason: "Username or Password invalid",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).json({ auth: true, accessToken: token });
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.userContent = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    attributes: ["username"],
  })
    .then((user) => {
      res.status(200).json({
        description: "User Content Page",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        description: "Can not access User Page",
        error: err,
      });
    });
};

exports.healthcheck = (req, res) => {
  res.status(200).json({
    healthcheck: "I'm fine, thanks.",
  });
};

exports.getAllTodos = (req, res) => {
  Todo.findAll().then(todos => {
    res.status(200).json({
      todos,
    });
  })
    .catch((err) => {
      res.status(500).json({
        description: "Can not get todos",
        error: err,
      });
    });
};
