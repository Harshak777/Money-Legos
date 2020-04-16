const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const projectname = req.body.projectname;
  const description = req.body.description;
  const deadline = Number(req.body.deadline);
  const fund = Number(req.body.fund);

  const newProject = new Project({
    _id,
    projectname,
    description,
    deadline,
    fund,
  });

  newProject.save()
  .then(() => res.json('Project added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});
/*
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/update').post((req, res) => {
  Project.findById(req.body._id)
    .then(project => {
      project.projectname = req.body.projectname;
      project.description = req.body.description;
      project.deadline = Number(req.body.deadline);
      project.fund = Number(req.body.fund);

      project.save()
        .then(() => res.json('Project updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;