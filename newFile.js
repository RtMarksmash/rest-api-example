const { app, products } = require('./server');

app.put('/products/:id', (req, res) => {

    console.log(req.params.id);
    const newData = req.body;
    const foundProduct = products.find((products) => (products.id === parseInt(req.params.id)));
    console.log(foundProduct);

    if (!foundProduct) {
        return res.status(404).json({
            "mensaje": "no encontrado su producto"
        });
    };

    products = products.map((product) => (product.id === parseInt(req.params.id) ? {...product, ...newData } : product));

    console.log(newProduct);

    res.json({
        "message": "product update succesfully"
    });

});