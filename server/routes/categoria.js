const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../models/categoria');


app.get('/categoria', (req, res) => {

    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Categoria.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ocurrio un error al listar las categoria',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Categorias listadas con exito',
                conteo: categorias.length,
                categorias
            });

        });

});

app.post('/categoria', (req, res) => {

    let cat = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.body.usuario
    });

    cat.save((err, catDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'error al insertar categoria',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'La categoria se inserto con exito',
            catDB
        });
    });

});

app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'usuario']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar categoria',
                err

            });
        }

        res.json({
            ok: true,
            msg: 'La categoria fue actualizada con exito',
            catDB

        });

    });

});


app.delete('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, { context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al borrar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'La categoria fue eliminada',
            catDB

        });



    });

});
module.exports = app;