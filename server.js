const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const server = require('http').Server(app);
const config = require('./config');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const products = [];

app.get('/products', (req, res) => {
    res.send(products)
})

app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1 }
    products.push(newProduct)
    res.send(newProduct)

})

app.put('/products', (req, res) => {
    res.send('editando productos')
})

app.delete('/products', (req, res) => {
    res.send('borrando productos')
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