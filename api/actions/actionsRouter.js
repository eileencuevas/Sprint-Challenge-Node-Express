const express = require('express');
const actionModel = require('../../data/helpers/actionModel');
const projectModel = require('../../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionModel
        .get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ "error": 'No information could be retrieved. '});
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    actionModel
        .get(id)
        .then(action => {
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ "error": 'No action found with the specified ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ "error": 'No information could be retrieved. '});
        });
})

router.post('/', (req, res) => {
    const newAction = req.body;

    if (newAction.project_id && newAction.description && newAction.notes) {
        projectModel
            .get(newAction.project_id)
            .then(() => {           
                actionModel
                    .insert(newAction)
                    .then(insertedAction => {
                        res.status(201).json(insertedAction);
                    })
                    .catch(() => {
                        res.status(500).json({ "error": `The action couldn't be added. Please try again. `});
                    });
            })
            .catch(() => {
                res.status(404).json({ "error": 'No project found with the specified ID.' });
            });
    } else {
        res.status(400).json({ "error": 'Please include a Project ID, description, and notes.' });
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const dataForUpdate = req.body;

    actionModel
        .update(id, dataForUpdate)
        .then(updatedAction => {
            if (updatedAction) {
                res.status(200).json(updatedAction);
            } else {
                res.status(404).json({ "error": 'No action found with the specified ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ "error": `The action couldn't be updated. Please try again. `});
        });
})

module.exports = router;