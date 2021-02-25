const express = require("express");

const People = require("./people/people-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/people", (req, res) => {
  People.getAll()
    .then(people => {
      res.status(200).json(people);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/people/:id", (req, res) => {
  res.end()
});

server.post("/people", (req, res) => {
  People.insert(req.body)
    .then(person => {
      res.status(200).json(person);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete("/people/:id", (req, res) => {
  res.end()
});

server.put("/people/:id", (req, res) => {
  res.end()
});

module.exports = server;