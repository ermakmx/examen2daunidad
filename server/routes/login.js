const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = require('./producto');


app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email, estado: true }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'error en el logueo',
                err

            });
        }

        if (!usrDB) {
            return res.status(400).json({

                ok: false,
                msg: 'mail incorrecto o no existe'
            });

        }

        if (!bcrypt.compareSync(body.password, usrDB.password)) {
            return res.status(401).json({
                ok: false,
                msg: 'contraseña invalida'
            });
        }

        res.json({

            ok: true,
            msg: `Bienvenido ${usrDB.nombre}`,
            usrDB

        });



    });

});


module.exports = app;