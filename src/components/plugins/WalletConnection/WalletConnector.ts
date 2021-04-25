import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
export default class WalletConnector{
    private metamaskProvider: any
    private metamaskConnected: boolean;
    private walletConnectConnected: boolean;
    private tempWC: WalletConnectProvider;

    constructor(metaMaskProvider: any){
      this.metamaskProvider = metaMaskProvider;
      this.tempWC = new WalletConnectProvider({
        rpc: {
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
        //bridge: 'https://bridge.walletconnect.org',
        //qrcode: true,
      });

      // this.tempWC.on("open", () => {
      //   console.log("open");
      // });
      
      // // Subscribe to session disconnection/close
      // this.tempWC.on("close", (code: number, reason: string) => {
      //   console.log(code, reason);
      // });

      // this.tempWC.on("accountsChanged", (accounts: string[]) => {
      //   console.log(accounts);
      // });
      
      // // Subscribe to chainId change
      // this.tempWC.on("chainChanged", (chainId: number) => {
      //   console.log(chainId);
      // });
      
      // // Subscribe to session disconnection
      // this.tempWC.on("disconnect", (code: number, reason: string) => {
      //   console.log(code, reason);
      // });
      
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
    const isConnected = this.tempWC.connector.connected;
    if(isConnected)
      this.tempWC.enable();

    return isConnected;
  }

  ConnectMetaMask(){
    this.metamaskProvider
          .request({ method: 'eth_requestAccounts' });
  }

  ConnectWalletConnect(){
    this.tempWC.enable();
  }

  private GetProvider()
  {
    if(this.metamaskConnected)
      return new Web3(this.metamaskProvider);
    if(this.walletConnectConnected)
    {      
      return new Web3(this.tempWC as any);
    }
      
    return null;
  }

  async GetAccounts()
  {
    const web3 = this.GetProvider();
    if(web3 != null)
    {
      return await web3.eth.getAccounts();
    }    
  }

  async GetPresaleData(abi: any, id: any, address: string){
    const web3 = this.GetProvider();
    if(web3 != null)
    {
      const presaleContractInterface = new web3.eth.Contract(abi);
      presaleContractInterface.options.address = address;
      return await presaleContractInterface.methods.Presales(id).call();
    }
  }

  async GetTokenSymbol(abi: any, address: string){
    const web3 = this.GetProvider();
    
    if(web3 != null)
    {
      const tokenContractInterface = new web3.eth.Contract(abi);
      tokenContractInterface.options.address = address;
      return await tokenContractInterface.methods.symbol().call();
    }
  }

  async GetPresaleFinished(abi: any, address: string, id: any, account: any){
    const web3 = this.GetProvider();
    
    if(web3 != null)
    {
       const presaleContractInterface = new web3.eth.Contract(abi);
        presaleContractInterface.options.address = address;
      return await presaleContractInterface.methods.PresaleFinished(id).call({from: account});
    }
  }

  async GetPresaleStarted(abi: any, address: string, id: any, account: any){
    const web3 = this.GetProvider();
    
    if(web3 != null)
    {
       const presaleContractInterface = new web3.eth.Contract(abi);
        presaleContractInterface.options.address = address;
      return await presaleContractInterface.methods.PresaleStarted(id).call({from: account})
    }
  }

  async ClaimTokens(abi: any, id: any, address: string, account: any){
    const web3 = this.GetProvider();
    if(web3 != null)
    {
      try{
        const presaleContractInterface = new web3.eth.Contract(abi);
        presaleContractInterface.options.address = address;
        await presaleContractInterface.methods.ClaimTokens(id).send({from: account});
      }catch(e){
        console.log('error: ' + e)
      }
      
    }
  }

  async ContributeTokens(abi: any, id: any, address: string, account: any, value: any){
    const web3 = this.GetProvider();
    console.log('id in connector: ' + id);
    console.log('address in connector: ' + address);
    console.log('account in connector: ' + account);
    console.log('amount in connector: ' + value);
    if(web3 != null)
    {
      try{
        const presaleContractInterface = new web3.eth.Contract(abi);
        presaleContractInterface.options.address = address;
        await presaleContractInterface.methods.Contribute(id).send({from: account, value: web3.utils.toWei(value.toString())});
      }catch(e){
        console.log('error: ' + e)
      }
      
    }
  }
}

// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
// import Web3 from "web3";
// export default class WalletConnector{
//     private metamaskProvider: any
//     private connectorWalletConnect: WalletConnect;
//     private metamaskConnected: boolean;
//     private walletConnectConnected: boolean;

//     constructor(metaMaskProvider: any){
//       this.metamaskProvider = metaMaskProvider;
//       this.connectorWalletConnect = new WalletConnect({
//         bridge: "https://bridge.walletconnect.org", // Required
//         qrcodeModal: QRCodeModal,
//       });
      
//       this.metamaskConnected = false;
//       this.walletConnectConnected = false;
//     }

//   IsConnected() {
//     this.metamaskConnected = this.IsMetamaskConnected();
//     this.walletConnectConnected = this.IsWalletConnectConnected();
//     console.log('metamask connected: ' + this.metamaskConnected);
//     console.log('wc connected: ' + this.walletConnectConnected);
//     return this.metamaskConnected || this.walletConnectConnected;
//   }

//   IsMetamaskConnected(){
//     if (this.metamaskProvider === undefined) 
//       return false;

//     if (!this.metamaskProvider.isMetaMask)
//       return false;

//     if(!this.metamaskProvider.isConnected())
//       return false;
    
//     if(this.metamaskProvider._state.accounts.length == 0)
//       return false;
    
//     return true;
//   }

//   IsWalletConnectConnected(){
//     return this.connectorWalletConnect.connected;
//   }

//   ConnectMetaMask(){
//     this.metamaskProvider
//           .request({ method: 'eth_requestAccounts' });
//   }

//   ConnectWalletConnect(){
//     this.connectorWalletConnect.createSession();
//   }

//   async GetPresaleData(abi: any, id: any, address: string){
//     let web3 = null;
//     if(this.metamaskConnected)
//       web3 = new Web3(this.metamaskProvider);
//     if(this.walletConnectConnected)
//       web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
    
//     if(web3 != null)
//     {
//       const presaleContractInterface = new web3.eth.Contract(abi);
//       presaleContractInterface.options.address = address;
//       return await presaleContractInterface.methods.Presales(id).call();
//     }
//   }

//   async GetTokenSymbol(abi: any, address: string){
//     let web3 = null;
//     if(this.metamaskConnected)
//       web3 = new Web3(this.metamaskProvider);
//     if(this.walletConnectConnected)
//       web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
    
//     if(web3 != null)
//     {
//       const tokenContractInterface = new web3.eth.Contract(abi);
//       tokenContractInterface.options.address = address;
//       return await tokenContractInterface.methods.symbol().call();
//     }
//   }
// }