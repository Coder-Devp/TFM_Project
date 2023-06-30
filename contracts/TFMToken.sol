// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
//import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol 1';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TFMToken is ERC20 {
    uint256 private constant _TOTAL_SUPPLY = 200000 * (10 ** 18);

    address public Contract_Address;
    address public Admin;
    address public Airdrop_Address;
    address public Presale_Address;

    mapping(address => bool) public Check_Userid;
    uint public Total_Id_Count = 1;

    mapping(address => uint) public Withdrawl_Eth;

    mapping(address => bool) public Sponser_Eth_Condition;
    mapping(address => mapping(uint => uint)) public Sponser_Eth_Record;
    mapping(address => uint) public Sponser_Count;

    mapping(address => mapping(uint => uint)) public Total_Withdrawl_Record;
    mapping(address => mapping(uint => uint)) public Total_Withdrawl_DateTime_Record;
    mapping(address => uint) public Total_Withdrawl_Count;

    /*
    // Claim Airdrop Daily Area
    mapping(address => mapping(uint => bool)) public Today_Mint_Bool;
    mapping(address => mapping(uint => uint)) public Today_Mint_No;
    mapping(address => mapping(uint => uint)) public User_Mint_Record;
    mapping(address => uint) public Total_Mint_Count;
    */    

    mapping(address => bool) public Claim_Bool;
    mapping(address => uint) public Claim_Record;

    mapping(address => mapping(uint => bool)) public Today_Presale_Bool;
    mapping(address => mapping(uint => uint)) public Today_Presale_No;
    mapping(address => mapping(uint => uint)) public User_Presale_Record;
    mapping(address => mapping(uint => uint)) public User_Today_Presale_Amount;
    mapping(address => mapping(uint => uint)) public User_Today_Presale_Exchange_Amount;
    mapping(address => uint) public Total_Presale_Count;

    constructor(address _admin_address) ERC20("TFM", "TFM") {
        Contract_Address = address(this);

        _mint(Contract_Address, _TOTAL_SUPPLY);

        Admin = _admin_address;
        Airdrop_Address = address(0x13449135184cec10953f72e93F2b9335a7c02175);//address(bytes40("0xd228b89FC5D7D4E6A3d92df39908cod4b1c9DA89"));//;//_airdrop_address;
        Presale_Address = address(0xf9C02B9e6B17F851bc696195B40AdCA350A4f20B);//_presale_address;

        Check_Userid[Admin] = true;

        transfer_full("Contract Address Balance Amont Exceed!", Contract_Address, Airdrop_Address, (25000 * (10 ** 18)));
        transfer_full("Contract Address Balance Amont Exceed!", Contract_Address, Presale_Address, (50000 * (10 ** 18)));
    }

    function getname() public view returns(string memory){
        return name();
    }

    function getsymbol() public view returns(string memory){
        return symbol();
    }

    function getdecimals() public view returns(uint){
        return decimals();
    }

    function gettotalsupply() public view returns(uint){
        return totalSupply();
    }

    function getbalance(address _add) public view returns(uint){
        return balanceOf(_add);
    }

    function getsponser_count(address _add) public view returns(uint){
        return Sponser_Count[_add];
    }

 
    function transfer_to(address to, uint256 amount) public{
        transfer(to, amount);
    }

    function transfer_full(string memory who, address _from, address _to, uint256 _amount) public{
        //uint from_bal = getbalance(_from);
        //require(from_bal > _amount, who );
        _transfer(_from, _to, _amount);
    }

    //---------------Client_Area---------------------

    function Sign_Up(address _spo, address _add) public payable {
        uint token_value = (1 * (10 ** 18));

        uint spo_count = Sponser_Count[_spo];
        spo_count += 1;

        Withdrawl_Eth[_spo] += token_value;
        Withdrawl_Eth[_add] = token_value;

        uint spo_eth_condition = Withdrawl_Eth[_spo];

        if (spo_eth_condition >= (2 * (10 ** 18))){
            Sponser_Eth_Condition[_spo] = true;
        }
        else {
            Sponser_Eth_Condition[_spo] = false;
        }
        
        Sponser_Eth_Record[_spo][spo_count] = token_value;
        Sponser_Count[_spo] = spo_count;

        Sponser_Eth_Record[_add][1] = token_value;
        Sponser_Count[_add] = 0;

        Check_Userid[_add] = true;
        Total_Id_Count++;

    }

    /*
    function Daily_Claim_Airdrop(address _add, uint _amount, uint _datestamp, uint _datetimestamp) public payable{
        require(_add != Airdrop_Address, "Admin Can't Claim Airdrop! ");
        transfer_full("Airdrop Address Balance Amount Exceed!", Airdrop_Address, _add, _amount);
        
        uint _no = Total_Mint_Count[_add];
        uint no = _no + 1;

        Today_Mint_Bool[_add][_datestamp] = true;
        Today_Mint_No[_add][_datestamp] = no;
        Total_Mint_Count[_add] += 1;
        User_Mint_Record[_add][no] = _datetimestamp;

    }
    */

    function Once_Claim_Airdrop(address _add, uint _amount, uint _datetimestamp) public payable{
        require(_add != Airdrop_Address, "Airdrop Can't Claim Airdrop! ");

        Withdrawl_Eth[_add] += _amount;

        Claim_Bool[_add] = true;
        Claim_Record[_add] = _datetimestamp;
        
        uint sponser_tfm_amount = Withdrawl_Eth[_add];
        uint condition = (2 * (10 ** 18));
        if (sponser_tfm_amount >= condition){
            Sponser_Eth_Condition[_add] = true;
        }
        else {
            Sponser_Eth_Condition[_add] = false;
        }
    }

    function Withdraw_TFM(address _add, uint _token_amount, uint _timestamp) public payable{
        transfer_full("Airdrop Address Balance Amount Exceed!", Airdrop_Address, _add, _token_amount);
        Withdrawl_Eth[_add] -= _token_amount;

        uint no = Total_Withdrawl_Count[_add];
        no += 1;

        Total_Withdrawl_Record[_add][no] = _token_amount;
        Total_Withdrawl_DateTime_Record[_add][no] = _timestamp;
        Total_Withdrawl_Count[_add] = no;

        uint sponser_tfm_amount = Withdrawl_Eth[_add];
        uint condition = (2 * (10 ** 18));
        if (sponser_tfm_amount >= condition){
            Sponser_Eth_Condition[_add] = true;
        }
        else {
            Sponser_Eth_Condition[_add] = false;
        }

    }


    function Buy_Presale(address _add, uint _token_amount, uint _datestamp, uint _datetimestamp) public payable{
        address payable _presale_address = payable(Presale_Address);
        require(_add != _presale_address, "Presale Address Can't Buy Presale For Itself!");
        transfer_full("Presale Address Balance Amount Exceed!", _presale_address, _add, _token_amount);

        //_________Transfer_All_The_Amount_To_The_Admin__________

        address payable admin_address = payable(Admin);
        admin_address.transfer(msg.value);

        
        uint _no = Total_Presale_Count[_add];
        uint no = _no + 1;

        Today_Presale_Bool[_add][_datestamp] = true;
        Today_Presale_No[_add][_datestamp] = no;
        Total_Presale_Count[_add] += 1;
        User_Presale_Record[_add][no] = _datetimestamp;
        
        User_Today_Presale_Amount[_add][_datestamp] = _token_amount;
        User_Today_Presale_Exchange_Amount[_add][_datestamp] = msg.value;
    }

    //---------------Admin_Area-----------------------

    function Burn_Tokens(address _add, uint256 _amount) public {
        _burn(_add, _amount);
    }
}
/*
```

This Solidity smart contract creates an ERC20 token called TCC with the symbol TCC and a total supply of 200,000 tokens. It uses the OpenZeppelin ERC20 contract as a base, which provides a standard implementation of the ERC20 interface.

The `_TOTAL_SUPPLY` constant is set to 200,000 multiplied by 10^18 to account for the 18 decimal places commonly used in ERC20 tokens. The constructor calls the base ERC20 constructor with the name and symbol, then mints the total supply to the deployer of the contract.
*/