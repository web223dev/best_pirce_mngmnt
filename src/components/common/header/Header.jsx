import React, { Component } from 'react';
import Nav from 'components/common/header/nav/Nav';
import { Link } from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import logo from 'components/common/img/seifs.png';
import logoRight from 'components/common/img/7-11-logo.jpg';
import './header.css';




class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="row">
                        <div className="col-2 logo logoLeft">
                            <Link to="/">
                                    <img src={logo} alt="Logo" width="75" />
                            </Link>
                        </div>
                        <div className="col-3 header-text text-left">
                            <h1>Best Price Management</h1>
                        </div>
                           
                        <div className="col-3">
                            <Nav/>
                        </div>

                        <div className="col-2">
                            <FontAwesome className="fas fa-user text-danger" name="user" /> <span>Peter, DHaiti</span>
                        </div>

                        <div className="col-2 logo logoRight text-right">
                            <Link to="/">
                                <img src={logoRight} alt="Logo" width="125" /> 
                            </Link>
                        </div>
                          

                      
                        </div>
                        <hr />
                    </header>
            </div>
        );
    }
}

export default Header;