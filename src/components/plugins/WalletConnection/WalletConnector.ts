import WalletConnect from "@walletconnect/client";
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3";
export default class WalletConnector{
    private connectorWalletConnect: WalletConnect;
    //private connectorProviderWalletConnect: WalletConnectProvider;
    private metamaskConnected: boolean;
    private walletConnectConnected: boolean;

    constructor(){
      this.connectorWalletConnect = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
      });
      this.connectorProviderWalletConnect = new WalletConnectProvider({
        rpc: {
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
      });
      this.metamaskConnected = false;
      this.walletConnectConnected = false;
    }

  IsConnected() {
    this.metamaskConnected = this.IsMetamaskConnected();
    this.walletConnectConnected = this.IsWalletConnectConnected();
    return this.metamaskConnected || this.walletConnectConnected;
  }

  IsMetamaskConnected(){
    if (window.ethereum === undefined) 
      return false;

    if (!window.ethereum.isMetaMask)
      return false;

    if(!window.ethereum.isConnected())
      return false;
    
    if(window.ethereum._state.accounts.length == 0)
      return false;

    return true;
  }

  IsWalletConnectConnected(){
    return this.connectorWalletConnect.connected;
  }

  ConnectMetaMask(){
    window.ethereum
          .request({ method: 'eth_requestAccounts' });
  }

  ConnectWalletConnect(){
    this.connectorWalletConnect.createSession();
  }

  async MetamaskCall(abi, id, address){
    console.log('Metamask call');
    console.log('abi:' + abi);
    console.log('id:' + id);
    console.log('address:' + address);
    const web3 = new Web3(window.ethereum);
    const presaleContractInterface = new web3.eth.Contract(abi);
    presaleContractInterface.options.address = address;
    return await presaleContractInterface.methods.Presales(id).call();
  }  

  async WalletConnectCall(abi, id, address){
    console.log('WalletConnect call');
    console.log('abi:' + abi);
    console.log('id:' + id);
    console.log('address:' + address);
    const web3 = new Web3(this.connectorProviderWalletConnect);
    var resultS = await web3.eth.net.getId();
    console.log(resultS);
    // const presaleContractInterface = new web3.eth.Contract(abi);
    // presaleContractInterface.options.address = address;
    // return await presaleContractInterface.methods.Presales(id).call();
  }

}


// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3 from "web3";
// export default class WalletConnector{
//     private connectorProviderWalletConnect: WalletConnectProvider;
//     private metamaskConnected: boolean;
//     private walletConnectConnected: boolean;

//     constructor(){
//       this.connectorProviderWalletConnect = new WalletConnectProvider({
//         rpc: {
//           97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
//         },
//       })
//       this.metamaskConnected = false;
//       this.walletConnectConnected = false;
//     }

//   IsConnected() {
//     this.metamaskConnected = this.IsMetamaskConnected();
//     this.walletConnectConnected = this.IsWalletConnectConnected();
//     return this.metamaskConnected || this.walletConnectConnected;
//   }

//   IsMetamaskConnected(){
//     if (window.ethereum === undefined) 
//       return false;

//     if (!window.ethereum.isMetaMask)
//       return false;

//     if(!window.ethereum.isConnected())
//       return false;
    
//     if(window.ethereum._state.accounts.length == 0)
//       return false;

//     return true;
//   }

//   IsWalletConnectConnected(){
//     return this.connectorProviderWalletConnect.connected;
//   }

//   ConnectMetaMask(){
//     window.ethereum
//           .request({ method: 'eth_requestAccounts' });
//   }

//   ConnectWalletConnect(){
//     this.connectorProviderWalletConnect.enable();
//   }

//   async MetamaskCall(abi, id, address){
//     console.log('Metamask call');
//     console.log('abi:' + abi);
//     console.log('id:' + id);
//     console.log('address:' + address);
//     const web3 = new Web3(window.ethereum);
//     const presaleContractInterface = new web3.eth.Contract(abi);
//     presaleContractInterface.options.address = address;
//     return await presaleContractInterface.methods.Presales(id).call();
//   }  

//   async WalletConnectCall(abi, id, address){
//     console.log('WalletConnect call');
//     console.log('abi:' + abi);
//     console.log('id:' + id);
//     console.log('address:' + address);    
//     const web3 = new Web3(this.connectorProviderWalletConnect);
//     const presaleContractInterface = new web3.eth.Contract(abi);
//     presaleContractInterface.options.address = address;
//     return await presaleContractInterface.methods.Presales(id).call();
//   }

// }