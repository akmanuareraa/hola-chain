/* eslint-disable jsx-a11y/alt-text */
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react"
import Homepage from './components/Homepage'
import Dashboard from './components/Dashboard'
import holachainABI from './components/ABI/holachainABI'

function App() {

  const [appState, setAppState] = useState({
    isWeb3: false,
    dashboard: false,
    abi: JSON.parse(holachainABI),
    contractAddress: '0x120D82F4996dae0D982a98891191E5078B54e681',
    totalWaves: 0,
    totalWavers: 0,
    wrongChain: false,
    metamaskStatus: null,
    userData: {
      sent: 0,
      received: 0
    }
  })

  useEffect(() => {

    console.log("UseEffect Checking Metamask Status")

    if (window.ethereum) {

      console.log("Metamask Installed")

      if (!appState.metamaskStatus) {
        setAppState(prevState => {
          return {
            ...prevState,
            metamaskStatus: true
          }
        })
      }

      window.ethereum.on('accountsChanged', function () {
        console.log('Metamask Accounts Changed')
        setAppState(prevState => {
          return {
            ...prevState,
            isWeb3: false,
            dashboard: false,
            totalWaves: 0,
            totalWavers: 0,
            metamaskStatus: true,
            userData: {
              sent: 0,
              received: 0
            }
          }
        })
      })

      window.ethereum.on('chainChanged', (_chainId) => {
        console.log('Chain Changed', _chainId)
        if (_chainId === '0x13881') {
          setAppState(prevState => {
            return {
              ...prevState,
              isWeb3: false,
              dashboard: false,
              totalWaves: 0,
              totalWavers: 0,
              wrongChain: false,
              chainId: _chainId,
              metamaskStatus: true,
              userData: {
                sent: 0,
                received: 0
              }
            }
          })
        } else {
          setAppState(prevState => {
            return {
              ...prevState,
              isWeb3: false,
              dashboard: false,
              totalWaves: 0,
              totalWavers: 0,
              wrongChain: true,
              chainId: _chainId,
              metamaskStatus: true,
              userData: {
                sent: 0,
                received: 0
              }
            }
          })
        }
      })

    } else {
      console.log('Metamask not Installed')
      if (appState.metamaskStatus !== false) {
        setAppState(prevState => {
          return {
            ...prevState,
            metamaskStatus: false
          }
        })
      }
    }
  })

  const getWaveData = async () => {
    setAppState(prevState => {
      return {
        ...prevState,
        dataRefresh: true
      }
    })
    let contract = new appState.web3.eth.Contract(appState.abi, appState.contractAddress)
    let totalWavers = await contract.methods.totalWavers().call({ from: appState.account })
    let totalWaves = await contract.methods.totalWaves().call({ from: appState.account })
    let ledger = await contract.methods.ledger(appState.account).call({ from: appState.account })
    console.log('totalWavers', totalWavers, 'totalWaves', totalWaves, 'userData', ledger)
    setAppState(prevState => {
      return {
        ...prevState,
        totalWaves: totalWaves,
        totalWavers: totalWavers,
        userData: {
          sent: ledger.sent,
          received: ledger.received
        },
        dataRefresh: false
      }
    })
  }

  const sendWave = () => {
    setAppState(prevState => {
      return {
        ...prevState,
        isProcessing: true
      }
    })
    console.log('Recepient Address', appState.recipientAddress)
    if (Web3.utils.isAddress(appState.recipientAddress)) {
      let contract = new appState.web3.eth.Contract(appState.abi, appState.contractAddress)
      console.log('inside wave', appState.recipientAddress)
      contract.methods.wave(appState.recipientAddress).send({ from: appState.account })
        .on('transactionHash', (txnHash) => {
          console.log('Transaction hash Received', txnHash)
        })
        .on('receipt', (receipt) => {
          console.log('Receipt', receipt)
        })
        .on('confirmation', (confirmationNumber) => {
          if (confirmationNumber === 2) {
            console.log('Confirmed', confirmationNumber)
            console.log('Refreshing Data...')
            getWaveData()
            setAppState(prevState => {
              return {
                ...prevState,
                isProcessing: false
              }
            })
          }
        })
        .on('error', (err => {
          console.log('Error Occured', err)
          setAppState(prevState => {
            return {
              ...prevState,
              isProcessing: false
            }
          })
        }))
    } else {
      alert('Invalid Address. Please input a valid address.')
    }
  }

  const ConnectWallet = () => {
    console.log("Connect Wallet", window.ethereum)
    if (window.ethereum) {
      appState.isWeb3 = true;
      const ethereum = window.ethereum;
      let web3 = new Web3(ethereum);
      ethereum.enable().then((accounts) => {
        let account = accounts[0];
        web3.eth.defaultAccount = account;
        console.log('Dets', account, appState, ethereum.chainId);
        setAppState(prevState => {
          return {
            ...prevState,
            isWeb3: true,
            account: web3.utils.toChecksumAddress(accounts[0]),
            web3: web3,
            wrongChain: false,
            chainId: ethereum.chainId
          }
        })
        switchNetworkMumbai(web3, ethereum)
      })
    }
  };

  const switchNetworkMumbai = async (web3, ethereum) => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                chainName: 'Polygon Mumbai Testnet',
                rpcUrls: ['https://matic-mumbai.chainstacklabs.com	'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error while adding new chain to MetaMask')
        }
      }
      // handle other "switch" errors
    }
    setAppState(prevState => {
      return {
        ...prevState,
        wrongChain: false,
        chainId: ethereum.chainId
      }
    })
  }

  useEffect(() => {
    ConnectWallet()
  }, [])

  return (
    <div className="App">
      {appState.dashboard ?
        <Dashboard
          appState={appState}
          setAppState={setAppState}
          getWaveData={getWaveData}
          sendWave={sendWave}
        /> :
        <Homepage
          appState={appState}
          setAppState={setAppState}
          ConnectWallet={ConnectWallet}
          getWaveData={getWaveData}
        >
        </Homepage>
      }
    </div>
  );
}

export default App;
