const path = require("path");
const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");

module.exports = function (app) {
  const controller = require("../controller/controller.js");

  app.get("/api/test/healthcheck", controller.healthcheck);

  app.get("/api/todo", [authJwt.verifyToken], controller.getAllTodos);
  app.post("/api/todo", [authJwt.verifyToken], controller.createTodo)
  app.get("/api/todo/:todoId", [authJwt.verifyToken], controller.getTodo)
  app.put("/api/todo/:todoId", [authJwt.verifyToken], controller.updateTodo)
  app.delete("/api/todo/:todoId", [authJwt.verifyToken], controller.deleteTodo)

  app.get("/api/todosofuser/:userId", [authJwt.verifyToken], controller.getTodosOfUser);

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userContent);

  app.get("/api/user", controller.getAllUsers)

  app.get("*", (req, res) => {
    let url = path.join(__dirname, "../../client/build", "index.html");
    if (!url.startsWith("/app/")) url = url.substring(1);
    res.sendFile(url);
  });
};
