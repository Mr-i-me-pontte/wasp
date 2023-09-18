```
//State variables
const [walletAddress, setWallet] = useState("");
const [status, setStatus] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [url, setURL] = useState("");

```

Here's what each of the variables represent:

* `walletAddress` - a string that stores the user's wallet address
* `status`\- a string that contains a message to display at the bottom of the UI
* `name` - a string that stores the NFT's name
* `description` - a string that stores the NFT's description
* `url` - a string that is a link to the NFT's digital asset

After the state variables, you'll see three un-implemented functions: `useEffect`, `connectWalletPressed`,
and `onMintPressed`. You'll notice that all of these functions are `async`, that's because we will be making
asynchronous API calls in them! Their names describe their functionalities:

```
javascript
  useEffect(async () => { //TODO: implement

  }, []);

  const connectWalletPressed = async () => { //TODO: implement

  };

  const onMintPressed = async () => { //TODO: implement

  };

```

* `useEffect`\- this is a React hook that is called after your component is rendered. Because it has an empty array `[]`
  prop passed into it (see line 3), it will only be called on the component's _first_ render. Here we'll call our wallet
  listener and another wallet function to update our UI to reflect whether a wallet is already connected.
* `connectWalletPressed`\- this function will be called to connect the user's Metamask wallet to our dApp.
* `onMintPressed` - this function will be called to mint the user's NFT.

Near the end of this file, we have the UI of our component. If you scan this code carefully, you'll notice that we
update our `url`, `name`, and `description` state variables when the input in their corresponding text fields change.

You'll also see that `connectWalletPressed` and `onMintPressed`are called when the buttons with IDs `mintButton`
and `walletButton` are clicked respectively.

```
//The UI of our Minter Component
return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );

```

Finally, let's address where this Minter component is added.

If you go to the `App.js` file, which is the main component in React that acts as a container for all other components,
you'll see that the Minter component is injected on line 7.

**In this tutorial, we'll only be editing the `Minter.js file` and adding files in our `src` folder.**

Phew! Our fake money is all there! 🤑

Now that our Metamask wallet is set up, let's connect our dApp to it!

Because we want to prescribe to the M-V-C paradigm, we're going to create a separate file that contains our functions to
manage the logic, data, and rules of our dApp, and then pass those functions to our frontend (our Minter.js component).

To do so, let's create a new folder called `utils`in your `src` directory and add a file called `interact.js` inside it,
which will contain all of our wallet and smart contract interaction functions.

In our `interact.js`file, we will write a `connectWallet` function, which we will then import and call in
our `Minter.js` component.

In your `interact.js` file, add the following

```
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

```

Let's breakdown what this code does:

First, our function checks if it `window.ethereum` is enabled in your browser.

If `window.ethereum` _is not_ present, then that means Metamask is not installed. This results in a JSON object being
returned, where `address` returned is an empty string, and the `status` JSX object relays that the user must install
Metamask.

Now if `window.ethereum` _is_ present, then that's when things get interesting.

Using a try/catch loop, we'll try to connect to Metamask by
calling`window.ethereum.request({ method: "eth_requestAccounts" });` Calling this function will open up Metamask in the
browser, whereby the user will be prompted to connect their wallet to your dApp.

* If the user chooses to connect, `method: "eth_requestAccounts"` will return an array that contains all of the user's
  account addresses that are connected to the dApp. Altogether, our `connectWallet` function will return a JSON object
  that contains the _first_ `address` in this array (see line 9) and a `status` message that prompts the user to write a
  message to the smart contract.
* If the user rejects the connection, then the JSON object will contain an empty string for the `address` returned and
  a `status` message that reflects that the user rejected the connection.

Now that we've written this `connectWallet` function, let's connect it to our `Minter.js.` component.

First, we'll have to import our function into our `Minter.js` file by
adding `import { connectWallet } from "./utils/interact.js";` to the top of the `Minter.js` file. Your first 11 lines
of `Minter.js` should now look like this:

```
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

```

Then, inside our connectWalletPressed function, we'll call our imported connectWallet function, like so:

```
const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

```

In your `interact.js` file, add the following `getCurrentWalletConnected` function:

```
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

```

```
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected //import here
} from "./utils/interact.js";

```

Now, we simply call it in our useEffect function:

```
useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status); 
}, []);

```

