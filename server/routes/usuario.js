const express = require('express');
const Usuario = require('../models/usuario');
const app = express();




app.get('/usuario', function(req, res) {
    res.json({

        ok: 200,
        mensaje: 'Usuarios consultados con exitos'

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


app.put('/usuario/:id/:nombre', function(req, res) {
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
        ok: '200',
        mensaje: 'usuario actualizado',
        id: id,
        nombre: nombre

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