const router = require('express').Router();

const {
    getAllThoughts,
    thoughtById,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(thoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;