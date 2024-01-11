const { Router } = require("express");
const { register, login, loguot } = require("../controllers/authController");

const userRouters = Router();

//register
userRouters.post("/register", register);
userRouters.post("/login", login);
userRouters.get("/logout", loguot);
module.exports = { userRouters };