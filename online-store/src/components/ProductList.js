import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../index';
import { Container, Row } from 'react-bootstrap';
import Product from './Product';

const ProductList = observer(() => {
    const {user, product} = useContext(Context);

    useEffect(() => {
        if (product.categoriesToDisplay.length === 0) {
            product.setCurrentProducts(product.products);
            return
        }

        const categoriesToDisplay = product.categoriesToDisplay.map(category => category.name)

        product.setCurrentProducts(product.products.filter(product => categoriesToDisplay.includes(product.category)))
    }, [product.products, product.categoriesToDisplay]);

    const [columns, setColumns] = useState(4) 

    useEffect(() => {
        if (user.userWidth < 992) {
            setColumns(2)
        } else if (user.userWidth < 1200) {
            setColumns(3)
        } else if (user.userWidth >= 1200) {
            setColumns(4)
        }
    }, [user.userWidth]);

    return (
        <Container style={{background: '#dedede', padding: 10, overflow: 'auto'}}>
            <Row style={{display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, width: '100%'}}>
                {product.currentProducts.map(product => 
                    <Product key={product.key} item={product} />    
                )}
            </Row>
        </Container>
    );
});

export default ProductList;