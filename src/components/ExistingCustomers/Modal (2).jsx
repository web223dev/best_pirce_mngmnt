import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import './Modal.css';
import logoImage from 'components/common/img/seifs.png';

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
                    Preview Email
                </ModalHeader>
                <ModalBody className="text-center">
                    {
                        users && users.length > 0 && (
                            users.map((user, index) => (
                                <h5 className="text-center" key={index} style={{ marginBottom: 30 }}>
                                    Price Notification for&nbsp;
                                    {user.orgParentName}
                                </h5>
                            ))
                        )
                    }
                    {
                        <h5 className="text-center text-danger mb-4">
                            Prices Are Effective at:&nbsp;
                            {
                                checkedPrices && checkedPrices.length && checkedPrices[0].effectiveDatetime
                            }
                        </h5>
                    }
                    {
                        <div className="text-center mb-4">
                            <img src={logoImage} alt="Email Popup" />
                        </div>
                    }
                    <hr className="mb-4" />
                    <p className="mb-1">Please contact <b>Sales</b> at <strong>866-988-9777</strong></p>
                    <p className="mb-4">to place order and for price quote verification at your location.</p>
                    <p className="mb-1">This price notification is presented for convenience purposes.</p>
                    <p className="mb-4">Prices are effective until 17:59 of the next business day from the effective date or until otherwise notified.</p>
                    <hr className="mb-4" />
                        <table className="w-100">
                            <thead>
                                <tr className="text-danger">
                                    <th>Terminal</th>
                                    <th>Fuel</th>
                                    <th>Market</th>
                                    <th>With Tax & Freight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkedPrices && checkedPrices.length ? (
                                        checkedPrices.map((price, key) => (
                                            <tr key={key}>
                                                <td>{price.terminalId}</td>
                                                <td>
                                                    {price.suplierId}
                                                </td>
                                                <td>
                                                    {price.markup}
                                                </td>
                                                <td>
                                                    {
                                                        price.taxes + price.freight
                                                    }
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
                    <p>Quoted prices include applicable Federal and State excise taxes, and Freight, but exclude all other delivery charges (i.e Texas load fee, Lust, Fed Oil Spill Liab, pump off, extra demurrage, stop offs, tolls, surcharges, etc.)</p>
                    <hr className="mb-4" />
                    <p className="mb-1">Quoted prices are subject to change due to current market fluctuations,</p>
                    <p className="mb-5">
                        fluent adjustments by refiners, and unpredictable terminal outages.
                    </p>
                    <p className="text-muted mb-4">Privacy and Confidentiality Notice:</p>
                    <p className="text-muted mb-1">The information contained on this notification is confidential and may be legally privileged.</p>
                    <p className="text-muted mb-1">It is intended solely for the use of customers prospective customers of 7-Eleven Inc.</p>
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