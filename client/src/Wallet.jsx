import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1"
import {keccak256} from "ethereum-cryptography/keccak"
import {toHex} from "ethereum-cryptography/utils"


function Wallet({ privatekey, setPrivateKey, balance, setBalance }) {
  async function onChange(evt) {
    const privatekey = evt.target.value;
    setPrivateKey(privatekey);

    const publicKey = secp.getPublicKey(privatekey)

    // first bit is the type of public key
    // 20 last bits form the address
    const address = toHex(keccak256(publicKey.slice(1)).slice(-20))

    if (privatekey) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input placeholder="Type an privatekey" value={privatekey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
