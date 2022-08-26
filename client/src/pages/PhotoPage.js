import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import {useParams} from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchOnePhoto} from "../http/photoAPI";

const PhotoPage = () => {
    const [photo, setPhoto] = useState({})
    const {id} = useParams()

    useEffect(() => {
        fetchOnePhoto(id).then(data => {
            setPhoto(data.photos[0])
        })
    }, [])
    return (photo.name ?
            <Container className="container-fluid">
                <Row className="d-flex">
                    <Col md={10}>
                        <Image className="card-img" src={process.env.REACT_APP_API_URL + photo.name +  '_tmp.' + photo.path.substr(-3, 3)}/>
                    </Col>
                    <Col md={2}>
                        {photo.info.map(info =>
                            <div key={info.id}>
                                {info.name === 'tomato' ? 'Томаты' :
                                    info.name === 'orange' ? 'Апельсины' :
                                        info.name === 'banana' ? 'Бананы' :
                                            info.name} : {info.count}. Из них:
                                {info.classes.map(classTmp =>
                                    <div key={classTmp.id}>
                                        {
                                            classTmp.name === 'bad' ? 'Плохих' :
                                                classTmp.name === 'green' ? 'Зелёных':
                                                    classTmp.name === 'norm' ? 'Нормальных' :
                                                        classTmp.name === 'good' ? 'Хороших' :
                                                            classTmp.name
                                        } : {classTmp.count}</div>)}
                            </div>)}
                    </Col>
                </Row>
            </Container> :
            <div></div>
    );
};

export default PhotoPage;