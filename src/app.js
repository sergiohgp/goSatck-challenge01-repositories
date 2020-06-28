const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // Lists all repositories in the array
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // Routo to create a new repository
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // Updates the repository with the matched id
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }
  
  repositories[repositoryIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // Deletes an existing repository with matched id
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  } else {
    repositories.splice(repositoryIndex, 1)
  }


  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  // Create a like to an specific repository 
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {return response.status(400).json({ error: 'Repository not found.' })}

  repositories[repositoryIndex].likes++  

  // const repository = {
  //   id: uuid(),
  //   title,
  //   url,
  //   techs,
  //   likes: 0
  // }

  return response.json(repositories[repositoryIndex])
  // return response
});

module.exports = app;
