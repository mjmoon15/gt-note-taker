//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("body-parser");

//express and ports
const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//html routes
//notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

//api/json route
app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname, "public/db.json", "utf8", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data))
    })
})
//add a new note
    //read notes
app.post("/api/notes", (req, res) => {
    fs.readFile(__dirname, "/public/db.json", "utf8", (err, data) => {
        if (err) throw err;

        //parse new data from JSON and set ids for new notes
        const jsonData = JSON.parse(data);
        const idArray = jsonData.map(note => note.id);
        const biggestId = Math.max(...idArray);
        const newNote = req.body;
        newNote.id = biggestId + 1;
        jsonData.push(newNote)

        //write new
        fs.writeFile(__dirname, "/public/db.json", JSON.stringify(jsonData), (err, data) => {
            if (err) throw err;
            res.json(jsonData);

        })
    })
})

//index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

//initiate server
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT)
})