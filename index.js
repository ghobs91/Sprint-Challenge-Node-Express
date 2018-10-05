// Middleware
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// Server helpers
const projectModel = require('./data/helpers/projectModel');
const actionModel = require('./data/helpers/actionModel');

// Server init
const server = express();
server.use(logger('combined'));
server.use(cors());
server.use(express.json());

/// Project Routes ///

// GET request to root
server.get('/', (req, res) => {
  res.send('Successfully made GET request to root');
});

// GET request to pull up all Projects
server.get( '/api/projects', (req, res) => {
  projectModel
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err => console.log(err));
});

// GET request to pull up a specific project by ID
server.get('/api/projects/:id', (req, res) => {
  projectModel
    .get(req.params.id)
    .then(project => res.status(200).send(project))
    .catch(err => res.status(500).send(err));
});

// POST request to create new project
server.post("/api/projects", (req, res) => {
  const newProject = req.body;
  projectModel
    .insert(newProject)
    .then(project => {
      projectModel
        .get(project.id)
        .then(projectExists => res.status(200).send(projectExists))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// PUT to edit an existing project
server.put("/api/projects/:id", (req, res) => {
// in progress //
});

// DELETE request to delete a specific project
server.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  projectModel
    .remove(id)
    .then(projects =>
      res.status(200).send(`Project # ${id} successfuly deleted.`)
    )
    .catch(err => res.status(500).send(err));
});

///////

/// Actions Routes ////



///////

// Port listening
const port = 5000;
server.listen(port, () => console.log(`Server is listening to port ${port}`)); 