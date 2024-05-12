const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const server = require('http').Server(app);
const config = require('./config');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

let products = [];

app.get('/products', (req, res) => {
    res.send(products)
})

app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1 }
    products.push(newProduct)
    res.send(newProduct)

})

app.put('/products/:id', (req, res) => {

    console.log(req.params.id)
    const newData = req.body
    const foundProduct = products.find((products) => (products.id === parseInt(req.params.id)));
    console.log(foundProduct)

    if (!foundProduct) {
        return res.status(404).json({
            "mensaje": "no encontrado su producto"
        })
    };

    products = products.map((product) => (product.id === parseInt(req.params.id) ? {...product, ...newData } : product))


    res.json({
        "message": "product update succesfully"
    })
})

app.delete('/products/:id', (req, res) => {

    console.log(req.params.id)
    const productFind = products.find((product) => (product.id == parseInt(req.params.id)))
    console.log(productFind)

    if (!productFind) {
        return res.status(404).json({
            "menssage": "no se encontro"
        })
    }

    products = products.filter((product) => (product.id !== parseInt(req.params.id)));

    res.sendStatus(204);
})


app.get('/products/:id', (req, res) => {
    console.log(req.params.id)
    const productFind = products.find((product) => (product.id == req.params.id))
    console.log(productFind)

    if (!productFind) {
        return res.status(404).json({
            "menssage": "no se encontro"
        })
    }

    res.send(productFind)
})


server.listen(config.port, () => {
    console.log(`${config.message}${config.port}`)
});