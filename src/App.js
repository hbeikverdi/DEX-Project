import { useState } from "react";
import Web3 from "web3";
import ETHlogo from './Ethereum_logo.png';
import USDTlogo from './tether_logo.png';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import ETHprice from "./components/ETHprice";
import Swapbox from "./components/Swapbox";
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );

      setBalance(Number(accBalanceEth).toFixed(6));
      setIsConnected(true);
    }
  };

  const onLogout = () => {
    setIsConnected(false);
  };

  return (
    <div className="App">
      <header className="App-header">
      {!isConnected && <Navbar onLogin={onLogin} onLogout={onLogout} />}
      {isConnected && (
          <Home currentAccount={currentAccount} balance={balance} />
        )}
        <ETHprice/>
        <div className="container">
          <div className="row">
              <div className="col col-md-6 offset-md-3" id="window">
                  <h4>Swap</h4>
                  <form id="form">
                    <Swapbox coin='ETH' imgPath={ETHlogo}/>
                    <Swapbox coin='IRT' imgPath={USDTlogo} />
                      <div>Estimated : <span id="gas_estimate"></span></div>
                      <button className="btn btn-large btn-primary btn-block" id="swap_button" >
                          Swap
                      </button>
                  </form>
              </div>
          </div>
          <div className="modal" id="token_modal" tabindex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Select token</h5>
                  <button id="modal_close" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div id="token_list"></div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </header>
    </div>
  );
}

export default App;
