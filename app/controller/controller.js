const db = require("../../models/index");
const User = db.User;
const Todo = db.Todo;
const fs = require('fs')
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

// sync db. If we are started at the same time, maybe database is not ready
// to be sure, wait for 10 secs.

setTimeout(() => {
  console.log("....................Starting database migration sync")
  db.sequelize.sync({ force: true })
    .then(function (err) {
      console.log('....................Database migration is synced.');
    })
    .catch(function (err) {
      console.log('....................Unable to sync database:', err);
    });
}, 10000);



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
    attributes: ["id", "username", "avatar"],
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

exports.saveUserImage = (req, res) => {

  // if there is a current avatar --> remove file
  User.findOne({ where: { id: req.body.userId }, })
    .then((user) => {
      console.log("Trying to remove previous avatar of user: ", user.avatar)
      fs.unlink(user.avatar, err => console.log(err))
    })
    .catch((err) => {
      // console.log("Previous avatar removal not succeed", err)
    });

  User.update(
    { avatar: req.file.path, },
    { where: { id: req.body.userId } },
  )
    .then((user) => {
      res.status(200).json({
        description: "Avatar saved",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        description: "Error with saving avatar",
        error: err,
      });
    });
};

exports.getAllUsers = (req, res) => {
  User.findAll({ attributes: { exclude: ['password'] } }).then(users => {
    res.status(200).json({
      users,
    });
  })
    .catch((err) => {
      res.status(500).json({
        description: "Can not get users",
        error: err,
      });
    });
};


exports.healthcheck = (req, res) => {
  res.status(200).json({
    healthcheck: "I'm fine, thanks.",
  });
};

//
//  Route controllers for Todos
//

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

exports.getTodo = (req, res) => {
  console.log("getTodo id:", req.params.todoId)
  Todo.findOne({
    where: { id: req.params.todoId },
    attributes: ["todotitle", "todobody", "id", "owner"],
  })
    .then((todo) => {
      res.status(200).json({
        todo,
        description: "Found requested todo",
      });
    })
    .catch((err) => {
      res.status(500).json({
        description: "Can not find Todo",
        error: err,
      });
    });
};

exports.updateTodo = (req, res) => {
  console.log("updateTodo id:", req.params.todoId)

  Todo.update(
    {
      todobody: req.body.todobody,
      todotitle: req.body.todotitle
    },
    { where: { id: req.params.todoId } },
  )
    .then((todo) => {
      res.status(200).json({
        todo,
        description: "Todo updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        description: "Error updating todo",
        error: err,
      });
    });
};


exports.createTodo = (req, res) => {
  console.log("creating todo. req.body is", req.body)
  Todo.create({
    owner: req.body.owner || req.userId,  // if we got no owner -> logged in user is the owner
    todotitle: req.body.todotitle,
    todobody: req.body.todobody,
  })
    .then((todo) => {
      res
        .status(200)
        .json({ status: 200, message: "Todo created successfully!", todo });
    })
    .catch((err) => {
      res.status(400).json({ status: 400, message: "Todo create Error -> " + err });
    });
};


exports.deleteTodo = (req, res) => {
  console.log("deleteTodo id:", req.params.todoId)
  Todo.destroy({
    where: { id: req.params.todoId }
  })
    .then(() => {
      res.status(200).json({
        description: "Deleted.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        description: "Error while deleting todo",
        error: err,
      });
    });
};



exports.getTodosOfUser = (req, res) => {
  Todo.findAll({
    where: {
      owner: req.params.userId
    }
  }).then(todos => {
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

