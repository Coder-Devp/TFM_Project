import React, { useState } from 'react'
import { useAccount } from 'wagmi';

var Web3 = require('web3');

const TextBox_Condition_About = async(TFM_Contract, publicClients, address, SetTextBox, SetMessage) => {
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
  console.log("Airdrop Address is : " + Airdrop);
  console.log("Presale Address is : " + Presale);
  console.log("Admin Address is : " + Admin);


  if (address === Airdrop){
    SetMessage("Airdrop Address Can't Buy for Itself!");
    console.log("Airdrop Address Can't Buy for Itself!");
    SetTextBox(true);
  }
  else if (address === Presale){
    SetMessage("Presale Address Can't Buy For Itself!");
    console.log("Presale Address Can't Buy For Itself!");
    SetTextBox(true);
  }
  else if (address === Admin){
    SetMessage("Admin Can't Buy For HimSelf");
    console.log("Admin Can't Buy For HimSelf");
    SetTextBox(true);
  }
  else {
    SetMessage('');
    SetTextBox(false);
  }
}

const Balance_Function = async(publicClients, Setcurrent_balance, address) => {
  console.log(address);
  const bal = await publicClients.getBalance({ 
    address: address,
  })
  let eth_bal = await Web3.utils.fromWei(bal.toString(), 'ether');
  console.log('Account Balance Is : ' + bal);
  Setcurrent_balance(eth_bal + ' BNB');
}

const Progress_Bar_Code = async(TFM_Contract, publicClients, setProgress, setminval, setbuyerrate, token_in_Wei, token_rate, SetToken_Amount, SetToken_In_Wei, SetBuyer_Text_Condition, SetBuyer_Condition, BuyerRate) => {

  let full_value = Web3.utils.toWei((50000).toString());//90000;
  console.log("     Full Presale Value Is : " + full_value);

  const Presale_Address = await publicClients.readContract({
      address: TFM_Contract.address,
      abi: TFM_Contract.abi,
      functionName: 'Presale_Address',
  });
  const Presale_Address_Balance = await publicClients.readContract({
      address: TFM_Contract.address,
      abi: TFM_Contract.abi,
      functionName: 'getbalance',
      args: [Presale_Address],
  });
  
  console.log('Presale Address : ' + Presale_Address);
  console.log('Presale Address Balance : ' + Web3.utils.fromWei(Presale_Address_Balance.toString()));
  //let presale_balance = web3.utils.fromWei(Presale_Address_Balance.toString());

  console.log("Presale Address Balance is : " + Presale_Address_Balance); //presale_balance);//web3.utils.fromWei(Presale_Address_Balance));

  let f_v = Web3.utils.fromWei(full_value.toString());
  let p_a_b = Web3.utils.fromWei(Presale_Address_Balance.toString());
  
  console.log("    Full Value In Eth is : " + f_v);
  console.log(" Presale Value In Eth is : " + p_a_b);

  
  let min_val = f_v - p_a_b;
  console.log("            Minus Value Is : " + min_val);
  setminval(min_val);


  let persentage = min_val * 100 / f_v;
  let real_per = 100 - persentage;
  console.log('Persentage : ' + persentage); 
  //console.log(real_per);
  
  
  let per = persentage.toString();
  var myArr = String(per).split("").map((per)=>{
    return Number(per)
  })

  console.log(myArr);
  let buyer_phase_1 = '0.001';//'0.10';
  let buyer_phase_2 = '0.010';//'1';
  let buyer_phase_3 = '0.100';//'2.5';
  let buyer_phase_4 = '1';//'5';
  

  if (per.length === 1){
    let pr = myArr[0];
    console.log(pr);
    setProgress(pr);
    setbuyerrate(buyer_phase_1);
  }
  else if (per.length === 2){ 
    let pr = myArr[0] + '' + myArr[1];
    console.log(pr);
    setProgress(pr);
    if (pr < 25){
      setbuyerrate(buyer_phase_1);
    }
    else if (pr >= 25 && pr < 50){
      setbuyerrate(buyer_phase_2);
    }
    else if (pr >= 50 && pr < 75){
      setbuyerrate(buyer_phase_3);
    }
    else if (pr >= 75 && pr < 100){
      setbuyerrate(buyer_phase_4);
    }
  }
  else if (myArr[1].toString() === 'NaN' && per.length === 4){
    let pr = myArr[0] + '.' + myArr[2] + '' + myArr[3];
    console.log(pr);
    setProgress(pr);
    setbuyerrate(buyer_phase_1);
  }  
  else if (myArr[1].toString() === 'NaN' && per.length === 5){
    let pr = myArr[0] + '.' + myArr[2] + '' + myArr[3] + '' + myArr[4];
    console.log(pr);
    setProgress(pr);
    setbuyerrate(buyer_phase_1);
  }
  else if (myArr[2].toString() === 'NaN' && per.length === 4){
    let pr = myArr[0] + '' + myArr[1] + '.' + myArr[3];
    console.log(pr);
    setProgress(pr);
    if (pr < '25.000'){
      setbuyerrate(buyer_phase_1);
    }
    else if (pr >= '25.000' && pr < '50.000'){
      setbuyerrate(buyer_phase_2);
    }
    else if (pr >= '50.000' && pr < '75.000'){
      setbuyerrate(buyer_phase_3);
    }
    else if (pr >= '75.000' && pr < '100.000'){
      setbuyerrate(buyer_phase_4);
    }
  }
  else if (myArr[2].toString() === 'NaN' && per.length === 5){
    let pr = myArr[0] + '' + myArr[1] + '.' + myArr[3] + '' + myArr[4];
    console.log(pr);
    setProgress(pr);
    if (pr < '25.000'){
      setbuyerrate(buyer_phase_1);
    }
    else if (pr >= '25.000' && pr < '50.000'){
      setbuyerrate(buyer_phase_2);
    }
    else if (pr >= '50.000' && pr < '75.000'){
      setbuyerrate(buyer_phase_3);
    }
    else if (pr >= '75.000' && pr < '100.000'){
      setbuyerrate(buyer_phase_4);
    }
  }
  else if (myArr[2].toString() === 'NaN' && per.length === 6){
    let pr = myArr[0] + '' + myArr[1] + '.' + myArr[3] + '' + myArr[4] + '' + myArr[5];
    console.log(pr);
    setProgress(pr);
    if (pr < '25.000'){
      setbuyerrate(buyer_phase_1);
    }
    else if (pr >= '25.000' && pr < '50.000'){
      setbuyerrate(buyer_phase_2);
    }
    else if (pr >= '50.000' && pr < '75.000'){
      setbuyerrate(buyer_phase_3);
    }
    else if (pr >= '75.000' && pr < '100.000'){
      setbuyerrate(buyer_phase_4);
    }
  }
  
  condition(token_in_Wei, token_rate, SetToken_Amount, SetToken_In_Wei, SetBuyer_Text_Condition, SetBuyer_Condition, BuyerRate);

}

