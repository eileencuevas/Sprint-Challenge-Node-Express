const express = require('express');
const projectModel = require('../../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectModel
        .get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({ "error": 'No information could be retrieved. '});
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    projectModel
        .get(id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ "error": 'No project found with the specified ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ "error": 'No information could be retrieved. '});
        });
})

router.get('/:id/actions/', (req, res) => {
    const id = req.params.id;

    projectModel
    .get(id)
    .then(project => {
        if (project) {
            projectModel
                .getProjectActions(id)
                .then(actions => {
                    res.status(200).json(actions);
                })
                .catch(() => {
                    res.status(500).json({ "error": 'No information could be retrieved. '});
                });
        } else {
            res.status(404).json({ "error": 'No project found with the specified ID.' });
        }
    })
    .catch(() => {
        res.status(500).json({ "error": 'No information could be retrieved. '});
    });
})

router.post('/', (req, res) => {
    const newProject = req.body;

    if (newProject.name && newProject.description) {
        projectModel
            .insert(newProject)
            .then(project => {
                res.status(201).json(newProject);
            })
            .catch(() => {
                res.status(500).json({ "error": 'No information could be retrieved. '});
            });
    } else {
        res.status(400).json({ "error": 'Please include a name and description.' });
    }
})

module.exports = router;