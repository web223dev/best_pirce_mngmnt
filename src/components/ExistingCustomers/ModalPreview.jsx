import React, { Component } from 'react';
import './modalPreview.css';

class ModalPreview extends Component {
    render() {
        var modal = [];
        modal.push(
            <div className="modal" style={this.state.toggle ? display : hide}>
                <div className="modal-content">
                    <h4>Sample Email</h4>
                    <img src={emailpopup} alt="Email Popup" width="100%" />
                </div>
                <div className="modal-footer">
                    <a className="btn-flat" onClick={this.toggle}></a>
                </div>
            </div>
        );
        return (
            <div>
                <a className="btn btn-secondary btn-save text-light" onClick={this.toggle}>{this.state.toggle ? 'Close' : 'Preview'}</a>
                {modal}

            </div>
        );
    }
}

export default ModalPreview;