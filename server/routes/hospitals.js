const express = require('express');
const router = express.Router();
const hospitals = require('../services/hospitals');


router.get('/', async (req, res, next) => {
    try{
        res.json(await hospitals.getMultiple(req.query.page));
    }catch (err) {
        console.error(`Error while getting the data!`, err.message);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        res.send(await hospitals.create(req.body));
    } catch(err) {
        console.error(`Error while creating hospital!`, err.message);
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        res.send(await hospitals.update(req.params.id, req.body));
    } catch (err) {
        console.error( `Error while Updating hospitals detail`, err.message);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await hospitals.remove(req.params.id));
    } catch (err) {
        console.error(`Error while Deleting hospitals detail!`, err.message);
        next(err);
    }
})

module.exports = router;