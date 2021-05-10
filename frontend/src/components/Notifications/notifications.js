import React, { Component } from 'react';

import './notifications.css';

function removeItem() {
    localStorage.removeItem('Error');
}

class Dialog extends Component {
    render() {
        let dialog = (
            <div className='dialogStyles'>
                <button
                    className='dialogCloseButtonStyles'
                    onClick={removeItem}
                >
                    Clear Logs
                </button>
                <button
                    className='dialogCloseButtonStyles'
                    onClick={this.props.onClose}
                >
                    x
                </button>

                <div>{this.props.children}</div>
            </div>
        );

        if (!this.props.isOpen) {
            dialog = null;
        }
        return <div>{dialog}</div>;
    }
}

export default Dialog;
