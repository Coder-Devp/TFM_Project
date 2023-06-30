import React from 'react'

function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
}

export default function Navbar(props) {
  return (
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
                        <button className="nav-link active" aria-current="page">DashBoard</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link active" aria-current="page">Tree</button>
                    </li>
                    <li className="nav-item"> 
                        <button className="nav-link" onClick={props.Token_Details}>Token</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

//currentTime();
