import React, {useContext, useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductBar from "../components/ProductBar";
import PhotoList from "../components/PhotoList";
import Button from "react-bootstrap/Button";
import SendPhoto from "../components/modals/SendPhoto";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchPhotos} from "../http/photoAPI";

const Cabinet = observer(context => {
    const {photos} = useContext(Context)

    useEffect(() => {
        fetchPhotos().then(data => {
            photos.setPhotos(data)
        })
    }, [])
    const [modalPhotoVisible, setModalPhotoVisible] = useState(false)
    return ( photos['photos'].photos ?
        <div className="container-fluid">
            <Row className="d-flex  mt-3">
                <Col md={2}>
                    <Button onClick={() => setModalPhotoVisible(true)}>
                        Загрузить фото
                    </Button>
                    <SendPhoto show={modalPhotoVisible} onHide={() => setModalPhotoVisible(false)}/>
                </Col>

            </Row>
            <Row className="d-flex justify-content-between mt-3">

                <Col md={3}>
                    <ProductBar/>
                </Col>
                <Col md={9}>
                    <PhotoList/>
                </Col>
            </Row>
        </div> :
            <div></div>
    );
});

export default Cabinet;