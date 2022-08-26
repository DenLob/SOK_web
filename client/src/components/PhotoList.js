import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import PhotoCard from "./PhotoCard";

const PhotoList = observer(() => {
    const {photos} = useContext(Context)
    const [selectedProduct, setSelectedProduct] = useState({})


    useEffect(() => {
        setSelectedProduct(photos.selectedProduct)
    }, [photos.selectedProduct])

    return (
        <Row className="d-flex">
            {photos['photos'].photos.map(photo =>

                typeof selectedProduct.id !== 'undefined' ?
                    photo.info.findIndex(product => product.name === selectedProduct.name) !== -1 &&
                    <PhotoCard key={photo.id} photo={photo}/>
                    : <PhotoCard key={photo.id} photo={photo}/>
            )}
        </Row>
    );
});

export default PhotoList;