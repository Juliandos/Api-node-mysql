// const express = require("express");
// const mysql = require("mysql");
// const myconn = require("express-myconnection");

// const booksRouter = require("./routes/books");
import express from "express";
import mysql from "mysql";
import myconn from "express-myconnection";
import booksRouter from "./routes/books.js";

const app = express();

const dboptions = {
  host: "localhost",
  user: "root",
  password: "",
  database: "library_node_mysql",
};

app.set("port", process.env.PORT || 9000);

// middlewares -------------------
app.use(myconn(mysql, dboptions, "single"));
app.use(express.json());

app.listen(app.get("port"), () => {
  console.log("listening on port", app.get("port"));
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", booksRouter);
