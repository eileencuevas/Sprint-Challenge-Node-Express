const express = require('express');
const projectModel = require('../../data/helpers/projectModel');

const router = express.Router();

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

router.post('/', (req, res) => {
    const newProject = req.body;

    if (newProject.name && newProject.description) {
        projectModel
            .insert(newProject)
            .then(insertedProject => {
                res.status(201).json(insertedProject);
            })
            .catch(() => {
                res.status(500).json({ "error": `The project couldn't be added. Please try again. `});
            });
    } else {
        res.status(400).json({ "error": 'Please include a name and description.' });
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const dataForUpdate = req.body;

    projectModel
        .update(id, dataForUpdate)
        .then(updatedProject => {
            if (updatedProject) {
                res.status(200).json(updatedProject);
            } else {
                res.status(404).json({ "error": 'No project found with the specified ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ "error": `The project couldn't be updated. Please try again. `});
        });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectModel
        .remove(id)
        .then(recordsDeleted => {
            if (recordsDeleted === 1) {
                res.status(200).json(recordsDeleted);
            } else {
                res.status(404).json({ "error": 'No project found with the specified ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ "error": `The project couldn't be deleted. Please try again. `});
        });
})

module.exports = router;