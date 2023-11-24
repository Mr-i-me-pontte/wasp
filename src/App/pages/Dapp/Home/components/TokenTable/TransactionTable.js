import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Image } from 'react-bootstrap';

const TOKEN_URL = 'https://tokens.coingecko.com/uniswap/all.json';

const fetchTokens = async () => {
    const response = await fetch(TOKEN_URL);
    const data = await response.json();
    return data.tokens;
};

const filterTokens = (tokens, searchTerm, searchBy) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    if (searchBy === 'name') {
        return tokens.filter(token => token.name.toLowerCase().includes(searchTermLowerCase));
    }
    return tokens.filter(token => token.symbol.toLowerCase().includes(searchTermLowerCase));
};

const TokenRow = ({ logoURI, name, symbol, decimals }) => (
    <tr key={symbol}>
        <td>
            <Image src={logoURI} alt={name} width="32" height="32" />
        </td>
        <td>{name}</td>
        <td>{symbol}</td>
        <td>{decimals}</td>
    </tr>
);

const TokenTable = () => {
    const [tokens, setTokens] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('name');

    useEffect(() => {
        async function fetchData() {
            const fetchedTokens = await fetchTokens();
            setTokens(fetchedTokens);
        }
        fetchData();
    }, []);

    const handleSearchTermChange = searchTerm => {
        setSearchTerm(searchTerm);
    };

    const handleSearchByChange = searchBy => {
        setSearchBy(searchBy);
    };

    const filteredTokens = filterTokens(tokens, searchTerm, searchBy);

    return (
        <div className="token-table">
            <Card>
                <Card.Header>
                    Token Table
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder="Search by name or symbol"
                            value={searchTerm}
                            onChange={e => handleSearchTermChange(e.target.value)}
                            className="ml-2"
                        />
                        <Form.Check
                            type="radio"
                            id="search-by-name"
                            label="Name"
                            value="name"
                            checked={searchBy === 'name'}
                            onChange={() => handleSearchByChange('name')}
                            className="ml-2"
                        />
                        <Form.Check
                            type="radio"
                            id="search-by-symbol"
                            label="Symbol"
                            value="symbol"
                            checked={searchBy === 'symbol'}
                            onChange={() => handleSearchByChange('symbol')}
                            className="ml-2"
                        />
                    </Form>
                </Card.Header>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Decimals</th>
                    </tr>
                    </thead>
                    <tbody>{filteredTokens.map(token => <TokenRow {...token} />)}</tbody>
                </Table>
            </Card>
        </div>
    );
};

export default TokenTable;
