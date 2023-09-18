import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { getShortenedAddress } from './helpers';
import withMetaMask from './withMetaMask';

const Avatar = ({ currentAccount }) => {
    const address = getShortenedAddress(currentAccount);
    const avatarUrl = `https://avatars.dicebear.com/api/avataaars/${address}.svg`;
    return <img src={avatarUrl} alt="avatar" width="30" height="30" />;
};

const DropdownButton = () => {
    return (
        <Button variant="primary" className="ml-2 p-1 rounded-circle">
            <FontAwesomeIcon icon={faAngleDown} />
        </Button>
    );
};

const MetaMaskConnect = ({ currentAccount, isMetaMaskConnected, connectToMetaMask }) => {
    const renderMetaMaskConnect = () => {
        return (
            <Button variant="primary" onClick={connectToMetaMask}>
                Connect to MetaMask
            </Button>
        );
    };

    const renderMetaMaskConnected = () => {
        return isMetaMaskConnected && currentAccount ? (
            <div className="d-flex align-items-center">
                <Avatar currentAccount={currentAccount} />
                <DropdownButton />
            </div>
        ) : (
            renderMetaMaskConnect()
        );
    };

    return <div>{renderMetaMaskConnected()}</div>;
};

export default withMetaMask(MetaMaskConnect);
