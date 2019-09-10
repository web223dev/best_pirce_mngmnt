import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import './Modal.css';
//import logoImage from 'components/common/img/seifs.png';
import logo from 'components/common/img/logo.png';
//import bodyimg from 'components/common/img/modalbodyimg.png';
//<img className="img-responsive" src={bodyimg} alt="Header Jumbo" />

class PreviewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { users, checkedPrices, isOpen, toggle } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                toggle={toggle}
            >
                <ModalHeader className="d-flex justify-content-center">
                    
                   
                </ModalHeader>
               
                <ModalBody className="text-center">
                    
                    {
                        users && users.length > 0 && (
                            users.map((user, index) => (
                                <div key={index}>
                                <div className="row">
                                        <div className="col-md text-left">
                                        <img className="img-responsive" src={logo} alt="Logo" />
                                    </div>

                                    <div className="col-md">
                                            <div className="card">
                                                <div className="card-body text-right">
                                                    <h5 className="card-title">{user.dbcFirstName} {user.dbcLastName}</h5>
                                                    <p className="card-text text-secondary"> {user.phoneNumber}</p>
                                                    <p className="card-text text-secondary"> {user.dbcEmail}</p>
                                                  
                                                </div>
                                            </div>
                                    </div>                                      
                                    </div>
                                    <hr className="mb-4" />
                                   
                                   
                                <div className="row">
                                    <div className="col-sm-12 linewidth">
                                        <h5 className="text-center" key={index} >
                                           <strong> Price Notification For</strong>&nbsp;
                                        {user.orgParentName}
                                        </h5>
                                       
                                    </div>
                                    
                                    
                                </div>
                            </div>   
                            ))
                        )
                    }

                    

                    <hr className="mb-4" />
                    <table className="w-100">
                        <thead>
                            <tr className="text-primary">
                                <th>FUEL</th>
                                <th>TERMINAL</th>
                                <th>TOTAL PRICE</th>
                                <th>PRICING EFFECTIVE DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                checkedPrices && checkedPrices.length ? (
                                    checkedPrices.map((price, key) => (
                                        <tr key={key}>
                                            
                                            <td>
                                                {price.prodCode}
                                            </td>
                                            <td>{price.terminalName}</td>
                                            
                                            <td>
                                                {
                                                    `$${price.totalPrice}`
                                                 
                                                }
                                            </td>

                                            <td>
                                                {price.effectiveDatetime}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan={4} />
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>

                    <hr className="mb-4" />

                    <a href="mailto:sample@7-11.com" className="btn btn-success">REPLY</a>
                    
                    <hr className="mb-4" />

                    <div className="">
                        
                        <p>Customers are charged based on pricing and applicable taxes and fees as of the time of loading at the terminal.</p>
                    </div>
                    <hr className="mb-4" />
                    <p className="">The information contained in this notification is confidential and may be legally privileged. It is intended solely for the customers and potential customers of SEI Fuels. If you are not the intended recipient, please immediately discard this notification. Any distribution, forwarding, copying or unauthorized disclosure of this notification is strictly prohibited. All rights are reserved. If you no longer want to receive similar notifications, please click here to unsubscribe. </p>
                    <p className="">This Price Notification is for convenience only and is not sufficient to warrant a legally binding offer from SEI Fuels or its affiliates. The prices stated do not include taxes or freight charges unless otherwise specifically stated. All prices and their effective period are subject to change without notice. SEI Fuels makes no express, implied or statutory warranty as to the accuracy, adequacy, completeness, legality or reliability of the information provided. Please contact SEI Fuels for pricing details that will be applicable to your specific order. </p>
                    <small>7-Eleven | 1-800-255-0711 | P.O. Box 711, Dallas, TX 75221-0711 </small>
                    <p>Unsubscribe</p>
                </ModalBody>
            </Modal>
        );
    }
}

PreviewModal.defaultProps = {
    users: [],
    checkedPrices: [],
    isOpen: false,
    toggle: () => {}
};

export default PreviewModal;