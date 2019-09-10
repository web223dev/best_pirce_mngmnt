import React, { Component } from 'react';
import LandingPage from 'components/LandingPage/LandingPage';
import './landingPageContainer.css';
import BgImage from 'components/common/img/Fuel-Landing-Page-bg.jpg';


let mainSection = {
    backgroundImage: `url(${BgImage})`
}

class LandingPageContainer extends Component {
    render() {
        return (
            

                <div style={mainSection} className="mainSection">
                    <section id="main">
                        <LandingPage/>
                    </section>
                </div>

             
           
        );
    }
}

export default LandingPageContainer;