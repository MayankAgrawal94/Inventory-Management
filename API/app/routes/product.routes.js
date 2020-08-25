module.exports = (app) => {
    const product = require('../controllers/product.controller');

    app.get('/getAllProducts', product.fetch);
    app.post('/createNewProduct', product.create);
    app.delete('/productDelete/:_ids', product.delete);
}