In your `Minter.js` file, add a function `addWalletListener` that looks like the following:

```
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("👆🏽 Write a message in the text-field above.");
      } else {
        setWallet("");
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );
  }
}

```

Let's quickly break down what's happening here:

* First, our function checks if `window.ethereum` is enabled (i.e. Metamask is installed).
    * If it's not, we simply set our `status` state variable to a JSX string that prompts the user to install Metamask.
    * If it is enabled, we set up the listener `window.ethereum.on("accountsChanged")` on line 3 that listens for state
      changes in the Metamask wallet, which include when the user connects an additional account to the dApp, switches
      accounts, or disconnects an account. If there is at least one account connected, the `walletAddress` state
      variable is updated as the first account in the `accounts` array returned by the listener.
      Otherwise, `walletAddress` is set as an empty string.

Finally, we must call it in our `useEffect` function:

```
useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

    addWalletListener(); 
}, []);

```

Open up a new tab in your terminal (separate from the one running local host) and make sure you are in
the `minter-starter-files` folder, then run the following command in your terminal:

```
npm install dotenv --save

```

Next, create a `.env` file in the root directory of your `minter-starter-files` by entering the following on your
command line:

This will pop open your `.env` file in vim (a text editor). To save it hit "esc" + ":" + "q" on your keyboard in that
order.

```
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>

```

Save the file, and then you're ready to start writing the function to upload your JSON metadata to IPFS!

Fortunately for us, Pinata has an API specifically for uploading JSON data to IPFS and a convenient JavaScript with
axios example that we can use, with some slight modifications.

In your `utils` folder, let's create another file called `pinata.js` and then import our Pinata secret and key from the
.env file like so:

```
require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

```

Next, paste the additional code from below into your `pinata.js` file. Don't worry, we'll break down what everything
means!

```
require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

```

So what does this code do exactly?

First, it imports axios, a promise based HTTP client for the browser and node.js, which we will use to make a request to
Pinata.

Then we have our asynchronous function `pinJSONToIPFS`, which takes a `JSONBody` as its input and the Pinata api key and
secret in its header, all to make a POST request to their`pinJSONToIPFS` API.

* If this POST request is successful, then our function returns a JSON object with the `success` boolean as true and
  the `pinataUrl` where our metadata was pinned. We will use this `pinataUrl` returned as the `tokenURI` input to our
  smart contract's mint function.
* If this post request fails, then our function returns a JSON object with the `success` boolean as false and
  a `message` string that relays our error.

As with our `connectWallet`function return types, we're returning JSON objects so we can use their parameters to update
our state variables and UI.

Now that we have a way to upload our NFT metadata to IPFS via our `pinJSONToIPFS` function, we're going to need a way to
load an instance of our smart contract so we can call its `mintNFT` function.

Navigate to the “Create App” page in your Alchemy Dashboard by hovering over “Apps” in the nav bar and clicking “Create
App”

!2880

Create a new app

Name your app (we chose "My First NFT!"), offer a short description, and choose “Goerli” for your network.

!2525

Configure your app details

Click “Create app” and that’s it! Your app should appear in the table below.

Awesome so now that we've created our HTTP Alchemy API URL, copy it to your clipboard like so…

!843

Copy your Alchemy API key

…and then let's add it to our `.env` file. Altogether, your .env file should look like this:

```
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-goerli.g.alchemy.com/v2/<alchemy-key>

```

Now that we have our contract ABI and our Alchemy API key, we're ready to load our smart contract using Alchemy Web3.

First, if you don't have it already, you'll need to install Alchemy Web3 by navigating to the home
directory: `nft-minter-tutorial`in the terminal:

```
npm install @alch/alchemy-web3

```

Next let's go back to our `interact.js`file. At the top of the file, add the following code to import your Alchemy key
from your .env file and set up your Alchemy Web3 endpoint:

```
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

```

> ### 📘
>
> Alchemy Web3 is a wrapper around Web3.js, providing enhanced API methods and other crucial benefits to make your life
> as a web3 developer easier. It is designed to require minimal configuration so you can start using it in your app
> right
> away!

Next, let's add our contract ABI and contract address to our `interact.js` file.

```
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

const contractABI = require('../contract-abi.json')
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

```

Once we have both of those, we're ready to start coding our mint function!

