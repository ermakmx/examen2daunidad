require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('<h1>Bienvenido al servidor Rest<h1>')
});

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

    let nombre = req.body.nombre;
    let body = req.body;
    if (nombre === undefined) {
        res.status(400).json({
            ok: '400',
            mensaje: 'Favor de enviar el nombre'

        });
    } else {

        res.json({
            ok: '200',
            mensaje: 'usuario insertado',
            body: body
        });
    }
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

mongoose.connect('mongodb://localhost:27017/cafeteria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, resp) => {

    if (err) throw err;
    console.log('Servidor BD Online');


});


app.listen(process.env.PORT, () => {



    console.log('server online puerto', process.env.PORT);
});