import React, { useState } from 'react'
import { useAccount, useContractRead } from 'wagmi';
import { formatEther } from 'viem';

var Web3 = require('web3');

//------------Hooks-------------
/*
function Hooks_() {
  const {data: Airdrop, isError: Airdrop_isError, isLoading: Airdrop_isLoading, error: Airdrop_error} = useContractRead({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Airdrop_Address',
  });
  if (Airdrop_isError){
    console.log("Airdrop Error is : " + Airdrop_error);
  }
  else{
    if (Airdrop_isLoading){
      console.log("Airdrop Is Still Loading");
    }
    else {
      console.log('Airdrop Address Is : ' + Airdrop);
    }
  }

  const {data: Presale, isError: Presale_isError, isLoading: Presale_isLoading, error: Presale_error} = useContractRead({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Presale_Address',
  });
  if (Presale_isError){
    console.log("Presale Error is : " + Presale_error);
  }
  else{
    if (Presale_isLoading){
      console.log("Presale Is Still Loading");
    }
    else {
      console.log('Presale Address Is : ' + Presale);
    }
  }

  const {data: Admin, isError: Admin_isError, isLoading: Admin_isLoading, error: Admin_error} = useContractRead({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Admin',
  });
  if (Admin_isError){
    console.log("Admin Error is : " + Admin_error);
  }
  else{
    if (Admin_isLoading){
      console.log("Admin Is Still Loading");
    }
    else {
      console.log('Admin Address Is : ' + Admin);
    }
  }
  

  let t_or_false = true;
  const {data: t_or_f, isError: t_or_f_isError, isLoading: t_or_f_isLoading, error: t_or_f_error} = useContractRead({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Claim_Bool',
    args: [address],
  });
  if (t_or_f_isError){
    console.log('t_or_f Error Is : ' + t_or_f_error);
  }
  else {
    console.log("t_or_f Has No Error's !!!!");
    //
    if (t_or_f_isLoading){
      console.log('t_or_f Is Still Loading');
    }
    else {
      if (t_or_f === undefined){
        t_or_false = false;
      }
      else {
        t_or_false = t_or_false;
      }
      console.log('t_or_f is : ' + t_or_f);
      console.log('t_or_false : ' + t_or_false);  
    }//
    if (t_or_f === undefined){
      t_or_false = false;
    }
    else {
      t_or_false = t_or_false;
    }
    console.log('t_or_f is : ' + t_or_f);
    console.log('t_or_false : ' + t_or_false); 
   
  }
}
*/


const Claim_Condition = async(TFM_Contract, publicClients, setClaim, address, Message, SetMessage, SetText_Color) => {

  
  let date = new Date(); 
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  let today_date = dd + "-" + mm + "-" + yy + " || " + h + ":" + m + ":" + s;
  //console.log("    Todays Date is : " + today_date);
  
  const Airdrop_Address = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Airdrop_Address',
  });

  const Presale_Address = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Presale_Address',
  });
  
  const t_or_false = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Claim_Bool',
    args: [address],
  });
  
  console.log('Your Claim_Bool Is : ' + t_or_false);
  
   


  if (address === Airdrop_Address){
    SetMessage("Airdrop Address Can't Claim for Itself!");
    SetText_Color('danger');
    setClaim(true);
  }
  else if (address === Presale_Address){
    SetMessage("Presale Address Can't Claim For Itself!");
    SetText_Color('danger');
    setClaim(true);
  }
  else {
    setClaim(t_or_false);
    if (t_or_false === true){
      if (Message === ''){
        SetMessage('You Can Only Claim It Once And You Have Already Claimed It');
        SetText_Color('danger');
      }
    }
    else {
      if (Message === ''){
        SetMessage("You Haven't Claim It Yet!, So Go Ahead And Claim It!");
        SetText_Color('success');
      }
    }
  }
}

