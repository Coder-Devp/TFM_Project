import React, {useState} from 'react'
import { useAccount, useContractRead } from 'wagmi';

var Web3 = require('web3');
/*
const Withdraw_function = async(contractins, web3, timestamp, datetimestamp, address, token_in_wei, setmessage) => {
  
  let Airdrop = await contractins.methods.Airdrop_Address().call();
  let Presale = await contractins.methods.Presale_Address().call();
  //let Admin = await contractins.methods.Admin().call();

  //let airdrop_val = web3.utils.fromWei(await contractins.methods.getbalance(Airdrop).call());
  //console.log("Airdrop Balance is : " + airdrop_val);
  //let Minvalue = 25000 - airdrop_val;
  //console.log('Opposite Value Is : ' + Minvalue);

  //let available_value = 25000 - Minvalue;
  //console.log("Available value Is : " + available_value);
  //let Token_Amount = web3.utils.fromWei(token_in_wei);
  //console.log('Token Amount is : ' + Token_Amount);
  //let left_over_value = airdrop_val - Token_Amount;//available_value - Token_Amount;
  //console.log("Left Over Value Is : " + left_over_value);

  
  //if (left_over_value < 0){
  //  console.log('Airdrop Balance Amount Exceed!');
  //  setmessage('Airdrop Balance Amount Exceed!');
  //}
  //else if (left_over_value >= 0){
    //console.log("Airdrop Remaining Balance Is : " + left_over_value);
    console.log('    Timestamp Is : ' + timestamp);
    console.log('Datetimestamp Is : ' + datetimestamp);
  
    console.log(address + '  || Airdrop : ==  ' + Airdrop);
    if (address === Airdrop){
      setmessage("Airdrop Address Can't Withdraw for Itself!");
    }
    else if (address === Presale){
      setmessage("Presale Address Can't Withdraw For Itself!");
    }
    else {
  
      let getAirdropbal = await contractins.methods.getbalance(Airdrop).call();
      console.log("       Balance Of Airdrop : " + Airdrop + " is " + getAirdropbal);
      
      let getaddbal = await contractins.methods.getbalance(address).call();
      console.log("       Balance Of Account : " + address + " is " + getaddbal);
  
    
      await contractins.methods.Withdraw_TFC(address, token_in_wei, datetimestamp).send({from: address, value: '00001'});
            
      let getAirdropbal2 = await contractins.methods.getbalance(Airdrop).call();
      console.log("         Balance Of Airdrop : " + Airdrop + " is " + getAirdropbal2);
      
      let getaddbal2 = await contractins.methods.getbalance(address).call();
      console.log("       Balance Of Account : " + address + " is " + getaddbal2);
      
      console.log(web3.utils.fromWei(getAirdropbal).toString());
      console.log(web3.utils.fromWei(getAirdropbal2).toString());
      console.log(web3.utils.fromWei(getaddbal).toString());
      console.log(web3.utils.fromWei(getaddbal2).toString());  
  
      console.log(" ");
      console.log(" ");
      console.log(" ");
      
    //}
  }
  
  
  
  
}*/


const condition = async(val, Balance, SetMessage, SetDisable, SetToken_In_Wei, val_length, SetText_Color) => {
  if (val === '') {
    SetMessage('Please Enter Withdrawl TFC Amount!');
    SetDisable(true);
    SetText_Color('danger');
  }
  else {
    if (Number(val_length) > 5){
      SetMessage('Length Exceed!');
      SetDisable(true);
      SetText_Color('danger');
    }
    else {
      if (Number(val) >= 2){
        let bal_wei = Web3.utils.toWei(Balance.toString(), 'ether').toString();
        let val_wei = Web3.utils.toWei(val.toString(), 'ether').toString();
        console.log('Your Balance : ' + Balance + ' In Wei : ' + bal_wei);
        console.log('Your Written : ' + val + ' In Wei : ' + val_wei)
        
        if (Number(val_wei) > Number(bal_wei)){
          SetMessage('Your TFC Balance Amount Exceed');
          SetDisable(true);
          SetText_Color('danger');
        }
        else if (Number(bal_wei) >= Number(val_wei)){
          SetMessage(val_wei);
          SetDisable(false);
          SetToken_In_Wei(val_wei);
          SetText_Color('success');
        }
      }
      else if (Number(val) < 2){
        SetMessage('Minimum Wthdrawl Amount Is 2 TFC!');
        SetDisable(true);
        SetText_Color('danger');
      }
    }
  }
}

