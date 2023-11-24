import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Table} from 'react-bootstrap';
import {Container, makeStyles, Paper, Typography} from '@material-ui/core';
import Hero from "../../../../components/Hero/Hero";
import NavBar from "../../../../components/Navbar/NavScrollExample";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2),
    },
}));

const Main = () => {
    return (
        <Paper className="homepage-container">
            <Container>
                <Typography variant="h5" component="h3">
                    Welcome to DAX
                </Typography>
                <Typography component="p">
                    This is a simple example of a React-Bootstrap homepage with a trendy and high-tech crypto design.
                </Typography>
                <Button variant="contained" color="primary">
                    Learn more
                </Button>
            </Container>
        </Paper>
    );
};


const Home = () => {
    const classes = useStyles();
    const [cryptoDaxData, setCryptoDaxData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Clitecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false'
            );
            setCryptoDaxData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <NavBar/>
            <Hero/>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h2">
                    Crypto DAX
                </Typography>
                <Typography component="p">
                    Here's the current top 10 cryptocurrencies by market capitalization:
                </Typography>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Market Cap</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cryptoDaxData.map((coin, index) => (
                        <tr key={coin.id}>
                            <td>{index + 1}</td>
                            <td>{coin.name}</td>
                            <td>{coin.symbol}</td>
                            <td>{coin.market_cap}</td>
                            <td>{coin.current_price}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Paper>
        </Container>
    );
};

export default Home;
