const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();




app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error a consultar',
                    err

                });
            }
            res.json({

                ok: true,
                msg: 'Lista de usuarios obtenida con exito',
                conteo: usuarios.length,
                usuarios

            });
        });


});

// app.post('/usuario', function(req, res) {

//     res.json({

//         ok: 200,
//         mensaje: 'Usuario insertado con exito'

//     });

// });

app.post('/usuario', function(req, res) {

    // let nombre = req.body.nombre;

    let body = req.body;
    let usr = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: body.password

    });

    usr.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            usrDB

        });

    });
    // if (nombre === undefined) {
    //     res.status(400).json({
    //         ok: '400',
    //         mensaje: 'Favor de enviar el nombre'

    //     });
    // } else {

    //     res.json({
    //         ok: '200',
    //         mensaje: 'usuario insertado',
    //         body: body
    //     });
    // }
});


app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar',
                    err

                });
            }

            res.json({

                ok: true,
                msg: 'usuario actualizado con exito',
                usuario: usrDB

            });
        });

});


app.delete('/usuario/:id/:nombre', function(req, res) {
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
        ok: '200',
        mensaje: 'usuario eliminado',
        id: id,
        nombre: nombre

    });
});

module.exports = app;