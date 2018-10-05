// Middleware
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// Server helpers
const projectDb = require('./data/helpers/projectModel');
const actionDb = require('./data/helpers/actionModel');

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
  projectDb
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err => console.log(err));
});

// GET request to pull up a specific project by ID
server.get('/api/projects/:id', (req, res) => {
  projectDb
    .get(req.params.id)
    .then(project => res.status(200).send(project))
    .catch(err => res.status(500).send(err));
});

// POST request to create new project
server.post("/api/projects", (req, res) => {
  const newProject = req.body;
  projectDb
    .insert(newProject)
    .then(project => {
      projectDb
        .get(project.id)
        .then(projectExists => res.status(200).send(projectExists))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// PUT to edit an existing project
server.put("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const updatedProject = req.body;
  projectDb.update(id, updatedProject)
    .then(projectExists => res.status(200).json(projectExists))
    .catch(err => res.status(500).json({ error: `Server error --> ${err} `}));
});

// DELETE request to delete a specific project
server.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then(projects =>
      res.status(200).send(`Project # ${id} successfuly deleted.`)
    )
    .catch(err => res.status(500).send(err));
});

///////

/// Actions Routes ////

// GET all actions from server
server.get("/api/actions", (req, res) => {
  actionDb
    .get()
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(500).send(err));
});

// GET a specific post by id
server.get("/api/actions/:id", (req, res) => {
  actionDb
    .get(req.params.id)
    .then(post => res.status(200).send(post))
    .catch(err => res.status(500).send(err));
});

// GET all actions associated with a specific project
server.get("/projects/:id/actions", (req, res) => {
// in progress //
});

// POST a new action 
server.post("/api/actions", (req, res) => {

  const { description, notes, project_id } = req.body;
  const newAction = { description, notes, project_id };
  
  actionDb
    .insert(newAction)
    .then(action => {
      actionDb
        .get(action.id)
        .then(newActionConfirmed => res.status(200).send(newActionConfirmed))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });

});

///////

// PUT to edit an existing action
server.put("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  const { description, notes, project_id } = req.body;
  const action = { description, notes, project_id };

  actionDb.update(id, action).then(updatedAction =>
    actionDb
      .get(id)
      .then(editedActionConfirmed => res.status(200).send(editedActionConfirmed))
      .catch(err => res.status(500).send(err))
  )
  .catch(err => res.status(500).send(err));
});

// DELETE a specific action by id
server.delete("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  actionDb.remove(id)
    .then(post => res.status(200).send(`Action # ${id} successfully removed.`))
    .catch(err => res.status(500).send(err));
});

///////

// Port listening
const port = 5000;
server.listen(port, () => console.log(`Server is listening to port ${port}`)); 