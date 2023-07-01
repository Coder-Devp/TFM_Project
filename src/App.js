//http://192.168.43.53:3000/
import './App.css';
import { useState, useEffect } from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, bscTestnet } from 'wagmi/chains'

import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'


import { getContract } from 'viem';

// TFM Contract Address : 0x0a50a5382f271e712b6dfDD15f15D74699393FDC
import { useAccount, useContractRead, useContractReads } from 'wagmi';

import ConfigurationABI from './contract/TFMToken.json';
import D_ConfigurationABI from './contract/DateTimeContract.json';

import Navbar from './component/Navbar';
import Airdrop from './component/Airdrop';
import Presale from './component/Presale';
import Token from './component/Token';
import Client from './component/Client';
import Signup from './component/Signup';
import Withdrawl from './component/Withdrawl';

/*
export const ganache = {
  id: 1337,
  name: 'Ganache',
  network: '5777',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['HTTP://127.0.0.1:7545'] },
    default: { http: ['HTTP://127.0.0.1:7545'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    multicall3: {
      address: '0x464bFb52175310C0F002928C6379D6CCb212F3D5',
      blockCreated: 1662,//11_907_934,
    },
  },
}
*/
//const Contract_Address = ConfigurationABI.networks[5777].address;

//-------------------------------------------------------------------------------------
const chains = [bscTestnet]//arbitrum, mainnet, polygon]
const projectId = 'c065eb8f219639a38a0d00ba3531f2e7'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const publicClients = createPublicClient({
  chain: bscTestnet,
  transport: http()
})

const walletClient = createWalletClient({
  chain: bscTestnet,
  transport: custom(window.ethereum)
})

// JSON-RPC Account
//const [account] = await walletClient.getAddresses()
// Local Account
//const account = privateKeyToAccount(...)

//--------------------------------------------------------------------------------------

/*
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient();
return (
  <QueryClientProvider client={queryClient}>
    <YourCode/>
  </QueryClientProvider>
)
*/

//--------------------------------------------------------------------------------------

const TFM_Contract = {
  address: ConfigurationABI.address,
  abi: ConfigurationABI.abi,
}

const D_Contract = {
  address: D_ConfigurationABI.address,
  abi: D_ConfigurationABI.abi,
}

const contract = getContract({
  address: ConfigurationABI.address,
  abi: ConfigurationABI.abi,
  ethereumClient,//publicClient,
});


const Check_Userid_Login = async(addresss, SetUser_Address_Render, SetAddress_Exist) => {
  const Check_User_Address = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Check_Userid',
    args: [addresss],
  });
  console.log('userid is : ' + Check_User_Address);
  if (Check_User_Address === false){
    //setaddress_t_o_fs(false);
    SetAddress_Exist(false);
    SetUser_Address_Render(true);
    console.log("Address Doesn't Exist!...");
  }
  else {
    //setaddress_t_o_fs(true);
    SetAddress_Exist(true);
    SetUser_Address_Render(true);
    console.log("Address Does Exist!...");
  }
}

