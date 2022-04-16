const express = require('express');
const doctors = require('../services/doctors');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.json(await doctors.getMultiple(req.params.page));
    } catch (err) {
        console.error(`Error while getting the data!`, err.message);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        res.send(await doctors.create(req.body));
    } catch(err) {
        console.error(`Error while creating doctor!`, err.message);
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        res.send(await doctors.update(req.params.id, req.body));
    } catch (err) {
        console.error( `Error while Updating doctors detail`, err.message);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        res.send(await doctors.remove(req.params.id));
    } catch (err) {
        console.error(`Error while Deleting doctors detail`, err.message);
        next(err);
    }
})
module.exports = router;