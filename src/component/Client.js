import React, { useState } from 'react'
import { useAccount, useContractRead } from 'wagmi';
import { formatEther } from 'viem';

var Web3 = require('web3');

const Client_Data = async(TFM_Contract, publicClients, address, SetSponserCount, SetBalance) => {

  const sponsercount = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'getsponser_count',
    args: [address],
  });
  console.log('Sponser Count Is : ' + Number(sponsercount));

  const your_withdrawl_balance = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Withdrawl_Eth',
    args: [address],
  });

  console.log('Your Withdrawl Balance Is : ' + formatEther(your_withdrawl_balance.toString()));

  SetSponserCount(Number(sponsercount));
  SetBalance(Web3.utils.fromWei(your_withdrawl_balance.toString()));

}


export default function Client(props) {

    const { address, isConnected, isConnecting, isDisconnected } = useAccount();

    let Link = document.URL + 'reffer?r=' + address;

    const [SponserCount, SetSponserCount] = useState(0);
    const [Balance, SetBalance] = useState(0);
    
    const [Render, SetRender] = useState(false);

    if (Render === false){
      Client_Data(props.TFM_Contract, props.publicClients, address, SetSponserCount, SetBalance);
      SetRender(true);
    }

    const Copy_Click = async() => {
      navigator.clipboard.writeText(Link);
    }

  return (
    <div className='container text-light' style={{backgroundColor: props.color}}>
      <div className="mx-3" style={{textAlign: 'center'}}>
        <h1>Client Details</h1> 
      </div>
      <div style={{textAlign: 'center'}}>
        <div className="row"></div>
        <div className="row">
            <div className="col" style={{width: '100%', textAlign: 'center'}}>Reffer Link : </div>
        </div>
        <div className="row">
          <div className="col" style={{width: '100%', textAlign: 'center'}}>{Link}</div>
        </div>
        <br />
        <div className="row">
            <div className="col" style={{width: '33%', textAlign: 'center'}}></div>
            <div className="col" style={{width: '33%', textAlign: 'center'}}>
                <button className="btn btn-primary" style={{width: '50%'}} onClick={Copy_Click}>Copy</button>
            </div>
            <div className="col" style={{width: '33%', textAlign: 'center'}}></div>
        </div>
        <div className="container">
          <div className="row my-2">
            <div className="col">
                <div className="col">Sponser Count: </div>
                <div className="col">{SponserCount}</div>
            </div>
            <div className="col">
                <div className="col">Your Withdrawl Balance: </div>
                <div id='total_supply' className="col">{Balance + " TFM"}</div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}
