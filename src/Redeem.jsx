// For All Cards: GET Request
// https://aptech.heritagejewels.com.pk/microservices/giftcard.php

// ==================================================

// For Single Card View: GET Request
// https://aptech.heritagejewels.com.pk/microservices/singlecard.php?cardnumber=DML201

// ==================================================

// For Single Card View: POST Request
// https://aptech.heritagejewels.com.pk/microservices/addtransaction.php 
// {
// "cardNumber": "DML202",
// "amount": 100,
// "userId": 1
// }

// ==================================================
// For All Transaction:  GET Request https://aptech.heritagejewels.com.pk/microservices/transaction.php

// ==================================================
// For User wise Transaction:  GET Request https://aptech.heritagejewels.com.pk/microservices/transaction.php?userid=1

// For Login: POST Request
// https://aptech.heritagejewels.com.pk/microservices/login.php 
// {
// "username": "testing1",
// "password": "123"
// }
import React, { useState } from 'react';
import axios from "axios";
import ApiCall from './ApiCall';
import DataTable from 'datatables.net-react';  
import DT from 'datatables.net-dt'; 
import B from './B.jsx'
import NavBar from './NavBar.jsx';
DataTable.use(DT);
function Redeem() {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState("");
  const [chargedAmount, setChargedAmount] = useState(0);  // State to store charged amount
  const [updatedBalance, setUpdatedBalance] = useState(null);  // State to store updated balance


  const handleInputChange = (event) => {
    setInput(event.target.value);
    if (event.target.value.length > 6) {
      setInputError("Card number length exceeding the limit");
    } else if (event.target.value.length < 6) {
      setInputError("Card number should have 6 characters");
    } else {
      setInputError("");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      setUrl(`https://aptech.heritagejewels.com.pk/microservices/singlecard.php?cardnumber=${input}`);
   
    }
  };
  

  // Fetch card data using ApiCall hook
  const { data, loading, error } = ApiCall(url);

  const handleChargedAmountChange = (event) => {
    setChargedAmount(event.target.value);
   
  };

  const handleChargeSubmit = () => {
    const charge = parseFloat(chargedAmount);
    if (isNaN(charge) || charge <= 0) {
        setInputError("Please enter a valid charge amount");

       
      return;
    }

    if (data && data.length > 0) {
      const currentBalance = parseFloat(data[0].cardbalance);
      if (currentBalance < charge) {
        setInputError("Charged amount exceeds the card balance");
        
        return;
      }

      // Calculate the new balance 
      const newBalance = currentBalance - charge;
    
   
  console.log(data[0].cardnumber)
  // console.log(chargedAmount)
 const userId=localStorage.getItem('userid')
     // Send the updated balance using POST request
      const change = {
        "cardNumber": data[0].cardnumber,
        "amount": chargedAmount,
        "userId": userId
      };
        axios.post(`https://aptech.heritagejewels.com.pk/microservices/addtransaction.php`, change)
        .then(response => {
          console.log("Data sent successfully", response.data);
            

          setUpdatedBalance(newBalance);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
      
    }
    
  };
  
  return (
    <div style={{border:"1px solid black", padding:"12px"}} className="container">
      <NavBar/>
      <h1>Redeem</h1>
      <h1>Enter Card Number to view Details</h1>
      <div className="App row">
        <div className="col-sm-6">
          <label>
            Enter Card Number:
            <input 
              type="text"
              placeholder="Enter Here"
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
            />
          </label>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          {error && (
            <div className="alert alert-danger">
              <strong>Error!</strong> {error}
            </div>
          )}

          {loading && (
            <div className="alert alert-info">
              <strong>Loading!</strong> Please wait while we fetch the data.
            </div>
          )}

          {inputError && (
            <div className="alert alert-danger">
              <strong>{inputError}</strong>
            </div>
          )}

          {data && data.length > 0 ? (
            <>
            <div className="data">
              <h3>Card Number: {data[0].cardnumber}</h3>
              <p>Card Value: {data[0].cardvalue}</p>
              <p>Card Balance: {updatedBalance !== null ? updatedBalance : data[0].cardbalance}</p>
              <p>Created Date: {data[0].creadteddate}</p>
              <p>Status: {data[0].isactive ? "Active" : "Inactive"}</p>
          
            </div>
            
            </>
          ) : (
            <></>
          )}
            

          {data && data.length > 0 && (
            <div className="charge-form">
              <h4>Charge Amount</h4>
              <label>
                Enter Charged Amount:
                <input className='mt-1'
                  type="number"
                  placeholder="Charged Amount"
                  value={chargedAmount}
                  onChange={handleChargedAmountChange}
                />
              </label>
              <button className='btn btn-dark mt-1' onClick={handleChargeSubmit}>Submit Charge</button>
            </div>
          )}
        </div>
        {/* <h1>Transaction Details</h1> */}
       {
        <div>{chargedAmount? <B/> : <></>}</div>
       }
      </div>
      
    </div>
  );
}

export default Redeem;
