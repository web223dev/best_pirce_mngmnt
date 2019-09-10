
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPageContainer from 'containers/LandingPageContainer/LandingPageContainer';
import ExistingCustomers from './components/ExistingCustomers/ExistingCustomers';
import Prospects from './components/Prospects/Prospects';
import Report from './components/Report/Report';
import DayDeals from './components/DayDeals/DayDeals';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';



class Routing extends Component {
    render() {
        return (

            <div className="container-fluid">
              <Router basename="/">
                    <section id="head" className="fixed-top">
                        <Header/>
                </section>

                    <div>
                        <section id="main">
                  

                        
                            <Switch>
                                <Route exact path="/" component={LandingPageContainer} />
                                <Route exact path="/customers" component={ExistingCustomers} />
                                <Route exact path="/prospects" component={Prospects} />
                                <Route exact path="/report" component={Report} />
                                <Route exact path="/daydeals" component={DayDeals} />
                            </Switch>
                           

                      
                    </section>
                </div>

                <section id="foot">
                    <Footer />
                    </section>
                </Router>
            </div>
        );
    }
}


export default Routing;
