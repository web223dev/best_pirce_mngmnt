import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from "react-router-dom";
import './landingPage.css';



class LandingPage extends Component {
    render() {
        return (
            <div className="container text-center">
                <div className="card-columns">
                <Link to="customers">
                        <div className="cardHiding card-LandingPage card bg-success">
                        <article className="card-body text-center">
                            <FontAwesome className="far fa-check-circle fa-5x" name="check-circle" />
                            <h3 className="card-text">Customers</h3>
                        </article>
                    </div>
                </Link>

            
                <Link to="report">
                        <div className="card card-LandingPage bg-warning bg-warning-card">
                        <article className="card-body text-center">
                            <FontAwesome className="fas fa-tasks fa-3x" name="tasks"/>
                            <h2 className="card-text card-text">Report</h2>
                        </article>
                    </div>
                    </Link>
          

                

                <Link to="#">
                        <div className="cardHiding card-LandingPage card bg-danger">
                        <article className="card-body text-center">
                            <FontAwesome className="far fa-address-book fa-5x" name="address-book" />
                            <h3 className="card-text">Prospects</h3>
                        </article>
                    </div>
                </Link>

                <Link to="customers">
                        <div className="card card-LandingPage bg-success">
                        <article className="card-body text-center">
                            <FontAwesome className="far fa-check-circle fa-3x" name="check-circle" />
                            <h2 className="card-text">Customers</h2>
                        </article>
                    </div>
                </Link>

                <Link to="#">
                        <div className="card card-LandingPage bg-light">
                        <article className="card-body text-center">
                            <FontAwesome className="fas fa-home fa-5x" name="home" />
                        </article>
                    </div>
                </Link>



                <Link to="prospects">
                        <div className="card card-LandingPage bg-danger">
                        <article className="card-body text-center">
                            <FontAwesome className="far fa-address-book fa-3x" name="address-book" />
                            <h2 className="card-text">Prospects</h2>
                        </article>
                    </div>
                </Link>

                <Link to="#">
                        <div className="cardHiding card-LandingPage card bg-success">
                        <article className="card-body text-center">
                            <FontAwesome className="far fa-check-circle fa-5x" name="check-circle" />
                            <h3 className="card-text">Existing Customers</h3>
                        </article>
                    </div>
                </Link>

                <Link to="daydeals">
                        <div className="card card-LandingPage bg-info bg-info-card">
                        <article className="card-body text-center">
                            <FontAwesome className="fas fa-blog fa-3x" name="blog" />
                            <h2 className="card-text">Day Deals</h2>
                        </article>
                    </div>
                    </Link>
            



                <Link to="#">
                        <div className="cardHiding card-LandingPage card bg-danger">
                        <article className="card-body text-center">
                            <FontAwesome className="far fa-address-book fa-5x" name="address-book" />
                            <h3 className="card-text">Prospects</h3>
                        </article>
                    </div>
                </Link>
                </div>
            </div>
        );
    }
}

export default LandingPage;