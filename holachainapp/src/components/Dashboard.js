import react from 'react';

function dashboard(props) {

    const handleChange = (e) => {
        console.log('ADDRESS', e.target.value)
        props.setAppState(prevState => {
            return {
                ...prevState,
                recipientAddress: e.target.value
            }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center w-fit">
                <div className="flex items-center space-x-8 mb-6">
                    <p className="text-xl px-6 py-3 rounded-full bg-green-300">CONNECTED</p>
                    <p className="text-xl antialiased text-white">{props.appState.account}</p>
                </div>
                {
                    props.appState.dataRefresh || props.appState.isProcessing ?
                        <div>
                            <p className='text-3xl text-white font-medium py-6'>Fetching Transaction Data. Please wait...</p>
                        </div> :
                        <div></div>
                }
                <div className="flex flex-auto justify-center  rounded-3xl p-4 gap-14">
                    <div className="px-6 bg-zinc-600 rounded-3xl">
                        <img className="dash-logo" src="/assets/hc_logo.svg"></img>
                    </div>
                    <div className="flex flex-col items-center justify-center text-white px-6 gap-9">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-5 justify-center items-center">
                                <p className='text-6xl'>{props.appState.userData.received}</p>
                                <img className='wave-icon' src="/assets/hand-wave.svg"></img>
                            </div>
                            <p className='text-3xl bg-zinc-400 px-7 py-3 rounded-full'>Waves Received</p>
                        </div >
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-5 justify-center items-center">
                                <img className='wave-icon' src="/assets/hand-wave.svg"></img>
                                <p className='text-6xl'>{props.appState.userData.sent}</p>
                            </div>
                            <p className='text-3xl bg-zinc-400 px-7 py-3 rounded-full'>Waves Sent</p>
                        </div>
                        <div>
                            <button onClick={() => props.getWaveData()} disabled={props.appState.isProcessing || props.appState.dataRefresh} className='bg-slate-500 text-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-sky-500 px-3 rounded-3xl justify-self-end'>Refresh Data</button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center px-6 gap-6 bg-zinc-600 rounded-3xl">
                        <input onChange={(e) => handleChange(e)} className='text-white text-base w-96 text-center bg-zinc-600 border-b-2 py-2 focus:outline-none' placeholder='Enter Address'></input>
                        <button onClick={() => props.sendWave()} disabled={props.appState.isProcessing} className='disabled:opacity-50 disabled:cursor-not-allowed drop-shadow-2xl text-4xl bg-sky-500 px-7 py-3 rounded-full text-white hover:bg-white hover:text-black'>Send Wave</button>
                    </div>
                </div>
                <div className="flex flex-row mt-6">
                    <p className='text-3xl text-sky-500 font-medium'>{props.appState.totalWavers}</p>
                    <p className='text-3xl text-white font-medium'>&nbsp; people have shared&nbsp;</p>
                    <p className='text-3xl text-sky-500 font-medium'>{props.appState.totalWaves}</p>
                    <p className='text-3xl text-white font-medium'>&nbsp;waves</p>
                </div>
            </div>
        </div>
    )
}

export default dashboard