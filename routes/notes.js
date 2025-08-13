const router = require('express').Router();
let Note = require('../models/note.model');

router.route('/get-all/').get((req, res) => {
  Note.find()
    .then(notes => res.json( {data:notes}))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const tags = req.body.tags;
  console.log(req)
  const newNote = new Note({
    title,
    content,
    tags,
  });

  newNote.save()
    .then(() => res.json('Note added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/detail/:id').get((req, res) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json('Note deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      note.title = req.body.title;
      note.content = req.body.content;
      note.tags = req.body.tags;

      note.save()
        .then(() => res.json('Note updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
