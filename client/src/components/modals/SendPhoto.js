import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {sendPhoto} from "../../http/photoAPI";

const SendPhoto = ({show, onHide}) => {
    const [file, setFile] = useState(null)
    const selectFile = event => {
        setFile(event.target.files[0])
    }
    const send = () => {
        const formData = new FormData()
        formData.append('file', file)
        sendPhoto(formData).then(data => onHide())
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Загрузить фото
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={send}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SendPhoto;