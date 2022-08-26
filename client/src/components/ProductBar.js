import React, {useContext} from 'react';
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup"
import {observer} from "mobx-react-lite";

const ProductBar = observer(() => {
    const {photos} = useContext(Context)
    return (
        <ListGroup>
            {photos['photos'].products.map(product => {
                return (<ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={product.id === photos.selectedProduct.id}
                    onClick={() =>
                        photos.setSelectedProduct(product)
                    }
                    key={product.id}
                >
                    {product.name === 'tomato' ? 'Томаты' :
                    product.name === 'orange' ? 'Апельсины' :
                    product.name === 'banana' ? 'Бананы' :
                    product.name}
                </ListGroup.Item>)
            }
            )

            }
        </ListGroup>
    );
})

export default ProductBar;