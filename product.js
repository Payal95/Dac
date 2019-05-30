const express = require('express');

const router = express.Router();

const db = require('./dbConnect');

router.get('/product',(request,response)=>{
    const statement = 'select * from product';
    const connection = db.connect();

    connection.query(statement,(error,products)=>{
        if (error) {
            console.log(error);
        } else {
            //console.log(products);
        }
        connection.end();
        response.send(products);
    });
 
});

router.post('/product',(request,response)=>{
    const name = request.body.name;
    const price = request.body.price;
    const rating = request.body.rating;
 
    const statement = `insert into product(name,price,rating)values('${name}',${price},${rating})`;

    const connection = db.connect();
    connection.query(statement,(error,products)=>{
        if(error)
        {
            console.log(error);
        }
        else{
            console.log(products);
        }
        connection.end();
        response.send(products);
    });

});

router.put('/product/:id',(request,response)=>{
    const id = request.params.id;
    const name = request.body.name;
    const price = request.body.price;
    const rating = request.body.rating;
    const statement = `update product set name = '${name}',price = ${price},rating = ${rating} where id = ${id}`;
    const connection = db.connect();
    connection.query(statement,(error,products)=>{
        connection.end();
        response.send(products);
    });
});

router.delete('/product/:id',(request,response)=>{
    const id = request.params.id;
    const statement = `delete from product where id = ${id}`;
    const connection = db.connect();
    connection.query(statement,(error,products)=>{
        connection.end();
        response.send(products);
    });
});
module.exports = router;