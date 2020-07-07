//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//express and ports
const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


//notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"))
})

//read json/get api calls
app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data))
    })
})

//write new notes to json/api
app.post("/api/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        const jsonData = JSON.parse(data);

    })
})



//index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/", "index.html"));
  });

//api/json route




//initiate server
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT)
})