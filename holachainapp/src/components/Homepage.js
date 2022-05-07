import react from 'react';
import Web3 from "web3";
import { useState, useEffect } from "react"

function homePage(props) {
    return (
        <div className="flex flex-col items-center h-screen">
            <img className="home-logo" src="/assets/hc_logo.svg" />
            {
                props.appState.wrongChain || props.appState.chainId !== '0x13881' ?
                    <div className="flex items-center space-x-8">
                        <p className="text-xl text-white px-6 py-3 mb-12 rounded-full bg-indigo-600">Please switch to Polygon Mumbai Testnet</p>
                    </div> :
                    <></>
            }
            {props.appState.isWeb3 ?
                <div className="flex flex-col items-center space-y-12">
                    <div className="flex items-center space-x-8">
                        <p className="text-xl px-6 py-3 rounded-full bg-green-300">CONNECTED</p>
                        <p className="text-xl antialiased text-white">{props.appState.account}</p>
                    </div>
                    <div>
                        <button
                            disabled={props.appState.chainId !== '0x13881'}
                            className="bg-white hover:bg-slate-50 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed font-bold py-4 px-12 rounded-full"
                            onClick={() => {
                                if (props.appState.chainId === '0x13881') {
                                    props.getWaveData()
                                    props.setAppState(prevState => {
                                        return {
                                            ...prevState,
                                            dashboard: true
                                        }
                                    })
                                } else {
                                    alert("Please switch to Polygon Mumbai Testnet")
                                }
                            }}
                        >
                            <div className="flex space-x-6 items-center">
                                <p>Enter App</p>
                                <img src="/assets/arrow.svg"></img>
                            </div>
                        </button>
                    </div>
                </div> :
                <button
                    onClick={() => {
                        console.log("Connect to Metamask")
                        props.ConnectWallet()
                    }}
                    class="bg-sky-500 hover:bg-slate-50 hover:text-black text-white font-bold py-4 px-12 rounded-full"
                >
                    <p class="text-3xl">Connect Wallet</p>
                </button>
            }
        </div>
    )
}

export default homePage