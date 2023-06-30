import { render } from '@testing-library/react';
import React, { useState } from 'react'


const Check = async(contractins, web3, SetSponser, SetMessage, SetDisable) => {
    /*let url = document.URL;
    const pl1 = url.split('?')[1];
    const qpl1 = new URLSearchParams(pl1);
    const refferpl = qpl1.get('r');
    console.log(pl1);
    console.log(qpl1);
    console.log(refferpl);
    let pls = pl1.split('=');
    let sponser_add = pls[1];
    */
    let url = document.URL;

    var eth_regex = /^0x[a-fA-F0-9]{40}$/g; // Ethereum (ETH) Wallet Address Regex in javascript
    let url_equal = url.split('=');
    let sponser_add = url_equal[1];

    console.log('sponser Address is : ' + sponser_add);
    let t_or_f_regex = eth_regex.test(sponser_add);
    console.log(t_or_f_regex);
  
    if (t_or_f_regex === true){
        let add = await contractins.methods.Check_Userid(sponser_add).call();
    
        let Airdrop = await contractins.methods.Airdrop_Address().call();
        let Presale = await contractins.methods.Presale_Address().call();
    
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
            SetDisable(false);
        }
        console.log('Sponser Address Exist is : ' + add);
        SetSponser(sponser_add);
    }
    else {
        SetMessage('Invaild Sponser Wallet Address!');
        SetDisable(true);
    }
}


export default function Signup(props) {

    const [TextAddress, SetTextAddress] = useState('');
    const [Sponser, SetSponser] = useState('');
    const [Message, SetMessage] = useState('');
    const [Disable, SetDisable] = useState(true);
    const [Render, SetRender] = useState(false);

    //const providerOptions = props.providerOptions;

    if (Render === false){
        Check(props.contractinstance, props.web3, SetSponser, SetMessage, SetDisable);
        SetRender(true);
    }

    const Input_OnChange = (event) => {
        SetTextAddress(event.target.value);
    }

    const Click_SignUp = async() => {
        console.log('Text Address Is : ' + TextAddress);

        let addd = await props.web3.eth.getAccounts(); // later I Have to Implement Connectweb3modal function
        let add = addd[0];

        let Airdrop = await props.contractinstance.methods.Airdrop_Address().call();
        let Presale = await props.contractinstance.methods.Presale_Address().call();

        let signed_up_or_not = await props.contractinstance.methods.Check_Userid(add).call();
        console.log('Your Address Is ' + add);
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
                        <input disabled={Disable===true} type="address" onChange={Input_OnChange}/>
                    </div>
                    <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                        <label style={{color: 'red'}}>{Message}</label>
                    </div>
                    <div className="row mx-2 my-2" style={{textAlign: 'center'}}>
                        <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                        <div className="col my-2" style={{width: '33%', textAlign: 'left'}}>
                            <button disabled={Disable===true} className="btn btn-primary" style={{width: '100%'}} onClick={Click_SignUp}>Sign Up</button>                        
                        </div>
                        <div className="col my-2" style={{width: '33%', textAlign: 'center'}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
