//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//express and ports
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));




console.log("hello world")


//initiate server
app.listen(PORT, () => {
    console.log("App listening on port " + PORT)
})