import React, { useState } from 'react'
import { useAccount, useContractRead, useContractReads } from 'wagmi';
//import { formatEther } from 'viem';

var Web3 = require('web3');

//--------------------------------------------------------------------

/*
function Token_TotalSupply(props) {

    const {data, isError, isLoading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'gettotalsupply',
    });

    console.log(data);
    console.log('error is : ' + isError);
    console.log('is Loading is : ' + isLoading);
    const TotalSupply = formatEther(data);


    return (
        <>
        <div className="col">Total Supply: </div>
        <div id='total_supply' className="col">{isLoading ? <p>Loading...</p> : TotalSupply + ' TFC'}</div>
        </>
    );
}

function Token_Decimals(props) {

    const {data, isError, isLoading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'getdecimals',
    })
    console.log(Number(data));
    const Decimals = Number(data);

    return (
        <>
            <div className="col">Decimals: </div>
            <div id='decimals' className="col">{isLoading ? <p>Loading...</p> : Decimals}</div>
        </>
    );
}

function Token_Symbol(props) {

    const {data, isError, isLoading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'getsymbol',
    })
    console.log('SYMbol IS : ' + data);
    const Symbol = data;

    return (
        <>
            <div className="col">Token Symbol: </div>
            <div id='token_symbol' className="col">{isLoading ? <p>Loading...</p> : Symbol}</div>
        </>
    );
}
*/

//--------------------------------------------------------------------
/*
function Contract_Address_And_Balance(props) {

    const Con_Address = props.TFM_Contract.address;
    console.log('Contract Address Is : ' + Con_Address);

    const {data, isError, isLoading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Con_Address],
    })
    let Contract_Balance = 0;
    if (!isLoading){
        Contract_Balance = formatEther(data);
    }

    const Click_Copy_Contract_Address = () => {
        navigator.clipboard.writeText(Con_Address);
    }

    return (
        <>  
            <div className="row">
                <div className="col">Contract Address: </div>
                <div id='contract_address'className="col">{Con_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Contract_Address}>C</button></div>
            </div>
            <div className="row">
                <div className="col">Contract Address Balance: </div>
                <div id='contract_balance'className="col">{isLoading ? <p>Loading...</p> : Contract_Balance + ' TFC'}</div>
            </div>
        </>
    );
}

function Admin_Address_And_Balance(props) {

    const {data: admin, isError: admin_error, isLoading: admin_loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'Admin',
    });

    let Admin_Address = '';
    if (!admin_loading){
        Admin_Address = admin;
        console.log('Admin Address Is : ' + Admin_Address);
    }

    let Admin_Balance = 0;
    const {data: balance, isError: balance_error, isLoading: balance_loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Admin_Address]
    });

    if (!balance_loading){ 
        console.log('Admin Balance Is : ' + balance);
        if (!balance_error){
            Admin_Balance = formatEther(balance);
        }
        else {
            console.log('Error While Trying to Retrive Balance!');
        }
    }
    

    const Click_Copy_Admin_Address = () => {
        navigator.clipboard.writeText(Admin_Address);
    }

    return (
        <>  
            <div className="row">
                <div className="col">Admin Address: </div>
                <div id='admin_address'className="col">{admin_loading ? <p>Loading...</p> : Admin_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Admin_Address}>C</button></div>
            </div>
            <div className="row">
                <div className="col">Admin Address Balance: </div>
                <div id='admin_balance'className="col">{admin === '' ? <p>...</p> : balance_loading ? <p>Loading...</p> : Admin_Balance + ' TFC'}</div>
            </div>
        </>
    );
}

function Airdrop_Address_And_Balance(props) {

    const {data: airdrop, isError: airdrop_error, isLoading: airdrop_loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'Airdrop_Address',
    })

    let Airdrop_Address = '';
    if (!airdrop_loading){
        Airdrop_Address = airdrop;
        console.log('Airdrop Address Is : ' + Airdrop_Address);
    }

    let Airdrop_Balance = 0;
    const {data: balance, isError: balance_error, isLoading: balance_loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Airdrop_Address],
    });

    
    if (!balance_loading){ 
        console.log('Airdrop Balance Is : ' + balance);
        if (!balance_error){
            Airdrop_Balance = formatEther(balance);
        }
        else {
            console.log('Error While Trying to Retrive Balance!');
        }
    }

    const Click_Copy_Airdrop_Address = () => {
        navigator.clipboard.writeText(Airdrop_Address);
    }

    return (
        <>
            <div className="row">
                <div className="col">Airdrop Address: </div>
                <div id='airdrop_address'className="col">{airdrop_loading ? <p>Loading...</p> : Airdrop_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Airdrop_Address}>C</button></div>
            </div>
            <div className="row">
                <div className="col">Airdrop Address Balance: </div>
                <div id='airdrop_balance'className="col">{Airdrop_Address === '' ? <p>...</p> : balance_loading ? <p>Loading...</p> : Airdrop_Balance + ' TFC'} </div>
            </div>
        </>
    );
}

function Presale_Address_And_Balance(props) {

    const {data: presale, isError: presale_error, isLoading: presale_loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'Presale_Address',
    })

    let Presale_Address = '';
    if (!presale_loading){
        Presale_Address = presale;
        console.log('Presale Address Is : ' + Presale_Address);
    }

    let Presale_Balance = 0;
    const {data: balance, isError: balance_error, isLoading: balance_loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Presale_Address],
    });

    if (!balance_loading){ 
        console.log('Presale Balance Is : ' + balance);
        if (!balance_error){
            Presale_Balance = formatEther(balance);
        }
        else {
            console.log('Error While Trying to Retrive Balance!');
        }
    }


    const Click_Copy_Presale_Address = () => {
        navigator.clipboard.writeText(Presale_Address);
    }

    return (
        <>
            <div className="row">
                <div className="col">Presale Address: </div>
                <div id='presale_address'className="col">{presale_loading ? <p>Loading...</p> : Presale_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Presale_Address}>C</button></div>
            </div>
            <div className="row">
                <div className="col">Presale Address Balance: </div>
                <div id='presale_balance'className="col">{Presale_Address === '' ? <p>...</p> : balance_loading ? <p>Loading...</p> : Presale_Balance + ' TFC'} </div>
            </div>
        </>
    );
}
*/

