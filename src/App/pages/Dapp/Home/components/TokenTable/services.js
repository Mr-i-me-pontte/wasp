// services/tokens.js

const TOKEN_URL = 'https://tokens.coingecko.com/uniswap/all.json';

export const fetchTokens = async () => {
    const response = await fetch(TOKEN_URL);
    const data = await response.json();
    return data.tokens;
};

export const filterTokens = (tokens, searchTerm, searchBy) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    if (searchBy === 'name') {
        return tokens.filter(token => token.name.toLowerCase().includes(searchTermLowerCase));
    }
    return tokens.filter(token => token.symbol.toLowerCase().includes(searchTermLowerCase));
};

