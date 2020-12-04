const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

app.get('/producto', (req, res) => {

    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Producto.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('categoria', 'descripcion usuario')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ocurrio un error al listar los productos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Productos listados con exito',
                conteo: productos.length,
                productos
            });

        });

});

app.post('/producto', (req, res) => {

    let pro = new Producto({

        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        categoria: req.body.categoria,
        disponible: req.body.disponible,
        usuario: req.body.usuario
    });

    pro.save((err, proDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'error al insertar producto',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El producto se inserto con exito',
            proDB
        });
    });

});

app.put('/producto/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'categoria', 'usuario']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar el producto',
                err

            });
        }

        res.json({
            ok: true,
            msg: 'El producto fue actualizado con exito',
            proDB

        });

    });

});


app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndRemove(id, { context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al borrar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El producto fue eliminado',
            proDB

        });



    });

});
module.exports = app;