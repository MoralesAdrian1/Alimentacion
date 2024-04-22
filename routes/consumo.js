const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/alimentacion',['consumo']);
const ObjectId = require('mongodb').ObjectId;


router.get('/consumo',(req,res,next)=>{
    db.consumo.find((err,consumo) => {
        if(err) return next(err);
        res.json(consumo);
    });
});

router.get('/consumo/:id', (req, res, next) => {
    db.consumo.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, consumo) => {
        if (err) return next(err);

        if (!consumo) {

            return res.status(404).json({ error: 'consumo not found' });
        }

        res.json(consumo);
    });
});

router.post('/consumo', (req, res, next) => {
    const consumo = req.body;

    // Verificar que los campos requeridos estén presentes
    if (!consumo.username || !consumo.fechaComida || !consumo.horaComida || !consumo.comida) {
        res.status(400).json({
            error: 'Bad data: Missing required fields'
        });
    } else {
        db.consumo.save(consumo, (err, consumoSaved) => {
            if (err) return next(err);
            res.json(consumoSaved);
        });
    }
});

 router.delete('/consumo/:id', (req, res, next) => {
    const consumoID = req.params.id;

    if (!ObjectId.isValid(consumoID)) {
        return res.status(400).json({ error: 'Invalid consumo id' });
    }

    db.consumo.remove({ _id: ObjectId(consumoID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'consumo not found' });
        }

        res.json({ message: 'consumo deleted successfully' });
    });
});

router.put('/consumo/:id', (req, res, next) => {
    const consumoID = req.params.id;
    const {username,fechaComida,
        horaComida,
        comida,
        alimentos} = req.body;

    if (!ObjectId.isValid(consumoID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(consumoID) };
    const update = {
        $set: {
            username,
            fechaComida,
            horaComida,
            comida,
            alimentos
        }
    };

    db.consumo.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'user not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'categoria updated successfully' });
    });
});
module.exports=router;