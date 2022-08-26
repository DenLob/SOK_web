import React, {useContext} from 'react';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import {nav, Button} from 'react-bootstrap'
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, USER_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink style={{color: "white", textDecoration: "none"}} to={user.isAuth ? USER_ROUTE : LOGIN_ROUTE}>C.O.K.</NavLink>
                {user.isAuth ?
                    <div className="justify-content-end" id="navbarNav">
                        <Button
                            variant={"outline-light"}
                            onClick={() => {
                                history.push(USER_ROUTE)
                            }}
                        >
                            Личный кабинет
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </div>
                    :
                    <div className="justify-content-end" id="navbarNav">
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </div>
                }

            </div>
        </div>
    );


});

export default NavBar;