//--------------------------------------------------------------------
/*
function Contract_Total_Id_Count(props) {

    const {data, isError: error, isLoading: loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'Total_Id_Count',
    });
    let Total_Id_Count = 0;
    if (!loading){
        console.log('Total_Id_Count : ' + data);
        Total_Id_Count = Number(data);
    }

    return (
        <>
            <div className="col">Total Id Count: </div>
            <div id='token_symbol' className="col">{loading ? <p>Loading...</p> : Total_Id_Count}</div>
        </>
    );
}

function Your_Address_And_Balance(props) {

    const Your_Address = props.address;
    console.log('Contract Address Is : ' + Your_Address);

    const {data, isError: error, isLoading: loading} = useContractRead({
        address: props.TFM_Contract.address,
        abi: props.TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Your_Address],
    });

    let Your_Balance = 0;
    if (!loading){
        console.log('Your Balance Is : ' + data);
        Your_Balance = formatEther(Number(data));
    }

    return (
        <>  
            <div className="row">
                <div className="col my-2">Your Address: </div>
                <div id='your_address'className="col">{Your_Address}</div>
            </div>
            <div className="row">
                <div className="col">Your Balance: </div>
                <div id='your_balance' className="col">{loading ? <p>Loading...</p> : Your_Balance + ' TFC'}</div>
            </div>
        </>
    );
}
*/


const Total_Value = async(TFM_Contract, publicClients, SetTotalSupply, SetSymbol, SetDecimals, SetCon_Address, SetContract_Balance, SetAdmin_Address, SetAdmin_Balance, SetAirdrop_Address, SetAirdrop_Balance, SetPresale_Address, SetPresale_Balance, SetTotal_Id_Count, Your_Address, SetYour_Balance) => {
    
    //--------------------------------------------------

    const total_supply = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'gettotalsupply',
    });
    console.log(Web3.utils.fromWei(total_supply.toString()));
    
    const symbol = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getsymbol',
    })
    console.log('SYMbol IS : ' + symbol);

    const decimal = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getdecimals',
    })
    console.log(Number(decimal));

    //--------------------------------------------

    const Con_Address = TFM_Contract.address;
    console.log('Contract Address Is : ' + Con_Address);

    const Contract_Balance = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Con_Address],
    });

    console.log('Contract Address : ' + Con_Address);
    console.log('Contract Address Balance : ' + Web3.utils.fromWei(Contract_Balance.toString()));

    //----

    const Admin_Address = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Admin',
    });

    const Admin_Balance = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Admin_Address]
    });
    
    console.log('Admin Address : ' + Admin_Address);
    console.log('Admin Address Balance : ' + Web3.utils.fromWei(Admin_Balance.toString()));

    //----

    const Airdrop_Address = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Airdrop_Address',
    });

    const Airdrop_Balance = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Airdrop_Address],
    });

    console.log('Airdrop Address : ' + Airdrop_Address);
    console.log('Airdrop Address Balance : ' + Web3.utils.fromWei(Airdrop_Balance.toString()));

    //----

    const Presale_Address = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Presale_Address',
    });

    const Presale_Balance = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Presale_Address],
    });
    
    console.log('Presale Address : ' + Presale_Address);
    console.log('Presale Address Balance : ' + Web3.utils.fromWei(Presale_Balance.toString()));

    //--------------
    
    const Total_Id_Count = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Total_Id_Count',
    });

    console.log('Total Id Count : ' + Number(Total_Id_Count));

    const Your_Balance = await publicClients.readContract({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [Your_Address],
    });

    console.log('Your Balance : ' + Web3.utils.fromWei(Your_Balance.toString()));

    //-------------------------

    SetTotalSupply(Web3.utils.fromWei(total_supply.toString()));
    SetSymbol(symbol);
    SetDecimals(Number(decimal));

    SetCon_Address(Con_Address);
    SetContract_Balance(Web3.utils.fromWei(Contract_Balance.toString()));
    
    SetAdmin_Address(Admin_Address);
    SetAdmin_Balance(Web3.utils.fromWei(Admin_Balance.toString()));

    SetAirdrop_Address(Airdrop_Address);
    SetAirdrop_Balance(Web3.utils.fromWei(Airdrop_Balance.toString()));

    SetPresale_Address(Presale_Address);
    SetPresale_Balance(Web3.utils.fromWei(Presale_Balance.toString()));


    SetTotal_Id_Count(Number(Total_Id_Count));
    SetYour_Balance(Web3.utils.fromWei(Your_Balance.toString()));
}