Inside your `interact.js` file, let's define our function, `mintNFT` , which will mint our NFT as the name implies.

Because we will be making numerous asynchronous calls (to Pinata to pin our metadata to IPFS, Alchemy Web3 to load our
smart contract, and Metamask to sign our transactions), our function will also be asynchronous.

The three inputs to our function will be the `url` of our digital asset, `name`, and `description`. Add the following
function signature below the `connectWallet` function:

```
export const mintNFT = async (url, name, description) => {
}

```

Naturally, it makes sense to have some sort of input error handling at the start of the function, so we exit this
function if our input parameters aren't correct. Inside our function, let's add the following code:

```
export const mintNFT = async(url, name, description) => {
 //error handling
 if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
   return {
    success: false,
    status: "❗Please make sure all fields are completed before minting.",
   }
  }
}

```

Essentially, if any of the input parameters are an empty string, then we return a JSON object where the `success`
boolean is false, and the `status` string relays that all fields in our UI must be complete.

Once we know our metadata is formatted properly, the next step is to wrap it into a JSON object and upload it to IPFS
via the `pinJSONToIPFS` we wrote!

To do so, we firstly need to import the `pinJSONToIPFS` function into our `interact.js` file. At the very top of
the `interact.js`, let's add:

```
import {pinJSONToIPFS} from './pinata.js'

```

Recall that `pinJSONToIPFS` takes in a JSON body. So before we make a call to it, we're going to need to format
our `url`, `name`, and `description` parameters into a JSON object.

Let's update our code in `interact.js` to create a JSON object called `metadata` and then make a call to `pinJSONToIPFS`
with this `metadata` parameter:

```
export const mintNFT = async(url, name, description) => {
 //error handling
 if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
  }

  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
      return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
      }
  } 
  const tokenURI = pinataResponse.pinataUrl;  
}

```

Notice, we store the response of our call to `pinJSONToIPFS(metadata)` in the `pinataResponse` object. Then, we parse
this object for any errors.

If there's an error, we return a JSON object where the `success` boolean is false and our `status` string relays that
our call failed. Otherwise, we extract the `pinataURL` from the `pinataResponse` and store it as our `tokenURI`variable.

Now it's time to load our smart contract using the Alchemy Web3 API that we initialized at the top of our file. Add the
following line of code to the bottom of the `mintNFT` function to set the contract at the `window.contract` global
variable:

```
window.contract = await new web3.eth.Contract(contractABI, contractAddress);

```

The last thing to add in our `mintNFT` function is our Ethereum transaction:

```
export const mintNFT = async(url, name, description) => {
 //error handling
 if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
  }

  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
      return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
      }
  } 
  const tokenURI = pinataResponse.pinataUrl;  
}

```

If you're already familiar with Ethereum transactions, you'll notice that the structure is pretty similar to what you've
seen.

* First, we set up our transactions parameters.
    * `to` specifies the recipient address (our smart contract)
    * `from` specifies the signer of the transaction (the user's connected address to
      Metamask: `window.ethereum.selectedAddress`)
    * `data` contains the call to our smart contract `mintNFT` method, which receives our `tokenURI` and the user's
      wallet address, `window.ethereum.selectedAddress`, as inputs
* Then, we make an await call, `window.ethereum.request,` where we ask Metamask to sign the transaction. Notice, in this
  request, we're specifying our eth method (eth\_SentTransaction) and passing in our `transactionParameters`. At this
  point, Metamask will open up in the browser, and prompt the user to sign or reject the transaction.
    * If the transaction is successful, the function will return a JSON object where the boolean `success` is set to
      true and the `status` string prompts the user to check out Etherscan for more information about their transaction.
    * If the transaction fails, the function will return a JSON object where the `success` boolean is set to false, and
      the `status` string relays the error message.

Altogether, our `mintNFT` function should look like this:

```
export const mintNFT = async(url, name, description) => {

    //error handling
    if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }

    //make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;  

    //load smart contract
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

    //set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
    };

    //sign transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
}

```

That's a giant function! Now, we just need to connect our `mintNFT` function to our `Minter.js` component...

Open up your `Minter.js` file and update
the `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` line at the top to be:

```
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";

```

Finally, implement the `onMintPressed` function to make await call to your imported `mintNFT`function and update
the `status` state variable to reflect whether our transaction succeeded or failed:

```
const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
};

```

