import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
	const [privAddr, setPrivAddr] = useState("");
	const [pubAddr, setPubAddr] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
				privAddr={privAddr}
				setPrivAddr={setPrivAddr}
      />
      <Transfer 
				setBalance={setBalance}
				address={address} 
				privAddr={privAddr}
			/>
    </div>
  );
}

export default App;
