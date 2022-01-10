import { useState } from "react";

const Navbar = (props) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const detectProvider = () => {
        let provider;
        if (window.ethereum) {
        provider = window.ethereum;
        } else if (window.web3) {
        provider = window.web3.currentProvider;
        } else {
        window.alert("No Ethereum browser detected! Check out MetaMask");
        }
        return provider;
    };

    const onLoginHandler = async () => {
        const provider = detectProvider();
        if (provider) {
        if (provider !== window.ethereum) {
            console.error(
            "Not window.ethereum provider. Do you have multiple wallet installed ?"
            );
        }
        setIsConnecting(true);
        await provider.request({
            method: "eth_requestAccounts",
        });
        setIsConnecting(false);
        }
        props.onLogin(provider);
    };


    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">DEX</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
            <button onClick={onLoginHandler} id="login_button" class="btn btn-outline-primary my-2 my-sm-0" type="submit">
                {!isConnecting && "Connect to Metamask"}
                {isConnecting && "Loading..."}
            </button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;