const Check = async(TFM_Contract, publicClients, address, SetBalance, SetMessage, SetDisable, SetText_Disable, SetText_Color) => {
  //const bal = await contractins.methods.Withdrawl_Eth(address).call();
  const bal = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Withdrawl_Eth',
    args: [address],
  });
  
  //const t_or_f = await contractins.methods.Sponser_Eth_Condition(address).call();
  const t_or_f = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Sponser_Eth_Condition',
    args: [address],
  });
  
  //const spo_count = await contractins.methods.Sponser_Count(address).call();
  const spo_count = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Sponser_Count',
    args: [address],
  });

  console.log('bal in Wei : ' + bal);
  console.log('t_or_f : ' + t_or_f);
  console.log('Sponset Count is : ' + spo_count);

  SetBalance(Web3.utils.fromWei(bal.toString()));
  
  if (t_or_f === true){
    SetMessage('');
    SetDisable(true);
    SetText_Disable(false);
    SetText_Color('success');
  }
  else {
    SetMessage('2 TFC Are Minimum Required To Withdrawl');
    SetDisable(true);
    SetText_Disable(true);
    SetText_Color('danger');
  }
  
}


const Withdraw_function = async(TFM_Contract, publicClients, walletClient, timestamp, datetimestamp, address, text_val, token_in_wei, setmessage, SetText_Color) => {
  
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


  const t_or_f = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Sponser_Eth_Condition',
    args: [address],
  });
  console.log('t_or_f : ' + t_or_f);

  let Balance = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Withdrawl_Eth',
    args: [address],
  });
  console.log('Your Current Withdrawl TFM Balance Is : ' + Balance);

  if (t_or_f === true){
    if (text_val === '') {
      setmessage('Please Enter Withdrawl TFC Amount!');
      SetText_Color('danger');
    }
    else {
      if (Number(text_val.length) > 5){
        setmessage('Length Exceed!');
        SetText_Color('danger');
      }
      else {
        if (Number(text_val) >= 2){
          let bal_wei = Web3.utils.toWei(Balance.toString(), 'ether').toString();
          let text_val_wei = Web3.utils.toWei(text_val.toString(), 'ether').toString();
          console.log('Your Balance : ' + Balance + ' In Wei : ' + bal_wei);
          console.log('Your Written : ' + text_val + ' In Wei : ' + text_val_wei);
          
          if (Number(text_val_wei) > Number(bal_wei)){
            setmessage('Your TFC Balance Amount Exceed');
            SetText_Color('danger');
          }
          else if (Number(bal_wei) >= Number(text_val_wei)){
            setmessage(text_val_wei);
            SetText_Color('success');
            
            console.log('    Timestamp Is : ' + timestamp);
            console.log('Datetimestamp Is : ' + datetimestamp);
          
            console.log(address + '  || Airdrop : ==  ' + Airdrop_Address);
            console.log(address + '  || Presale : ==  ' + Presale_Address);
            if (address === Airdrop_Address){
              setmessage("Airdrop Address Can't Withdraw for Itself!");
              SetText_Color('danger');
            }
            else if (address === Presale_Address){
              setmessage("Presale Address Can't Withdraw For Itself!");
              SetText_Color('danger');
            }
            else {
          
              const getAirdropbal = await publicClients.readContract({
                address: TFM_Contract.address,
                abi: TFM_Contract.abi,
                functionName: 'getbalance',
                args: [Airdrop_Address],
              });
              console.log("       Balance Of Airdrop : " + Airdrop_Address + " is " + getAirdropbal);
          
              const getaddbal = await publicClients.readContract({
                address: TFM_Contract.address,
                abi: TFM_Contract.abi,
                functionName: 'getbalance',
                args: [address],
              });
              console.log("       Balance Of Account : " + address + " is " + getaddbal);
          
              try {
                //await contractins.methods.Withdraw_TFM(address, token_in_wei, datetimestamp).send({from: address, value: '00001'});
                const { request } = await publicClients.simulateContract({
                  address: TFM_Contract.address,
                  abi: TFM_Contract.abi,
                  functionName: 'Withdraw_TFM',
                  args: [address, token_in_wei, datetimestamp],
                  account: address,
                  value: '00001',
                });
                console.log('Request : ');
                console.log(request);
            
                let request_writeContract = await walletClient.writeContract(request);
                console.log("Request Write Contract : ");
                console.log(request_writeContract);
              }
              catch(e){
                await Withdrawl_Failed(TFM_Contract, publicClients, setmessage, SetText_Color);
              }

              const getAirdropbal2 = await publicClients.readContract({
                address: TFM_Contract.address,
                abi: TFM_Contract.abi,
                functionName: 'getbalance',
                args: [Airdrop_Address],
              });
              console.log("         Balance Of Airdrop : " + Airdrop_Address + " is " + getAirdropbal2);
          
              const getaddbal2 = await publicClients.readContract({
                address: TFM_Contract.address,
                abi: TFM_Contract.abi,
                functionName: 'getbalance',
                args: [address],
              });
              console.log("       Balance Of Account : " + address + " is " + getaddbal2);
          
              console.log(Web3.utils.fromWei(getAirdropbal.toString()).toString());
              console.log(Web3.utils.fromWei(getAirdropbal2.toString()).toString());
              console.log(Web3.utils.fromWei(getaddbal.toString()).toString());
              console.log(Web3.utils.fromWei(getaddbal2.toString()).toString());  
          
              console.log(" ");
              console.log(" ");
              console.log(" ");
              
              setmessage(Web3.utils.fromWei(token_in_wei).toString() + ' TFM Succesfully Withdrawl!...');
              SetText_Color('success');
            }

          }

        }
        else if (Number(text_val) < 2){
          setmessage('Minimum Wthdrawl Amount Is 2 TFC!');
          SetText_Color('danger');
        }
      }
    }   
  }
  else {
    setmessage('2 TFC Are Minimum Required To Withdrawl');
    SetText_Color('danger');
  }
}

