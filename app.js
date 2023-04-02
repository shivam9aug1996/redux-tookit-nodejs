import bcryptjs from "bcryptjs";
import express from "express";
import mongoose from "mongoose";
import { User } from "./models/user.js";
import jwt from "jsonwebtoken";
import { Todo } from "./models/todo.js";
import key from "./config/keys.js";
import path from "path";
const __dirname = path.resolve();
const app = express();
const PORT = 5002;
const JWT_SECRET = key.JWT_SECRET;
const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(key.MONGO_URI);
    console.log("db Connected");
  } catch (error) {
    console.log("db not able to connect", JSON.stringify(error));
  }
};
db();
app.use(express.json());

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  try {
    const { userId } = jwt.verify(
      authorization?.substring("Bearer ".length),
      JWT_SECRET
    );
    req.user = userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "you must be logged in" });
  }
};

app.post("/createtodo", requireLogin, async (req, res) => {
  const { todo } = req.body;

  try {
    if (!todo) {
      return res.status(422).json({ error: "Please add todo" });
    }

    const data = await new Todo({
      todo,
      todoBy: req.user,
    }).save();
    return res.status(201).json({ message: data });
  } catch (error) {
    console.log(err);
  }
});

app.get("/gettodo", requireLogin, async (req, res) => {
  const data = await Todo.find({
    todoBy: req.user,
  });

  res.status(200).json({ message: data });
});

app.delete("/remove/:id", requireLogin, async (req, res) => {
  const removedTodo = await Todo.findOneAndRemove({ _id: req.params.id });

  res.status(200).json({ message: removedTodo });
});

app.get("/logout", requireLogin, async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "successfully logout" });
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "Uer already Exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    let newUser = await new User({
      email,
      password: hashedPassword,
    }).save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    return res.status(200).json({
      message: "signup success",
      token,
      data: { email: newUser.email },
    });
  } catch (error) {
    console.log(err);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User doesn't exists with this email" });
    }
    const doMatch = await bcryptjs.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return res.status(201).json({
        message: "signup success",
        token,
        data: { email: user.email },
      });
    } else {
      return res.status(401).json({ message: "email or password is invalid" });
    }
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(
      express.static(path.resolve(__dirname, "redux-toolkit-1", "build"))
    );
    res.sendFile(
      path.resolve(__dirname, "redux-toolkit-1", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log("server started", PORT);
});
