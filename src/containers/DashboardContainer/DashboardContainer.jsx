import React, { Component } from 'react';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ExistingCustomers from '../../components/ExistingCustomers/ExistingCustomers';
import Prospects from '../../components/Prospects/Prospects';
import Report from '../../components/Report/Report';
import DayDeals from '../../components/DayDeals/DayDeals';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import './dashboardContainer.css';




class DashboardContainer extends Component {
    render() {
        return (
            <div className="container-fluid">
                <section id="head">
                    <Header/>
                </section>

                <div>
                    <section id="main">
                        <Switch>

                            <Router>
                                <div>
                                    <Route exact path="/" component={ExistingCustomers} />
                                    <Route exact path="/prospects" component={Prospects} />
                                    <Route exact path="/report" component={Report} />
                                    <Route exact path="/deals" component={DayDeals} />
                                    
                                </div>
                            </Router>

                        </Switch>
                    </section>
                </div>

                <section>
                    <Footer/>
                </section>
            </div>
        );
    }
}

export default DashboardContainer;