const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and relencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET route for homepage
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// POST route for homepage
app.post("/api/notes", (req, res) => {
  req.body.id = notes.length;
  const newNote = req.body;
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  res.json(newNote);
});

// Delete notes
app.delete("/api/notes/:id", (req, res) => {
  const deleteSlectNote = req.params.id;
  notes.splice(deleteSlectNote, 1);

  for (let i = 0; i < notes.length; i++) {
    notes[i].id = i;
    // console.log(notes[i]);
  }

  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes, null, 2)
  );

  res.json(req.body);
});

// HTML files routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// PORT to listen
app.listen(PORT, () => {
  console.log(`The app is running on port http://localhost:${PORT}`);
});
