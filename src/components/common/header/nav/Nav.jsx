import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'components/common/header/nav/nav.css';



class Nav extends Component {
    render() {
        return (
            <div>
           
                <nav className="navbar navbar-expand-md text-success navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/customers">Customers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/prospects">Prospects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/report">Report</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/daydeals">Day Deals</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

    
                    
            </div>
        );
    }
}


export default Nav;