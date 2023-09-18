import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartBar, faUsers, faWallet} from '@fortawesome/free-solid-svg-icons';
import {Card, Container, Row} from "react-bootstrap";
import MetamaskCard from "../../../../components/Web3/MetaMask/MetamaskCard";

const Wallet = (props) => (
    <CardSection/>
);


const data = [
    {
        title: "Today's Revenue",
        amount: "$8,093.00",
        icon: faChartBar,
    },
    {
        title: 'Human Resources',
        amount: '$25,426.70',
        icon: faUsers,
    },
    {
        title: 'Wallet',
        amount: '$2,400.10',
        icon: faWallet,
    },
];

const CardSection = () => {
    return (
        <Container className="my-3 py-3">
            <Row className=" mt-6 mb-6">
                {data.map((item, index) => (
                    <div className="col-lg-3 col-sm-6" key={index}>
                        <Card className="card blur border border-white mb-4 shadow-xs">
                            <Card.Body className="card-body p-4">
                                <div
                                    className="icon icon-shape bg-white shadow shadow-xs text-center border-radius-md d-flex align-items-center justify-content-center mb-3">
                                    <FontAwesomeIcon icon={item.icon}/>
                                </div>
                                <p className="text-sm mb-1">{item.title}</p>
                                <h3 className="mb-0 font-weight-bold">{item.amount}</h3>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Row>
            <Row>
                <MetamaskCard/>
            </Row>
        </Container>
    );
};

export default Wallet;


// https://6a2sb4jl4b.execute-api.us-east-1.amazonaws.com/staging/create