/*
const Token_Details_Value = async(TFM_Contract, settotal_supply, settoken_symbol, setdecimals, setcontract_address, setcontract_balance, setadmin_address, setadmin_bal, setairdrop_address, setairdrop_bal, setpresale_address, setpresale_bal, setTotal_Id_Count, your_address, setyour_balance) => {
    
    const { data: total_supply, isSuccess: success} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'gettotalsupply',
    })
    console.log('total supply is success is ' + success);
    settotal_supply(total_supply);//web3.utils.fromWei(total_supply).toString()); 
    console.log('Total Supply Is : ' + total_supply);
    
    
    const { data, error, isError, isLoading, isFetched, isFetchedAfterMount, isSuccess, isRefetching} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getsymbol',
        onSuccess(data) {
            settoken_symbol(data);
            console.log('Symbol Is : ' + data);
        },
        onError(err){
            console.log('error: ' + err);
        },
        onSettled(data, error) {
            console.log('Settled', { data, error });
        },
    })
    console.log('data or symbol is : ' + data);
    console.log('error is : ' + error);
    console.log('is error is : ' + isError);
    console.log('is loading is ' + isLoading);
    console.log('is fetched is ' + isFetched);
    console.log('is fetchedaftermount is ' + isFetchedAfterMount);
    console.log('is success is ' + isSuccess);
    console.log('is refetching is ' + isRefetching);
    

    const { data: decimal} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getdecimals',
    })
    setdecimals(decimal);
    console.log('Decimals Is : ' + decimal);

    setcontract_address(TFM_Contract.address);
    console.log('Contract Address Is : ' + TFM_Contract.address);

    const { data: contract_balance} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [TFM_Contract.address],
    })
    setcontract_balance(contract_balance);
    console.log('Contract Balance Is : ' + contract_balance);

    const { data: admin} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Admin',
    })
    const { data: admin_balance} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [admin],
    })

    setadmin_address(admin);
    setadmin_bal(admin_balance);

    console.log('Admin Address Is : ' + admin);
    console.log('Admin Address Balance Is : ' + admin_balance);


    const { data: airdrop_address} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Airdrop_Address',
    })
    const { data: airdrop_address_balance} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [airdrop_address],
    })

    setairdrop_address(airdrop_address);
    setairdrop_bal(airdrop_address_balance);
    
    console.log('Airdrop Address Is : ' + airdrop_address);
    console.log('Airdrop Address Balance Is : ' + airdrop_address_balance);

    const { data: presale_address} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Presale_Address',
    })
    const { data: presale_address_balance} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [presale_address],
    })
    setpresale_address(presale_address);
    setpresale_bal(presale_address_balance);//web3.utils.fromWei(Presale_Address_Balance).toString());

    console.log('Presale Address Is : ' + presale_address);
    console.log('Presale Address Balance Is : ' + presale_address_balance);

    const { data: total_id_count} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'Total_Id_Count',
    })
    setTotal_Id_Count(total_id_count);
    console.log('Total Id Is : ' + total_id_count);

    const { data: your_address_balance} = useContractRead({
        address: TFM_Contract.address,
        abi: TFM_Contract.abi,
        functionName: 'getbalance',
        args: [your_address]
    })
    setyour_balance(your_address_balance);
    console.log('Your Address Balance Is : ' + your_address_balance);
}
*/