const condition = async(token_in_wei, token_rate, SetToken_Amount, SetToken_In_Wei, SetBuyer_Text_Condition, SetBuyer_Condition, BuyerRate) => {
  let token_amount = token_in_wei / token_rate;
  SetToken_Amount(token_amount);
  SetToken_In_Wei(token_in_wei);
  TFC_Buy_Condition(SetBuyer_Text_Condition, SetBuyer_Condition, token_in_wei, BuyerRate);

}

const TFC_Buy_Condition = async(SetBuyer_Text_Condition, SetBuyer_Condition, rate, WRate) => {
  if (rate < WRate){
    SetBuyer_Text_Condition('Minimum Buyer Amount Required Is '+ WRate + ' ETH');
    SetBuyer_Condition(true);
  }
  else if(rate >= WRate){
    SetBuyer_Text_Condition('');
    SetBuyer_Condition(false);
  }

}

const Presale_function = async(TFM_Contract, D_Contract, publicClients, walletClient, timestamp, datetimestamp, token_in_wei, token_amount, address, SetBuyer_Text_Condition, Minvalue, Token_Amount) => {
  let available_value = 50000 - Minvalue;
  console.log("Available value Is : " + available_value);
  let left_over_value = available_value - Token_Amount;
  console.log("Left Over Value Is : " + left_over_value);
  if (left_over_value < 0){
    console.log('Presale Balance Amount Exceed!');
    SetBuyer_Text_Condition('Presale Balance Amount Exceed!');
  }
  else if (left_over_value >= 0){
    console.log("Presale Remaining Balance Is : " + left_over_value);

    console.log('    Timestamp Is : ' + timestamp);
    console.log('Datetimestamp Is : ' + datetimestamp);

    //let Presale = await contractins.methods.Presale_Address().call();
    //let Airdrop = await contractins.methods.Airdrop_Address().call();
    //let Admin = await contractins.methods.Admin().call();

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
      functionName: 'Presale_Address',
    });


    console.log(address);
    if (address === Presale){
      SetBuyer_Text_Condition("Presale Address Can't Buy for Itself!");
    }
    if (address === Airdrop){
      SetBuyer_Text_Condition("Airdrop Address Can't Claim for Itself!");
    }
    else if (address === Admin){
      SetBuyer_Text_Condition("Admin Can't Claim For HimSelf");
    }  
    else {
      //let t_or_false = await contractins.methods.Today_Presale_Bool(address, timestamp).call();
      let t_or_false = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Today_Presale_Bool',
        args: [address, timestamp],
      });
      console.log("       Today Presale Bool Is : " + t_or_false);
      //let today_Presale_no = await contractins.methods.Today_Presale_No(address, timestamp).call();
      let today_Presale_no = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Today_Presale_No',
        args: [address, timestamp],
      });
      console.log("         Today Presale No Is : " + today_Presale_no);

      let Today_Presale_Count1 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Total_Presale_Count',
        args: [address],
      });
      console.log("      Total Presale Count Is : " + Today_Presale_Count1);

      //let today_datetime_number = await contractins.methods.User_Presale_Record(address, today_Presale_no).call();
      let today_datetime_number = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'User_Presale_Record',
        args: [address, today_Presale_no],
      });
      //let today_datetime_from_number = await dcontractins.methods.timestampToDateTime(today_datetime_number).call();
      let today_datetime_from_number = await publicClients.readContract({
        address: D_Contract.address,
        abi: D_Contract.abi,
        functionName: 'timestampToDateTime',
        args: [today_datetime_number],
      });
      console.log("User Today Presale Record Is : " + today_datetime_number + " === " + today_datetime_from_number[2] + '-' + today_datetime_from_number[1] + '-' + today_datetime_from_number[0] + " | " + today_datetime_from_number[3] + ':' + today_datetime_from_number[4] + ':' + today_datetime_from_number[5]);
     
      
      //let getPresalebal = await contractins.methods.getbalance(Presale).call();
      let getPresalebal = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Presale],
      });
      console.log("         Balance Of Presale : " + Presale + " is " + getPresalebal);
      
      //let getaddbal = await contractins.methods.getbalance(address).call();
      let getaddbal = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [address],
      });
      console.log("       Balance Of Account : " + address + " is " + getaddbal);
    
      let token_amount_in_wei = Web3.utils.toWei(token_amount.toString());
      let token_rate_in_wei = Web3.utils.toWei(token_in_wei.toString());
      console.log('Token Amount is ' + token_amount.toString() + "---" + token_amount_in_wei.toString() + ' ||| Token rate in Wei ' + token_rate_in_wei.toString());
      
      //await contractins.methods.Buy_Presale(address, token_amount_in_wei.toString(), timestamp, datetimestamp).send({from: address, value: token_rate_in_wei.toString()});  
      const { request } = await publicClients.simulateContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Buy_Presale',
        args: [address, token_amount_in_wei.toString(), timestamp, datetimestamp],
        account: address,
        value: token_rate_in_wei.toString(),
      });
      console.log('Request : ');
      console.log(request);
  
      let request_writeContract = await walletClient.writeContract(request);
      console.log("Request Write Contract : ");
      console.log(request_writeContract);

      //let getPresalebal2 = await contractins.methods.getbalance(Presale).call();
      let getPresalebal2 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Presale],
      });
      console.log("         Balance Of Presale : " + Presale + " is " + getPresalebal2);
      
      //let getaddbal2 = await contractins.methods.getbalance(address).call();
      let getaddbal2 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [address],
      });
      console.log("       Balance Of Account : " + address + " is " + getaddbal2);
      
      console.log(Web3.utils.fromWei(getPresalebal).toString());
      console.log(Web3.utils.fromWei(getPresalebal2).toString());
      console.log(Web3.utils.fromWei(getaddbal).toString());
      console.log(Web3.utils.fromWei(getaddbal2).toString());
    
      let Today_Presale_Bool_1 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Today_Presale_Bool',
        args: [address, timestamp],
      });
      console.log("       Today Presale Bool Is : " + Today_Presale_Bool_1);
      //let today_Presale_no2 = await contractins.methods.Today_Presale_No(address, timestamp).call();
      let today_Presale_no2 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Today_Presale_No',
        args: [address, timestamp],
      });
      console.log("         Today Presale No Is : " + today_Presale_no2);
  
      let Today_Presale_Count2 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Total_Presale_Count',
        args: [address],
      });
      console.log("      Total Presale Count Is : " + Today_Presale_Count2);

      //let today_datetime_number2 = await contractins.methods.User_Presale_Record(address, today_Presale_no2).call();
      let today_datetime_number2 = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'User_Presale_Record',
        args: [address, today_Presale_no2],
      });
      //let today_datetime_from_number2 = await dcontractins.methods.timestampToDateTime(today_datetime_number2).call();
      let today_datetime_from_number2 = await publicClients.readContract({
        address: D_Contract.address,
        abi: D_Contract.abi,
        functionName: 'timestampToDateTime',
        args: [today_datetime_number2],
      });
      console.log("User Today Presale Record Is : " + today_datetime_number2 + " === " + today_datetime_from_number2[2] + '-' + today_datetime_from_number2[1] + '-' + today_datetime_from_number2[0] + " | " + today_datetime_from_number2[3] + ':' + today_datetime_from_number2[4] + ':' + today_datetime_from_number2[5]);
  
      console.log(" ");
      console.log(" ");
      console.log(" ");
      
    }
  }
  
}





