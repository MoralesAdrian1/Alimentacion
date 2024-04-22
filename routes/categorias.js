const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/alimentacion',['categoria']);
const ObjectId = require('mongodb').ObjectId;


router.get('/categoria',(req,res,next)=>{
    db.categoria.find((err,categoria) => {
        if(err) return next(err);
        res.json(categoria);
    });
});

router.get('/categoria/:id', (req, res, next) => {
    db.categoria.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, categoria) => {
        if (err) return next(err);

        if (!categoria) {

            return res.status(404).json({ error: 'user not found' });
        }

        res.json(categoria);
    });
});

router.post('/categoria', (req, res, next) => {
    const categoria = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!categoria.categoriaAlimento) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.categoria.save(categoria, (err, categoriaSaved) => {
            if (err) return next(err);
            res.json(categoriaSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/categoria/:id', (req, res, next) => {
    const categoriaID = req.params.id;

    if (!ObjectId.isValid(categoriaID)) {
        return res.status(400).json({ error: 'Invalid categoria id' });
    }

    db.categoria.remove({ _id: ObjectId(categoriaID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'categoria not found' });
        }

        res.json({ message: 'categoria deleted successfully' });
    });
});

router.put('/categoria/:id', (req, res, next) => {
    const categoriaID = req.params.id;
    const {categoriaAlimento} = req.body;

    if (!ObjectId.isValid(categoriaID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(categoriaID) };
    const update = {
        $set: {
            categoriaAlimento,
        }
    };

    db.categoria.updateOne(query, update, (err, result) => {
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