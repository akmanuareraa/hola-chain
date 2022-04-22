/* eslint-disable jsx-a11y/alt-text */
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center h-screen">
        <img src='/assets/hc_logo.svg' style={{ height: '500px' }, { width: '500px' }} />
        <button onClick={() => console.log('Connect to Metamask')} class="bg-sky-500 hover:bg-slate-50 hover:text-black text-white font-bold py-4 px-12 rounded-full mt-6">
          <p class="text-3xl">Connect Wallet</p>
        </button>
      </div>
    </div>

  );
}

export default App;