function Login_Area(props) {

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  //const [address_t_o_f, setaddress_t_o_f] = useState(false);
  const [User_Address_Render, SetUser_Address_Render] = useState(false);
  const [Address_Exist, SetAddress_Exist] = useState(false);

  const [Render, SetRender] = useState(false);
  const [Disconnect_Render, SetDisconnect_Render] = useState(false)
  /*const [Disconnect_Render, SetDisconnect_Render] = useState(() => {
    if (isDisconnected === true){
      return false;
    }
    else if (isDisconnected === false){
      return true;
    }
  });*/
  
  let Message = '';

  if (isConnecting === true || isDisconnected === true){
    if (Disconnect_Render === false){
      SetUser_Address_Render(false);
      SetAddress_Exist(false);
      SetRender(false);

      console.log('1__User_Address_Render is : ' + User_Address_Render);
      console.log('1__Address_Exist is : ' + Address_Exist);
      console.log('1__Render is : ' + Render);

      SetDisconnect_Render(true);
    }
  }

  console.log('http : ');
  console.log(http);
  //console.log(bscTestnet);
  console.log('address is : ' + address);
  if (address !== undefined){
    if (Render === false){
      console.log('undefined is No and address is : ' + address);
      Check_Userid_Login(address, SetUser_Address_Render, SetAddress_Exist);
      /*let Check_User_Address = publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Check_Userid',
        args: [address],
      });
      console.log(Check_User_Address);
      setaddress_t_o_f(Check_User_Address);
      SetUser_Address_Render(Check_User_Address);
      */
     SetRender(true);
    }    
  }

  const [Air, setAir] = useState(null);
  const [Pre, setPre] = useState(null);
  const [Tok, setTok] = useState(null);
  const [Cli, setCli] = useState(null);
  const [With, setWith] = useState(null);


  const Click_Airdrop = () => {
    if (Air === 'show')
    {
      setAir(null);
      setPre(null);
      setTok(null);
      setCli(null);
      setWith(null);
    }
    else {
      setAir('show');
      setPre(null);
      setTok(null);
      setCli(null);
      setWith(null);
    }
  }
  const Click_Presale = () => {
    if (Pre === 'show'){  
      setPre(null);
      setAir(null);
      setTok(null);
      setCli(null);
      setWith(null);
    }
    else {
      setPre('show');
      setAir(null);
      setTok(null);
      setCli(null);
      setWith(null);
    }
  }
  const Click_Token = () => {
    if (Tok === 'show'){  
      setTok(null);
      setPre(null);
      setAir(null);
      setCli(null);
      setWith(null);
    }
    else {
      setTok('show');
      setPre(null);
      setAir(null);
      setCli(null);
      setWith(null);
    }
  }
  const Click_Client = () => {
    if (Cli === 'show'){  
      setTok(null);
      setPre(null);
      setAir(null);
      setCli(null);
      setWith(null);
    }
    else {
      setCli('show');
      setTok(null);
      setPre(null);
      setAir(null);
      setWith(null);
    }
  }
  const Click_Withdrawl = () => {
    if (With === 'show'){  
      setWith(null);
      setTok(null);
      setPre(null);
      setAir(null);
      setCli(null);
    }
    else {
      setWith('show');
      setCli(null);
      setTok(null);
      setPre(null);
      setAir(null);
    }
  }
  

  /*
  if (isDisconnected) return (
    <>
      <div className='container'>
        <br />
        <div className="row" style={{textAlign: 'center'}}>
        </div>
        <div className="row">
            <div className="container text-light" style={{backgroundColor: '#222f49'}} >
                <div className="mx-2 my-2" style={{textAlign: 'center'}}>
                    <h2><strong>Login Area</strong></h2>
                </div>
                <div className="container mx-3 my-3">
                    <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                        <label style={{color: 'red'}}><strong>{Message}</strong></label>
                    </div>
                    <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                        <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                        <div className="col my-2" style={{width: '33%', textAlign: 'left'}}>
                          <Web3Button/>
                          
                        </div>
                        <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
    </>
  );
  else if (isConnected) return (
    <>
      <div>Connected</div>
    </>
  )
  */

  return (
    <>
      {
        isDisconnected ? (
          <div className='container'>
            <br />
            <div className="row" style={{textAlign: 'center'}}>
            </div>
            <div className="row">
                <div className="container text-light" style={{backgroundColor: '#222f49'}} >
                    <div className="mx-2 my-2" style={{textAlign: 'center'}}>
                        <h2><strong>Login Area</strong></h2>
                    </div>
                    <div className="container mx-3 my-3">
                        <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                            <label style={{color: 'red'}}><strong>{Message}</strong></label>
                        </div>
                        <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                            <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                            <div className="col my-2" style={{width: '33%', textAlign: 'left'}}>
                              <Web3Button/>                    
                            </div>
                            <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ) : isConnecting ? (
          <div>Connecting... IF For SomeReason it's still Loading... You Should Reload Your Page</div>           
        ) : isConnected && User_Address_Render === false ? (
          <div>Wait SomeSecond, it's still Loading!... Maybe Check Your Internet Connection Speed!...</div>
        ) : isConnected && User_Address_Render === true && Address_Exist === false? (
          <div>You Havn't Signed Up Yet!...</div>
        ) : isConnected && User_Address_Render === true && Address_Exist === true? (
          <div>
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Rays</a>
                    <a className='navbar-brand' id='clock' href='#'>Time</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link" onClick={Click_Client}>Client</button>
                            </li>
                            <li className="nav-item"> 
                                <button className="nav-link" onClick={Click_Token}>Token</button>
                            </li>
                            <li className="nav-item"> 
                                <button className="nav-link" onClick={Click_Withdrawl}>Withdrawl</button>
                            </li>
                            <li>
                              <Web3Button/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />
            <div className='text-white' style={{backgroundColor: '#222f49'}}>
              <h1 className='my-3 mx-3' style={{textAlign:'center'}}>TCC Coin</h1>
              <div className="container">
                <div className="row">
                  <div className="col" style={{textAlign: 'right'}}>
                    <button className="btn btn-primary" onClick={Click_Airdrop} style={{width: '60%'}}>AirDrop</button>
                  </div>
                  <div className="col" style={{textAlign: 'left'}}>
                    <button className="btn btn-primary" onClick={Click_Presale} style={{width: '60%'}}>Pre-Sale</button>
                  </div>
                </div>
              </div>
              <br />
            </div>
            <br />
            <br />
            <div id="A_Root">
              {
                Air === 'show' ? (
                  <Airdrop TFM_Contract={TFM_Contract} D_Contract={D_Contract} publicClients={publicClients} walletClient={walletClient} color={props.color}/>
                ) : Pre === 'show' ? (
                  <Presale TFM_Contract={TFM_Contract} D_Contract={D_Contract} publicClients={publicClients} walletClient={walletClient} color={props.color}/>
                ) : Tok === 'show' ? (
                  <Token TFM_Contract={TFM_Contract} publicClients={publicClients} color={props.color}/>
                ) : Cli === 'show' ? (
                  <Client TFM_Contract={TFM_Contract} publicClients={publicClients} color={props.color}/>
                ) : With === 'show' ? (
                  <Withdrawl TFM_Contract={TFM_Contract} D_Contract={D_Contract} publicClients={publicClients} walletClient={walletClient} color={props.color}/>
                ) : (
                  <Client TFM_Contract={TFM_Contract} publicClients={publicClients} color={props.color}/>
                )
              }
            </div>
          </div>
        ) : (
          <></>
        )

      }
    </>
  )

  //return <Web3Button/>
}