export default function Presale(props) {

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  const [Presale_tof, Setpresale_tof] = useState(false);
  const [Progress, Setprogress] = useState(0);
  const [Minvalue, Setminvalue] = useState(0);

  const [Token_Amount, SetToken_Amount] = useState();
  const [Token_In_Wei, SetToken_In_Wei] = useState();

  const [BuyerRate, SetBuyerRate] = useState('0.001');//'0.10');
  const [Current_Balance, SetCurrent_Balance] = useState(0);
  const [Buyer_Condition, SetBuyer_Condition] = useState(true);
  const [Buyer_Text_Condition, SetBuyer_Text_Condition] = useState('');
  const [TextBox_Condition, SetTextBox_Condition] = useState(true);


  const [Render, SetRender] = useState(false);

  
  //let wei_token = props.web3.utils.toWei('500').toString();
  //let rate_in_wei = props.web3.utils.toWei('0.001').toString();//'1000000000000000';
  //let rate = props.web3.utils.fromWei(rate_in_wei).toString();
  let token_rate = '0.001';//'0.10';
  //console.log(wei_token);

  if (Render === false){

    if (Buyer_Text_Condition === ''){
      TextBox_Condition_About(props.TFM_Contract, props.publicClients, address, SetTextBox_Condition, SetBuyer_Text_Condition);
      Balance_Function(props.publicClients, SetCurrent_Balance, address);
      Progress_Bar_Code(props.TFM_Contract, props.publicClients, Setprogress, Setminvalue, SetBuyerRate, Token_In_Wei, token_rate, SetToken_Amount, SetToken_In_Wei, SetBuyer_Text_Condition, SetBuyer_Condition, BuyerRate);
      SetRender(true);
    }
  }

  
  
  

  const Presale = async() => {
    var current = new Date();
    console.log(current);
    
    let date = new Date(); 
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let today_date = dd + "-" + mm + "-" + yy;
    let today_datetime = dd + "-" + mm + "-" + yy + " | " + h + ":" + m + ":" + s;
    console.log("    Todays Date is : " + today_date);
    console.log("Todays DateTime is : " + today_datetime);

    //let today_date_number = await props.dcontract.methods.timestampFromDate(yy, mm, dd).call();
    let today_date_number = await props.publicClients.readContract({
      address: props.D_Contract.address,
      abi: props.D_Contract.abi,
      functionName: 'timestampFromDate',
      args: [yy, mm, dd],
    });
    //let today_datetime_number = await props.dcontract.methods.timestampFromDateTime(yy, mm, dd, h, m, s).call();
    let today_datetime_number = await props.publicClients.readContract({
      address: props.D_Contract.address,
      abi: props.D_Contract.abi,
      functionName: 'timestampFromDateTime',
      args: [yy, mm, dd, h, m, s],
    });
    console.log('    Todays Date in TimeStamp: ' + today_date_number);
    console.log('Todays DateTime in TimeStamp: ' + today_datetime_number);
    
    //let today_date_from_number = await props.dcontract.methods.timestampToDate(today_date_number).call();
    let today_date_from_number = await props.publicClients.readContract({
      address: props.D_Contract.address,
      abi: props.D_Contract.abi,
      functionName: 'timestampToDate',
      args: [today_date_number],
    });
    console.log('    date from timestamp: ' + today_date_from_number[2] + '-' + today_date_from_number[1] + '-' + today_date_from_number[0]);
    //let today_datetime_from_number = await props.dcontract.methods.timestampToDateTime(today_datetime_number).call();
    let today_datetime_from_number = await props.publicClients.readContract({
      address: props.D_Contract.address,
      abi: props.D_Contract.abi,
      functionName: 'timestampToDateTime',
      args: [today_datetime_number],
    });
    console.log('datetime from timestamp: ' + today_datetime_from_number[2] + '-' + today_datetime_from_number[1] + '-' + today_datetime_from_number[0] + " | " + today_datetime_from_number[3] + ':' + today_datetime_from_number[4] + ':' + today_datetime_from_number[5]);
    console.log('  ')

    try{
      await Presale_function(props.TFM_Contract, props.D_Contract, props.publicClients, props.walletClient, today_date_number, today_datetime_number, Token_In_Wei, Token_Amount, address, SetBuyer_Text_Condition, Minvalue, Token_Amount);
      SetRender(false);
    }
    catch{
    }
    Progress_Bar_Code(props.TFM_Contract, props.publicClients, Setprogress, Setminvalue, SetBuyerRate, Token_In_Wei, token_rate, SetToken_Amount, SetToken_In_Wei, SetBuyer_Text_Condition, SetBuyer_Condition, BuyerRate);
    condition(Token_In_Wei, token_rate, SetToken_Amount, SetToken_In_Wei, SetBuyer_Text_Condition, SetBuyer_Condition, BuyerRate);
    
  }
  

  const handleOnChange = (event) => {
    let token_in_Wei = event.target.value;
    let max_length = event.target.value.length;
    if (max_length > 5){
      SetBuyer_Text_Condition('Length Exceed');
      SetBuyer_Condition(true);
    }
    else{
      SetBuyer_Text_Condition(''); 
      condition(token_in_Wei, token_rate, SetToken_Amount, SetToken_In_Wei, SetBuyer_Text_Condition, SetBuyer_Condition, BuyerRate);
    }
  }

  


  return (
    <div className='container text-light' style={{backgroundColor: props.color}}>
      <div style={{textAlign:'center'}}>
        <h1>Pre-Sale</h1>
      </div>
      <div className="container" style={{textAlign: 'center'}}>
        <div className="row">
            <div className="row">
                <label id='text_id'>1 TFC is Equal To {token_rate} BNB</label>
            </div>
            <div className="row">  
              <label className="form-label">Please Enter BNB</label>
              <input disabled={TextBox_Condition===true} type="number" placeholder={BuyerRate.toString() + " BNB" } onChange={handleOnChange}/>
              <div>{Token_In_Wei} BNB is Equal To : {Token_Amount} TFC</div>
              <div>Your Wallet Current Balance Is : {Current_Balance}</div>
              <div className='text-danger'><strong>{Buyer_Text_Condition}</strong></div>
            </div>
        </div>
        
        <div className="row my-3">
            <div className="col" style={{width:'33%'}}>
            </div>
            <div className="col my-2" style={{width:'33%'}}>
                <button disabled={Buyer_Condition===true} className="btn btn-primary" onClick={Presale} style={{width: '100%'}}>Buy TFC</button>
            </div>
            <div className="col" style={{width:'33%'}}>
            </div>
        </div>
        <div className="row" style={{textAlign: 'center'}}><strong>{Minvalue.toString() + ' / ' + 50000}</strong></div>
        <div className="row">
          <div className="progress">
            <div className="progress-bar bg-light text-dark" role="progressbar" style={{width: '25%', textAlign: 'right'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100.1">25% |</div>
            <div className="progress-bar bg-light text-dark" role="progressbar" style={{width: '25%', textAlign: 'right'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100.1">50% |</div>
            <div className="progress-bar bg-light text-dark" role="progressbar" style={{width: '25%', textAlign: 'right'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100.1">75% |</div>
            <div className="progress-bar bg-light text-dark" role="progressbar" style={{width: '25%', textAlign: 'right'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100.1">100% |</div>
          </div>
        </div>
        <div className="row">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: (Progress.toString() + '%')}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100.1">{Progress.toString() + '%'}</div>
          </div>
        </div>
        <div className="row" style={{textAlign: 'center'}}><strong>{Progress.toString() + '%' + ' / ' + 100 + '%'}</strong></div>
        <br />
      </div>
    </div>
  )
}
