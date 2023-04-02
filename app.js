import bcryptjs from "bcryptjs";
import express from "express";
import mongoose from "mongoose";
import { User } from "./models/user.js";
import jwt from "jsonwebtoken";
import { Todo } from "./models/todo.js";
import key from "./config/keys.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5002;
const app = express();
const PORT = port;
const JWT_SECRET = "secretkey";
const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db Connected");
  } catch (error) {
    console.log("db not able to connect", JSON.stringify(error));
  }
};
db();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./redux-toolkit-1/build")));

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

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
  console.log("logout");
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

// if (process.env.NODE_ENV == "production") {
//   // console.log("hi");
//   //const path = require("path");
//   // app.get("/", (req, res) => {
//   //   const __filename = fileURLToPath(import.meta.url);

//   //   const __dirname = path.dirname(__filename);
//   //   console.log("765rfghjhgfdfghj", __dirname);
//   //   app.use(express.static(path.join(__dirname, "redux-toolkit-1", "build")));
//   //   res.sendFile(
//   //     path.join(__dirname, "redux-toolkit-1", "build", "index.html")
//   //   );
//   // });
//   app.use(express.static("redux-toolkit-1/build"));
// }

app.listen(PORT, () => {
  console.log("server started", PORT);
});
