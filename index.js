const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const {
  addNote,
  getNotes,
  updatingNote,
  removeNote,
} = require('./notes.controller');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title);
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (e) {
    console.error('Creation error, e');
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: false,
      error: true,
    });
  }
});

app.put('/:id', async (req, res) => {
  await updatingNote(req.params.id, req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

mongoose
  .connect(
    'mongodb+srv://progeat:silviaS2000@clustertest.vfynt.mongodb.net/notes?retryWrites=true&w=majority&appName=ClusterTest'
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