const SignUp_Check = async(SetSponser, SetMessage, SetDisable) => {
 
  let url = document.URL;

  var eth_regex = /^0x[a-fA-F0-9]{40}$/g; // Ethereum (ETH) Wallet Address Regex in javascript
  let url_equal = url.split('=');
  let sponser_add = url_equal[1];

  console.log('sponser Address is : ' + sponser_add);
  let t_or_f_regex = eth_regex.test(sponser_add);
  console.log(t_or_f_regex);

  if (t_or_f_regex === true){   
    
    //let add = await contractins.methods.Check_Userid(sponser_add).call();
    let add = await publicClients.readContract({
      address: TFM_Contract.address,
      abi: TFM_Contract.abi,
      functionName: 'Check_Userid',
      args: [sponser_add],
    });
    console.log('Sponser Address exist is : ' + add);
    
    //let Airdrop = await contractins.methods.Airdrop_Address().call();
    //let Presale = await contractins.methods.Presale_Address().call();

    let Airdrop = await publicClients.readContract({
      address: TFM_Contract.address,
      abi: TFM_Contract.abi,
      functionName: 'Airdrop_Address',
    });
    let Presale = await publicClients.readContract({
      address: TFM_Contract.address,
      abi: TFM_Contract.abi,
      functionName: 'Presale_Address',
    });

    
    if (sponser_add === Airdrop){
        SetMessage("You Can't Sign Up Using Airdrop Address As Sponser Address!");
        SetDisable(true);
    }
    else if (sponser_add === Presale){
        SetMessage("You Can't Sign Up Using Presale Address As Sponser Address");
        SetDisable(true);
    }
    else if (add === false){
        SetMessage("Sponser Doesn't Exist");
        SetDisable(true);
    }
    else {
        SetSponser(sponser_add);
        SetDisable(false);
    }
    
    //console.log('Sponser Address Exist is : ' + add);
    //SetSponser(sponser_add);
    
  }
  else {
    SetMessage('Invaild Sponser Wallet Address!');
    SetDisable(true);
  } 
  
}

