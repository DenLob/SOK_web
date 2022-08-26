import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import {USER_ROUTE} from "../utils/consts";

const PhotoCard = ({photo}) => {
    const history = useHistory()

    return (
        <Col md={3} onClick={() => history.push(USER_ROUTE + '/' + photo.id)}>
            <Card
                className="d-flex"
                style={{cursor: 'pointer'}}
                border="light"
            >
                <Image id={photo.id} className="d-flex"
                       src={process.env.REACT_APP_API_URL + photo.name + '_tmp.' + photo.path.substr(-3, 3)}/>
                {/*{photo.info.map(info =>*/}
                {/*    <div key={info.id}>*/}
                {/*        {info.name === 'tomato' ? 'Томаты' :*/}
                {/*            info.name === 'orange' ? 'Апельсины' :*/}
                {/*                info.name === 'banana' ? 'Бананы' :*/}
                {/*                    info.name} : {info.count}. Из них:*/}
                {/*        {info.classes.map(classTmp =>*/}
                {/*            <div key={classTmp.id}>*/}
                {/*                {*/}
                {/*                    classTmp.name === 'bad' ? 'Плохих' :*/}
                {/*                        classTmp.name === 'green' ? 'Зелёных':*/}
                {/*                        classTmp.name === 'norm' ? 'Нормальных' :*/}
                {/*                            classTmp.name === 'good' ? 'Хороших' :*/}
                {/*                                classTmp.name*/}
                {/*                } : {classTmp.count}</div>)}*/}
                {/*    </div>)}*/}


            </Card>
        </Col>
    );
};

export default PhotoCard;