export default function Token(props) {
    
    const { address, isConnected, isConnecting, isDisconnected } = useAccount();

    const [Your_Address, SetYour_Address] = useState(address);
    const [TotalSupply, SetTotalSupply] = useState(0);
    const [Symbol, SetSymbol] = useState('');
    const [Decimals, SetDecimals] = useState(0);

    const [Con_Address, SetCon_Address] = useState('');
    const [Contract_Balance, SetContract_Balance] = useState(0);

    const [Admin_Address, SetAdmin_Address] = useState('');
    const [Admin_Balance, SetAdmin_Balance] = useState(0);

    const [Airdrop_Address, SetAirdrop_Address] = useState('');
    const [Airdrop_Balance, SetAirdrop_Balance] = useState(0);

    const [Presale_Address, SetPresale_Address] = useState('');
    const [Presale_Balance, SetPresale_Balance] = useState(0);

    const [Total_Id_Count, SetTotal_Id_Count] = useState(0);

    const [Your_Balance, SetYour_Balance] = useState(0);

    const [Render, SetRender] = useState(true);

    if (Render === true){
        Total_Value(props.TFM_Contract, props.publicClients, SetTotalSupply, SetSymbol, SetDecimals, SetCon_Address, SetContract_Balance, SetAdmin_Address, SetAdmin_Balance, SetAirdrop_Address, SetAirdrop_Balance, SetPresale_Address, SetPresale_Balance, SetTotal_Id_Count, Your_Address, SetYour_Balance);
        SetRender(false);
    }

    const Click_Copy_Contract_Address = () => {
        navigator.clipboard.writeText(Con_Address);
    }

    const Click_Copy_Admin_Address = () => {
        navigator.clipboard.writeText(Admin_Address);
    }
    
    const Click_Copy_Airdrop_Address = () => {
        navigator.clipboard.writeText(Airdrop_Address);
    }

    const Click_Copy_Presale_Address = () => {
        navigator.clipboard.writeText(Presale_Address);
    }

  return (
    <div className='container text-light' style={{backgroundColor: props.color}}>
      <div className='mx-3' style={{textAlign:'center'}}>
        <h1>Token Details</h1>
      </div>
      <div className="container" style={{textAlign: 'center'}}>
        <div className="row">
        </div>
        <div className="row">
            <div className="container">
                <div className="row my-2">
                    <div className="col">
                        <div className="col">Blockchain: </div>
                        <div className="col"><strong>BEP-20</strong></div>
                    </div>
                    <div className="col">
                        <div className="col">Total Supply: </div>
                        <div id='total_supply' className="col">{TotalSupply + ' TFM'}</div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <div className="col">Token Symbol: </div>
                        <div id='token_symbol' className="col">{Symbol}</div>
                    </div>
                    <div className="col">
                        <div className="col">Decimals: </div>
                        <div id='decimals' className="col">{Decimals}</div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="row my-3">
                        <div className="row">
                            <div className="col">Contract Address: </div>
                            <div id='contract_address'className="col">{Con_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Contract_Address}>C</button></div>
                        </div>
                        <div className="row">
                            <div className="col">Contract Address Balance: </div>
                            <div id='contract_balance'className="col">{Contract_Balance + ' TFM'}</div>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="row">
                            <div className="col">Admin Address: </div>
                            <div id='admin_address'className="col">{Admin_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Admin_Address}>C</button></div>
                        </div>
                        <div className="row">
                            <div className="col">Admin Address Balance: </div>
                            <div id='admin_balance'className="col">{Admin_Balance + ' TFM'}</div>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="row">
                            <div className="col">Airdrop Address: </div>
                            <div id='airdrop_address'className="col">{Airdrop_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Airdrop_Address}>C</button></div>
                        </div>
                        <div className="row">
                            <div className="col">Airdrop Address Balance: </div>
                            <div id='airdrop_balance'className="col">{Airdrop_Balance + ' TFM'} </div>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="row">
                            <div className="col">Presale Address: </div>
                            <div id='presale_address'className="col">{Presale_Address} <button className='btn btn-primary' id='copy_contract_address' style={{color: 'white'}} onClick={Click_Copy_Presale_Address}>C</button></div>
                        </div>
                        <div className="row">
                            <div className="col">Presale Address Balance: </div>
                            <div id='presale_balance'className="col">{Presale_Balance + ' TFM'} </div>
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <div className="col">Total Id Count: </div>
                        <div id='token_symbol' className="col">{Total_Id_Count}</div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="row my-3">
                        <div className="row">
                            <div className="col my-2">Your Address: </div>
                            <div id='your_address'className="col">{Your_Address}</div>
                        </div>
                        <div className="row">
                            <div className="col">Your Balance: </div>
                            <div id='your_balance' className="col">{Your_Balance + ' TFM'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
      </div>
      <br />
    </div>
  )
}
