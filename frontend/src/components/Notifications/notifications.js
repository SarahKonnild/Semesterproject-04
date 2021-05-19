import React, { useState, useEffect, useCallback } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import NotificationIcon from '@material-ui/icons/Notifications';

function Modals() {
    const [show, setShow] = useState(false);
    const [log, setLog] = useState([]) || [];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const FetchLogs = () => {
        setLog(JSON.parse(localStorage.getItem('Error')));
    };

    const DeleteLogs = () => {
        localStorage.removeItem('Error');
        setLog([]);
    };

    const activeContent = () => {
        return log.map(logs => {
            return <div className='list'>{logs}</div>;
        });
    };

    const inactiveContent = () => {
        return <p>No Logs</p>;
    };

    useEffect(() => {
        FetchLogs();
    }, []);

    return (
        <>
            <div className='alert-button'>
                <Button
                    value='notification'
                    aria-label='Notification Menu'
                    className='notification'
                >
                    <NotificationIcon
                        className='notification-icon'
                        onClick={e => {
                            handleShow();
                            FetchLogs();
                        }}
                    />
                    <p className='icon-text'>Alerts</p>
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert Logs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{log ? activeContent() : inactiveContent()}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={DeleteLogs}>Clear Logs</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modals;