const Signup_Connected = async(TextAddress, address, SetMessage, Sponser) => {
  console.log('Text Address Is : ' + TextAddress);
  console.log('Connected Address is : ' + address);

  let Airdrop = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Airdrop_Address',
  });
  let Presale = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Presale_Address',
  });

  console.log('Airdrop Address is : ' + Airdrop);
  console.log('Presale Address is : ' + Presale);

  //let signed_up_or_not = await props.contractinstance.methods.Check_Userid(add).call();
  let signed_up_or_not = await publicClients.readContract({
    address: TFM_Contract.address,
    abi: TFM_Contract.abi,
    functionName: 'Check_Userid',
    args: [address],
  });

  console.log('Your Address Is ' + address);
  console.log('Your Logged Address does Exist is : ' + signed_up_or_not);
  
 
  if (address === Airdrop || TextAddress === Airdrop){
      SetMessage("You Can't Sign Up As Airdrop Address!. So DisConnect Your Connected Address And Try Again!...");
  }
  else if (address === Presale || TextAddress === Presale){
      SetMessage("You Can't Sign Up As Presale Address!. So DisConnect Your Connected Address And Try Again!...");
  }
  else if (signed_up_or_not === true){
      if (TextAddress === address){
        SetMessage("You Have Already Signed Up!. So DisConnect Your Connected Address And Try Again!...");
      }
      else{
        SetMessage("This Address Has Already Signed Up!. So DisConnect Your Connected Address And Try Again!...")
      }
  }
  else if (signed_up_or_not === false){
      
      if (TextAddress === address){
          SetMessage('');
          if (address !== Sponser){ 
              //const account = address;
              SetMessage(Sponser + '  ||  ' + address + '  ||  ' + TextAddress);
              //await props.contractinstance.methods.Sign_Up(Sponser, add).send({from: add, value: '00263138'});//'00100'});
              const { request } = await publicClients.simulateContract({
                address: TFM_Contract.address,
                abi: TFM_Contract.abi,
                functionName: 'Sign_Up',
                args: [Sponser, address],
                account: address,
                value: '00263138',
              });
              console.log('Request : ');
              console.log(request);
              let request_condition = false;
              if (request_condition === false){
                let request_writeContract = await walletClient.writeContract(request);
                console.log("Request Write Contract : ");
                console.log(request_writeContract);
                
                request_condition = true;
              }
              SetMessage('Sign Up Successfully!');
          }
          else{
              SetMessage("You Can't Sponser Yourself!. So DisConnect Your Connected Address And Try Again!...");
          }
      }
      else {
        SetMessage("Your Written Address Didn't Match With Your Connected Address!. So DisConnect Your Connected Address And Try Again!...");
      }
      
  }
  else {
      SetMessage("This Isn't Your Address!. So DisConnect Your Connected Address And Try Again!...");
  }
  
}