const Withdrawl_Failed = async(TFM_Contract, publicClients, setmessage, SetText_Color) => {
  //let Airdrop_Address = await contractins.methods.Airdrop_Address().call();
  const Airdrop_Address = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Airdrop_Address',
  });
  //let airdrop_bal = await contractins.methods.getbalance(Airdrop_Address).call(); 
  const airdrop_bal = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'getbalance',
    args: [Airdrop_Address],
  });
  setmessage("Transaction Failed! : Contract Doesn't Have Enough Balance! : You Can Only Withdraw " + Web3.utils.fromWei(airdrop_bal.toString()) + " TFC!");
  SetText_Color('danger');
}


//-----------Useless-Function--------------
/*
const UseWithdraw_Click = (TFM_Contract, address, Token_In_Wei, SetMessage, SetRun_Check) => {
  
  var current = new Date();
  console.log(current);
  
  let date = new Date(); 
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  var today_date = dd + "-" + mm + "-" + yy;
  var today_datetime = dd + "-" + mm + "-" + yy + " | " + h + ":" + m + ":" + s;
  console.log("    Todays Date is : " + today_date);
  console.log("Todays DateTime is : " + today_datetime);


  var newDate = new Date( yy, (mm - 1), dd);
  var Date_To_Timestamp = newDate.getTime();
  console.log('Date To TimeStamp Is : ' + Date_To_Timestamp);

  var newDateTime = new Date( yy, (mm - 1), dd, h, m, s);
  var DateTime_To_Timestamp = newDateTime.getTime();
  console.log('DateTime To TimeStamp Is : ' + DateTime_To_Timestamp);

  //const d = new Date(DateTime_To_Timestamp);
  //console.log(d.getDate() + '/' +  d.getMonth() + '/' + d.getFullYear() + '  ||||   ' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds());


    

  
  //try {
    Withdraw_function(TFM_Contract, Date_To_Timestamp, DateTime_To_Timestamp, address, Token_In_Wei, SetMessage);
    //SetRun_Check(true);        
  //}
  //catch(e){
    //Withdrawl_Failed(props.contractinstance, props.web3, SetMessage);
  //}
  
  
} 
*/


