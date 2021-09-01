import React from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import {Tabs, Tab} from '@material-ui/core';
import Login from './Login';
import Register from './Register';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const Header = () => {
    const[loggedIn, setLoggedIn] = React.useState(false);
    const[modalIsOpen, setModalIsOpen] = React.useState(false);
    const[modalOptionSelected, setModalOptionSelected] = React.useState("Login");

    const tabChangeHandler = (event, value) => {
        setModalOptionSelected(value);
    }

    const loginButtonLabelText = loggedIn?"Logout":"Login";

    return (
        <div>
            <header className="app-header">
                <img src={logo} className="app-logo" alt="Logo" />
                <span>
                </span>
                <span style={{float:"right"}}>
                    <Button variant="contained"
                            color="default">
                        Book Show
                    </Button>
                    &nbsp; &nbsp;
                    <Button variant="contained"
                            color="default"
                            onClick={()=>{setModalIsOpen(true)}}>
                        {loggedIn?"Logout":"Login"}
                    </Button>
                </span>
                <Modal
                    ariaHideApp={false}
                    isOpen={modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={()=>{setModalIsOpen(false);}}
                    style={customStyles}
                >
                    <Tabs className="tabs" value="Login" onChange={tabChangeHandler}>
                        <Tab label="Login" value="Login"/>
                        <Tab label="Register" value="Register"/>
                    </Tabs>
                    {modalOptionSelected==="Login"?<Login/>: <Register/>}
                </Modal>
            </header>
        </div>
    )
}

export default Header;
