import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3";
export default class WalletConnector{
    private metamaskProvider: any
    private connectorWalletConnect: WalletConnect;
    private metamaskConnected: boolean;
    private walletConnectConnected: boolean;

    constructor(metaMaskProvider: any){
      this.metamaskProvider = metaMaskProvider;
      this.connectorWalletConnect = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
      });
      
      this.metamaskConnected = false;
      this.walletConnectConnected = false;
    }

  IsConnected() {
    this.metamaskConnected = this.IsMetamaskConnected();
    this.walletConnectConnected = this.IsWalletConnectConnected();
    console.log('metamask connected: ' + this.metamaskConnected);
    console.log('wc connected: ' + this.walletConnectConnected);
    return this.metamaskConnected || this.walletConnectConnected;
  }

  IsMetamaskConnected(){
    if (this.metamaskProvider === undefined) 
      return false;

    if (!this.metamaskProvider.isMetaMask)
      return false;

    if(!this.metamaskProvider.isConnected())
      return false;
    
    if(this.metamaskProvider._state.accounts.length == 0)
      return false;
    
    return true;
  }

  IsWalletConnectConnected(){
    return this.connectorWalletConnect.connected;
  }

  ConnectMetaMask(){
    this.metamaskProvider
          .request({ method: 'eth_requestAccounts' });
  }

  ConnectWalletConnect(){
    this.connectorWalletConnect.createSession();
  }

  async GetPresaleData(abi: any, id: any, address: string){
    let web3 = null;
    if(this.metamaskConnected)
      web3 = new Web3(this.metamaskProvider);
    if(this.walletConnectConnected)
      web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
    
    if(web3 != null)
    {
      const presaleContractInterface = new web3.eth.Contract(abi);
      presaleContractInterface.options.address = address;
      return await presaleContractInterface.methods.Presales(id).call();
    }
  }

  async GetTokenSymbol(abi: any, address: string){
    let web3 = null;
    if(this.metamaskConnected)
      web3 = new Web3(this.metamaskProvider);
    if(this.walletConnectConnected)
      web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
    
    if(web3 != null)
    {
      const tokenContractInterface = new web3.eth.Contract(abi);
      tokenContractInterface.options.address = address;
      return await tokenContractInterface.methods.symbol().call();
    }
  }
}