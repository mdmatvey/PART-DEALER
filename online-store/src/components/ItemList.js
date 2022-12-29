import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { Row } from 'react-bootstrap';
import Item from './Item';

const ItemList = observer(() => {
    const {item} = useContext(Context)

    return (
        <Row className="d-flex">
            {item.items.map(item => 
                <Item key={item.key} item={item} />    
            )}
        </Row>
    );
});

export default ItemList;