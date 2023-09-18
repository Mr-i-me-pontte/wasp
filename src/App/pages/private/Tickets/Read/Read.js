import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {HighlightedNFT} from "../../../../../ui-components";

export default function HeroSection2(props) {
    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center bg-dark py-5"
        >
            <Container className="px-md-5">
                <Row>
                    <Col md={7} className="d-flex flex-column">
                        <div className="mb-4">
                            <h1 className="text-white">
                                Discover digital art & Collect NFTs
                            </h1>
                            <p className="text-white">
                                NFT marketplace UI created with Anima for Figma. Collect, buy
                                and sell art from more than 20k NFT artists.
                            </p>
                        </div>
                        <div className="mb-4">
                            <Button variant="primary">Button</Button>
                        </div>
                        <Row>
                            <Col>
                                <div className="d-flex flex-column text-center mb-3">
                                    <h2 className="text-white">240k+</h2>
                                    <p className="text-white">Total Sale</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column text-center mb-3">
                                    <h2 className="text-white">100k+</h2>
                                    <p className="text-white">Auctions</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column text-center mb-3">
                                    <h2 className="text-white">240k+</h2>
                                    <p className="text-white">Artists</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={5} className="d-flex justify-content-center">
                        <HighlightedNFT />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
