const express = require('express');
const actionModel = require('../../data/helpers/actionModel');

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

module.exports = router;