function SignUp_Area(props) {
  
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  const [TextAddress, SetTextAddress] = useState('');
  const [Sponser, SetSponser] = useState('');
  const [Message, SetMessage] = useState('');
  const [Disable, SetDisable] = useState(true);
  const [Render, SetRender] = useState(false);

  const [ConnectRender, SetConnectRender] = useState(false);
  const [DisConnectRender, SetDisConnectRender] = useState(false);

  const [Show_Connect_Wallet, SetShow_Connect_Wallet] = useState(false);

  
  if (Render === false){
    SignUp_Check(SetSponser, SetMessage, SetDisable);
    SetRender(true);
  }

  console.log('address is : ' + address);
  console.log('isConnected : ' + isConnected);
  console.log('isConnecting : ' + isConnecting);
  console.log('isDisconnected : ' + isDisconnected);

  if (isConnected === true){
    if (ConnectRender === false){
      Signup_Connected(TextAddress, address, SetMessage, Sponser);

      SetDisConnectRender(false);

      SetConnectRender(true);
    }
  }
  if (isDisconnected === true){
    if (DisConnectRender === false){
      SetMessage('');
      if (TextAddress !== null){
        //document.getElementById('input_text').value = '';
      }
      SetTextAddress('');
      SetConnectRender(false); 

      SetShow_Connect_Wallet(false);

      SetDisConnectRender(true);
    }
  }
  
  const Input_OnChange = (event) => {
    let text_val = event.target.value;
    SetTextAddress(text_val);

    var eth_regex = /^0x[a-fA-F0-9]{40}$/g;
    let t_or_f_regex = eth_regex.test(text_val);
    console.log(t_or_f_regex);

    if (t_or_f_regex === true){
      if (text_val === Sponser){
        SetShow_Connect_Wallet(false);
        SetMessage("You Can't Write Your Sponser Wallet");
      }
      else {
        SetShow_Connect_Wallet(true);
        SetMessage('');
      }
    }
    else {
      SetMessage("Wrong Address");
      SetShow_Connect_Wallet(false);
    }

  }

  /*
  const Click_SignUp = async() => {
    console.log('Text Address Is : ' + TextAddress);

    //let addd = await props.web3.eth.getAccounts(); // later I Have to Implement Connectweb3modal function
    //let add = addd[0];

    //let Airdrop = await props.contractinstance.methods.Airdrop_Address().call();
    //let Presale = await props.contractinstance.methods.Presale_Address().call();

    //let signed_up_or_not = await props.contractinstance.methods.Check_Userid(add).call();
    //console.log('Your Address Is ' + add);
    if (add === Airdrop || TextAddress === Airdrop){
        SetMessage("You Can't Sign Up As Airdrop Address");
    }
    else if (add === Presale || TextAddress === Presale){
        SetMessage("You Can't Sign Up As Presale Address");
    }
    else if (signed_up_or_not === true){
        if (TextAddress === add){
            SetMessage("You Have Already Signed Up!");
        }
        else{
            SetMessage("This Address Has Already Signed Up!")
        }
    }
    else if (signed_up_or_not === false){

        if (TextAddress === add){
            SetMessage('');
            if (add !== Sponser){ 
                SetMessage(Sponser + '  ||  ' + add + '  ||  ' + TextAddress);
                console.log(props.contractinstance);
                await props.contractinstance.methods.Sign_Up(Sponser, add).send({from: add, value: '00263138'});//'00100'});
                SetMessage('Sign Up Successfully!');
            }
            else{
                SetMessage("You Can't Sponser Yourself!");
            }
        }

    }
    else {
        SetMessage("This Isn't Your Address!");
    }
    
  }
  */
   
  
  return (
    <div className='container'>
        <br />
        <div className="row" style={{textAlign: 'center'}}>
        </div>
        <div className="row">
            <div className="container text-light" style={{backgroundColor: props.color}} >
                <div className="mx-2 my-2" style={{textAlign: 'center'}}>
                    <h2><strong>Sign Up Area</strong></h2>
                    <div style={{textAlign: 'center'}}>Your Wallet Address </div>
                </div>
                <div className="container mx-3 my-3">
                    <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                        <input id='input_text' disabled={Disable===true} type="address" onChange={Input_OnChange}/>
                    </div>
                    <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                        <label style={{color: 'red'}}>{Message}</label>
                    </div>
                    <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                        <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                        <div className="col my-2" style={{width: '33%', textAlign: 'left'}}>
                          {
                            Show_Connect_Wallet === true || isConnected === true ? (//TextAddress !== '' ? (
                              <Web3Button/>  
                            ) : (
                              <></>//<div className='btn btn-primary' disabled={dis===true}>Please Type Your Address</div>
                            ) 
                          }                     
                        </div>
                        <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


function App() {

  
  const [Message, SetMessage] = useState('');
  const [LoginForm, SetLoginForm] = useState(true);
  const [SignUp_Form, SetSignUp_Form] = useState(false);
  const [Wrong_Link_Form, SetWrong_Link_Form] = useState(false);
  const [Render, SetRender] = useState(false);
  
  const [Error_Text, SetError_Text] = useState('');

  /*
  const { data: total_supply, isError, isLoading } = useContractRead({
    address: ConfigurationABI.address,//'0x0a50a5382f271e712b6dfDD15f15D74699393FDC',
    abi: ConfigurationABI,
    functionName: 'gettotalsupply',
  })
  console.log('Total Supply Is : ' + Number(total_supply));
  */
  /*
  useEffect(() => {
    console.log(total_supply)
  }, [total_supply])
  */

  
  

  /*
  const Click_Login = async() => {

    // this one i usualy use
    let addd = await web3.eth.getAccounts(); // later I Have to Implement Connectweb3modal function
    let add = addd[0];
    console.log('Your Address Is ' + add);
    let check_add = await contract.methods.Check_Userid(add).call();

    if (check_add === true){
      SetWallet_Address(add);
      SetLoginForm(false);
    }
    else {
      SetMessage("You Haven't Signed Up Yet!");
      SetLoginForm(true);
    }

    
    
  }  
  */
  
  let url = document.URL;
  console.log(url);

  if (Render === false) {
    if (url === 'https://coder-devp.github.io/TFM_Project/'){//url === 'http://localhost:3000' || url === 'http://localhost:3000/') {
      SetWrong_Link_Form(false);
      SetSignUp_Form(false);
    }
    else if ( url !=='https://coder-devp.github.io/TFM_Project/'){//url !== 'http://localhost:3000' || url !== 'http://localhost:3000/'){
      let url_r = url.split('0x');
      console.log(url_r[0]);
      if (Render === false){
        if (url_r[0] === 'https://coder-devp.github.io/TFM_Project/reffer?r='){//'http://localhost:3000/reffer?r='){        
          SetSignUp_Form(true);
          SetWrong_Link_Form(false);
          SetRender(true);
        }
        else{
          SetError_Text('Invalid URL');
          SetWrong_Link_Form(true);
          SetSignUp_Form(false);
          SetRender(true);
        }
      }
    }
    SetRender(true);
  }

  
  

  console.log("Sign Up Form Is : "+ SignUp_Form);
  console.log("Wrong Link Form Is : " + Wrong_Link_Form);
  const color = '#222f49';//'rgb(40, 150, 150)';        
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
          { 
            SignUp_Form === false && Wrong_Link_Form === false ? (
              <Login_Area color={color}/>
            ) : SignUp_Form === true && Wrong_Link_Form === false ? (
              <SignUp_Area color={color}/>
            ) : (
              <>
                <div>Wrong URL</div>
              </>
            )
          }
      </WagmiConfig>
      
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

    </>
  );
}

export default App;

