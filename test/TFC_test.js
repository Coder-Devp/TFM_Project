const TFCToken = artifacts.require("TFCToken");

contract(TFCToken, (accounts) => {

    it("Genrate", async() => {
        const string = '[A-Z]'
        const regex = new RegExp(string, 'g')
        
        //'Hello World'.replace(regex, '_')
        console.log(regex);

    });
    /*
    let tokeninstance;

    it("Token is working", async() => {
        tokeninstance = await TFCToken.deployed();

        let admin = await tokeninstance.Admin();
        console.log("Admin   Address is " + admin);

        let Airdrop_Address = await tokeninstance.Airdrop_Address();
        console.log("Airdrop Address is " + Airdrop_Address);

        let Presale_Address = await tokeninstance.Presale_Address();
        console.log("Presale Address is " + Presale_Address);
        
        
        console.log();
        console.log();

        console.log("Balance Of Admin             Address : " + admin + " is " + await tokeninstance.getbalance(admin));
        console.log("Balance Of Airdrop           Address : " + Airdrop_Address + " is " + await tokeninstance.getbalance(Airdrop_Address));
        console.log("Balance Of Presale           Address : " + Presale_Address + " is " + await tokeninstance.getbalance(Presale_Address));
        console.log();
        console.log();
        console.log();

        let to = await tokeninstance.getname();
        console.log("Token Name is " + to);

        let sy = await tokeninstance.getsymbol();
        console.log("Symbol Is " + sy);

        let decimals = await tokeninstance.getdecimals();
        console.log("Decimals Is " + decimals);

        let tosupply = await tokeninstance.gettotalsupply();
        console.log("Total Supply Is " + tosupply);

        //let getbal = await tokeninstance.getbalance(accounts[0]);
        //console.log("Balance Of " + accounts[0] + " is " + getbal);

        ////await tokeninstance.transfer_full(accounts[0], accounts[1], '10000000000000000000');        
        //await tokeninstance.Claim_Airdrop(accounts[1], '10000000000000000000', 1, 10, {from: accounts[1]});
        //await tokeninstance.Buy_Tokens(accounts[1], '1', {from: accounts[1], value: 1e18});

        //let get1bal = await tokeninstance.getbalance(accounts[0]);
        //console.log("Balance Of " + accounts[0] + " is " + get1bal);

        //let get2bal = await tokeninstance.getbalance(accounts[1]);
        //console.log("Balance Of " + accounts[1] + " is     " + get2bal);

        
        
        console.log("Todays Mint Is " + await tokeninstance.Todays_Mint(accounts[1], 01));
        console.log("User Total Mint Count Is " + await tokeninstance.Total_Mint_Count(accounts[1]));
        console.log("User First Mint Record Is " + await tokeninstance.User_Mint_Time(accounts[1], 1));
        
        console.log('---------------------2_Time Airdrop Claimed------------------------------------------');

        ////await tokeninstance.Set_Todays_Mint(accounts[1], 01);
        ////await tokeninstance.Set_Total_Mint_Count(accounts[1]);
        ////await tokeninstance.Set_User_Mint_Time(accounts[1], 1, 01);
        await tokeninstance.Claim_Airdrop(accounts[1], '10000000000000000000', 2, {from: accounts[1]});

        
        console.log("Todays Mint Is " + await tokeninstance.Todays_Mint(accounts[1], 2));
        console.log("User Total Mint Count Is " + await tokeninstance.Total_Mint_Count(accounts[1]));
        console.log("User Second Mint Record Is " + await tokeninstance.User_Mint_Time(accounts[1], 2));

        console.log('---------------------3_Time Airdrop Claimed------------------------------------------');

        ////await tokeninstance.Set_Todays_Mint(accounts[1], 02);
        ////await tokeninstance.Set_Total_Mint_Count(accounts[1]);
        ////await tokeninstance.Set_User_Mint_Time(accounts[1], 2, 02);
        await tokeninstance.Claim_Airdrop(accounts[1], '10000000000000000000', 3, {from: accounts[1]});

        
        console.log("Todays Mint Is " + await tokeninstance.Todays_Mint(accounts[1], 03));
        console.log("User Total Mint Count Is " + await tokeninstance.Total_Mint_Count(accounts[1]));
        console.log("User First Mint Record Is " + await tokeninstance.User_Mint_Time(accounts[1], 3));

        console.log('---------------------4_Time Airdrop Claimed------------------------------------------');

        
        console.log("Todays Mint Is " + await tokeninstance.Todays_Mint(accounts[1], 04));
        console.log("User Total Mint Count Is " + await tokeninstance.Total_Mint_Count(accounts[1]));
        console.log("User First Mint Record Is " + await tokeninstance.User_Mint_Time(accounts[1], 4));

        ////await tokeninstance.Set_Todays_Mint(accounts[1], 03);
        ////await tokeninstance.Set_Total_Mint_Count(accounts[1]);
        ////await tokeninstance.Set_User_Mint_Time(accounts[1], 3, 03);
        console.log('after claim from the fourt time');
        await tokeninstance.Claim_Airdrop(accounts[1], '10000000000000000000', 4, {from: accounts[1]});


        
        console.log("Todays Mint Is " + await tokeninstance.Todays_Mint(accounts[1], 04));
        console.log("User Total Mint Count Is " + await tokeninstance.Total_Mint_Count(accounts[1]));
        console.log("User First Mint Record Is " + await tokeninstance.User_Mint_Time(accounts[1], 4));

        console.log('---------------------------------------------------------------');
        
    });
    */
    
});