export default function Withdrawl(props) {
    const [Balance, SetBalance] = useState(0);
    const [Message, SetMessage] = useState('');
    const [Disable, SetDisable] = useState(true);
    const [Text_Disabled, SetText_Disabled] = useState(true);
    const [Token_In_Wei, SetToken_In_Wei] = useState('0');
    const [Token_Text, SetToken_Text] = useState('0');
    const [Text_Color, SetText_Color] = useState('danger');

    const [Run_Check, SetRun_Check] = useState(true);


    
    const { address, isConnected, isConnecting, isDisconnected } = useAccount();

    if (Run_Check === true){  
        Check(props.TFM_Contract, props.publicClients, address, SetBalance, SetMessage, SetDisable, SetText_Disabled, SetText_Color);
        condition(Token_Text, Balance, SetMessage, SetDisable, SetToken_In_Wei, 0, SetText_Color);
        SetRun_Check(false);
    }

    //let token_in_wei = props.web3.utils.toWei('1', 'ether').toString();


    
    const Withdraw_Click = async() => {

      
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
      const today_date_number = await props.publicClients.readContract({
        address: props.D_Contract.address,
        abi: props.D_Contract.abi,
        functionName: 'timestampFromDate',
        args: [yy, mm, dd],
      });
      //let today_datetime_number = await props.dcontract.methods.timestampFromDateTime(yy, mm, dd, h, m, s).call();
      const today_datetime_number = await props.publicClients.readContract({
        address: props.D_Contract.address,
        abi: props.D_Contract.abi,
        functionName: 'timestampFromDateTime',
        args: [yy, mm, dd, h, m, s],
      });

      console.log('    Todays Date in TimeStamp: ' + today_date_number);
      console.log('Todays DateTime in TimeStamp: ' + today_datetime_number);

      
      await Withdraw_function(props.TFM_Contract, props.publicClients, props.walletClient, today_date_number, today_datetime_number, address, Token_Text, Token_In_Wei, SetMessage, SetText_Color);
      SetRun_Check(true);        
    
            
    } 

    

    const Input_On_Change = (event) => {
      let val = event.target.value;
      let max_length = event.target.value.length;
      console.log(val);
      SetToken_Text(val);
      condition(val, Balance, SetMessage, SetDisable, SetToken_In_Wei, max_length, SetText_Color);
    }

  return (
    <div className='container text-light' style={{backgroundColor: props.color}}>
      <div className="mx-3" style={{textAlign: 'center'}}>
        <h1>Withdrawl Details</h1> 
      </div>
      <div style={{textAlign: 'center'}}>
        <div className="row"></div>
        <div className="row">
            <div className="col" style={{width: '50%', textAlign: 'right'}}>Your Balance : </div>
            <div className="col" style={{width: '50%', textAlign: 'left'}}>{Balance + '  TFM'}</div>
        </div>
        <div className="row">
          <div className={`col my-3 mx-3 text-${Text_Color}`} style={{width: '45px'}}><strong>{Message}</strong></div>
        </div>
        <div className="row">
          <div className="col" style={{textAlign: 'center'}}>
            <input disabled={Text_Disabled===true} type="number" onChange={Input_On_Change} />
          </div>
        </div>
        <br />
        <div className="row">
            <div className="col" style={{width: '33%', textAlign: 'center'}}></div>
            <div className="col" style={{width: '33%', textAlign: 'center'}}>
                <button disabled={Disable===true} className="btn btn-primary" style={{width: '70%', textAlign: 'center'}} onClick={Withdraw_Click}>Withdraw</button>
            </div>
            <div className="col" style={{width: '33%', textAlign: 'center'}}></div>
        </div>
      </div>
      <br />
    </div>
  )
}
