export const initialState = {
    accounts: [],
    isMetamaskConnected: false,
    networkId: null,
    chainId: null,
    activeWallet: {
        address: null,
        balance: null,
        transactionCount: null,
        transactions: [],
        avatar: null,
    }
};

export const metamaskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ACCOUNTS':
            return { ...state, accounts: action.payload };
        case 'SET_METAMASK_CONNECTED':
            return { ...state, isMetamaskConnected: action.payload };
        case 'SET_NETWORK_ID':
            return { ...state, networkId: action.payload };
        case 'SET_CHAIN_ID':
            return { ...state, chainId: action.payload };
        case 'SET_WALLET_BALANCE':
            return { ...state, activeWallet: { ...state.activeWallet, balance: action.payload } };
        case 'SET_WALLET_TRANSACTION_COUNT':
            return { ...state, activeWallet: { ...state.activeWallet, transactionCount: action.payload } };
        case 'ADD_WALLET_TRANSACTION':
            return {
                ...state,
                activeWallet: {
                    ...state.activeWallet,
                    transactions: [action.payload, ...state.activeWallet.transactions]
                }
            };
        case 'SET_ACTIVE_WALLET':
            return { ...state, activeWallet: { ...state.activeWallet, address: action.payload } };
        case 'SET_WALLET_AVATAR':
            return { ...state, activeWallet: { ...state.activeWallet, avatar: action.payload } };
        default:
            return state;
    }
};