const Claim_function = async(TFM_Contract, publicClients, walletClient, datetimestamp, address, SetMessage, SetText_Color) => {
  console.log('Datetimestamp Is : ' + datetimestamp);
  const Airdrop = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Airdrop_Address',
  });
  const Presale = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Presale_Address',
  });
  const Admin = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Admin',
  });


  const t_or_false = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Claim_Bool',
    args: [address],
  });
  
  console.log('Your Claim_Bool Is : ' + t_or_false);
  console.log(address);

  if (t_or_false === false){

    if (address === Airdrop){
      SetMessage("Airdrop Address Can't Claim for Itself!");
      SetText_Color('danger');
    }
    else if (address === Presale){
      SetMessage("Presale Address Can't Claim For Itself!");
      SetText_Color('danger');
    }
    else {
      
      const getaddbal = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Withdrawl_Eth',
        args: [address],
      });
      console.log("       Withdrawl Balance Of Account : " + address + " is " + getaddbal);
  
      let amount_in_wei = Web3.utils.toWei('1').toString();
      
      //await contractins.methods.Once_Claim_Airdrop(address, amount_in_wei, datetimestamp).send({from: address, value: '00001'});
      const { request } = await publicClients.simulateContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Once_Claim_Airdrop',
        args: [address, amount_in_wei, datetimestamp],
        account: address,
        value: '00001',
      });
      console.log('Request : ');
      console.log(request);
  
      let request_writeContract = await walletClient.writeContract(request);
      console.log("Request Write Contract : ");
      console.log(request_writeContract);
  
  
      const getaddbal2 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Withdrawl_Eth',
        args: [address],
      });
      console.log("       Withdrawl Balance Of Account : " + address + " is " + getaddbal2);
      
      console.log(Web3.utils.fromWei(getaddbal.toString()));
      console.log(Web3.utils.fromWei(getaddbal2.toString()));
    
      console.log(" ");
      console.log(" ");
      console.log(" ");
      SetText_Color('success');
      SetMessage('You Have Claimed 1 TFC!');
      
    }
  
  }
  else {
    SetMessage('You Can Only Claim It Once And You Have Already Claimed It');
    SetText_Color('danger');
  }
}


export default function Airdrop(props) {

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();


  const [Claim_tof, Setclaim_tof] = useState(true);
  const [Message, SetMessage] = useState('');
  const [Text_Color, SetText_Color] = useState('danger');

  const [Render, SetRender] = useState(false);
 
  if(Render === false) {
    Claim_Condition(props.TFM_Contract, props.publicClients, Setclaim_tof, address, Message, SetMessage, SetText_Color);
    SetRender(true);
  }
  
  const Claim = async() => {
    var current = new Date();
    console.log(current);
    
    let date = new Date(); 
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let today_datetime = dd + "-" + mm + "-" + yy + " | " + h + ":" + m + ":" + s;
    console.log("Todays DateTime is : " + today_datetime);

    const today_datetime_number = await props.publicClients.readContract({
      address: props.D_Contract.address,
      abi: props.D_Contract.abi,
      functionName: 'timestampFromDateTime',
      args: [yy, mm, dd, h, m, s],
    });
    console.log('Todays DateTime in TimeStamp: ' + today_datetime_number);
    
    const today_datetime_from_number = await props.publicClients.readContract({
      address: props.D_Contract.address,
      abi: props.D_Contract.abi,
      functionName: 'timestampToDateTime',
      args: [today_datetime_number],
    });
    console.log('datetime from timestamp: ' + today_datetime_from_number[2] + '-' + today_datetime_from_number[1] + '-' + today_datetime_from_number[0] + " | " + today_datetime_from_number[3] + ':' + today_datetime_from_number[4] + ':' + today_datetime_from_number[5]);
    console.log('  ')

    await Claim_function(props.TFM_Contract, props.publicClients, props.walletClient, today_datetime_number, address, SetMessage, SetText_Color);
    
    SetRender(false);
  }
  
  

  return (
    <div className='container text-light' style={{backgroundColor: props.color}}>
      <div className='mx-3' style={{textAlign:'center'}}>
        <h1>Airdrop</h1>
        <div className={`row my-3 mx-3 text-${Text_Color}`}  ><strong>{Message}</strong></div>
      </div>
      <div className="container" style={{textAlign: 'center'}}>  
        <div className="row my-3">
            <div className="col" style={{width:'33%'}}></div>
            <div className="col my-2" style={{width:'33%'}}>
                <button disabled={Claim_tof===true} className="btn btn-primary" onClick={Claim} style={{width: '100%'}} >Claim</button>
            </div>
            <div className="col my-2" style={{width:'33%'}}></div>
        </div>
      </div>
    </div>
  )
}
