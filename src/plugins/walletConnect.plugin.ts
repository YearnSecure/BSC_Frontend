import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

export default class WalletConnector {
    private metamaskProvider: any;
    private metamaskConnected: boolean;
    private walletConnectConnected: boolean;
    private readonly tempWC: WalletConnectProvider;

    private chainId: any;

    constructor(metaMaskProvider: any) {
        this.metamaskProvider = metaMaskProvider;
        this.tempWC = new WalletConnectProvider({
            rpc: {
                56: "https://bsc-dataseed.binance.org/",
                97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            },
        });

        this.chainId = process.env.VUE_APP_NETWORK_ID;
        this.metamaskConnected = false;
        this.walletConnectConnected = false;
    }
      // Returns bool of the connection MetaMask or WalletConnect
    IsConnected() {
        this.metamaskConnected = this.IsMetamaskConnected();
        this.walletConnectConnected = this.IsWalletConnectConnected();
        return this.metamaskConnected || this.walletConnectConnected;
    }
    // Check if MetaMask is connected
    IsMetamaskConnected() {
        if (this.metamaskProvider === undefined)
            return false;

        if (!this.metamaskProvider.isMetaMask)
            return false;

        if(!this.metamaskProvider.isConnected())
            return false;

        return this.metamaskProvider._state.accounts.length != 0;
    }
    // Check if WalletConnect is connected
    IsWalletConnectConnected() {
        const isConnected = this.tempWC.connector.connected;
        if(isConnected)
            this.tempWC.enable()
                .then(() => {
                    return isConnected;
                });

        return isConnected;
    }
    // Connect with MetaMask wallet
    ConnectMetaMask() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.metamaskProvider = window.ethereum;
        return this.metamaskProvider
            .request({ method: 'eth_requestAccounts' });
    }
    // Connect with WalletConnect
    ConnectWalletConnect() {
        return this.tempWC.enable();
    }
    // Check which provider is connected
    GetProvider() {
        if (this.metamaskConnected) {
            return new Web3(this.metamaskProvider);
        } else if (this.walletConnectConnected) {
            if (this.tempWC.wc.peerMeta && this.tempWC.wc.peerMeta.url === "https://trustwallet.com") {
                this.tempWC.infuraId = "";
                this.tempWC.rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
                if (this.tempWC.http)
                    this.tempWC.http.url = "https://data-seed-prebsc-1-s1.binance.org:8545/";
                this.tempWC.rpc = {
                    56: "https://bsc-dataseed.binance.org/",
                    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
                }
            }

            return new Web3(this.tempWC as any);
        }

        return new Web3(new Web3.providers.HttpProvider(`${process.env.VUE_APP_RPC}`));
    }
    // Returns the connected accounts
    async GetAccounts() {
        const web3 = this.GetProvider();
        if (web3 !== null)
        {
            if (this.walletConnectConnected){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-ts-ignore
                // @ts-ignore
                return web3.currentProvider.accounts;
            } else if(this.metamaskConnected) {
                return await web3.eth.getAccounts();
            }
        }
    }
    // Returns the connected chainId
    async GetChainId() {
        const web3 = this.GetProvider();
        if (web3 !== null)
        {
            if (this.walletConnectConnected) {
                let currentId = "";

                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                if (web3.currentProvider.wc && web3.currentProvider.wc.peerMeta && web3.currentProvider.wc.peerMeta.url === "https://trustwallet.com") {
                    currentId = '0x38';
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    currentId = web3.currentProvider.chainId;
                }

                console.log(web3.currentProvider);
                console.log(`DEV walletConnect: ${currentId}`);
                if (String(currentId).substr(0,2) != '0x') {
                    console.log(`Substring function: 0x${String(currentId).substr(0,2)}`);
                    return '0x'+String(currentId).substr(0,2);
                } else {
                    console.log(`Direct return: ${currentId}`);
                    return currentId;
                }
            } else if (this.metamaskConnected) {
                console.log(`DEV MetaMask: ${this.metamaskProvider.chainId}`);
                return this.metamaskProvider.chainId;
            }
        }
    }
    // Disconnect the connected wallet
    Disconnect() {
        if (this.walletConnectConnected)
            return this.tempWC.disconnect();
        else if (this.metamaskConnected) {
            this.metamaskProvider._state.isConnected = false;
            this.metamaskConnected = false;
        }

        this.metamaskConnected = this.IsMetamaskConnected();
        this.walletConnectConnected = this.IsWalletConnectConnected();

        return null;
    }

    // Contract Calls
    async getPresaleData(id: number, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.Presales(id).call();
        }
    }

    async getTokenAllocations(id: number, address: string, abi: any,) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.GetTokenAllocations(id).call();
        }
    }

    async getContributedBNB(id: number, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 != null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.GetBNBContributedForAddress(id, account).call();
        }
    }

    async getTokenTicker(tokenAddress: string, tokenAbi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const tokenContractInterface = new web3.eth.Contract(tokenAbi);
            tokenContractInterface.options.address = tokenAddress;
            return await tokenContractInterface.methods.symbol().call();
        }
    }

    async getRoi(id: number, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.GetAmountOfTokensForAddress(id, account).call();
        }
    }

    async getAllowance(account: string, address: string, tokenAddress: string, tokenAbi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const tokenContractInterface = new web3.eth.Contract(tokenAbi);
            tokenContractInterface.options.address = tokenAddress;
            return await tokenContractInterface.methods.allowance(account, address).call();
        }
    }

    async approveCall(account: string, address: string, totalTokens: any, tokenAddress: string, tokenAbi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const tokenContractInterface = new web3.eth.Contract(tokenAbi);
            tokenContractInterface.options.address = tokenAddress;
            return await tokenContractInterface.methods.approve(address, totalTokens).send({from: account});
        }
    }

    async transferTokens(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 != null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.TransferTokens(id).send({from: account});
        }
    }

    async presaleFinished(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.PresaleFinished(id).call({from: account});
        }
    }

    async getPresaleStarted(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.PresaleStarted(id).call({from: account});
        }
    }

    async addLiquidity(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.AddLiquidity(id).send({from: account});
        }
    }

    async claimTokensAccount(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.ClaimTokens(id).send({from: account});
        }
    }

    async distribute(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.DistributeBNB(id).send({from: account});
        }
    }

    async retrieve(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.RetrieveBNB(id, account).send({from: account});
        }
    }

    async retrieveTokensOwner(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.RetrieveTokens(id).send({from: account});
        }
    }

    async transferTokensToLocks(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.TransferTokensToLocks(id).send({from: account});
        }
    }

    async getSoftcapMet(id: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.SoftcapMet(id).call({from: account});
        }
    }

    async contributeTokens(id: any, account: string, amountOfTokens: any, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            return await presaleContractInterface.methods.Contribute(id)
                .send({from: account, value: web3.utils.toWei(amountOfTokens.toString())});
        }
    }

    async createPresale(dto: any, account: string, address: string, abi: any) {
        const web3 = this.GetProvider();
        if (web3 !== null) {
            const presaleContractInterface = new web3.eth.Contract(abi);
            presaleContractInterface.options.address = address;
            await presaleContractInterface.methods.CreatePresale(dto)
                .send({from: account});
        }
    }
}