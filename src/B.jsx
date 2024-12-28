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
import React, { useState, useEffect } from 'react';
import axios from "axios";
import DataTable from 'datatables.net-react';  
import DT from 'datatables.net-dt'; 
DataTable.use(DT);
// ?userid=1
function Redeem() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userid=localStorage.getItem("userid")
    let url;
    if(userid==1){url="https://aptech.heritagejewels.com.pk/microservices/transaction.php";}
  else{url=`https://aptech.heritagejewels.com.pk/microservices/transaction.php?userid=${userid}`}
    
    useEffect(() => {
      if (!url) {
        return;
      }
     
  
      setLoading(true);  
      setError(null);
  
      axios.get(url)
        .then((response) => {
          if (!response.data || response.data.length === 0) {
            setError('No data found for the given card number.');}
          setData(response.data); 
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
  
      }, [url]);
    
      const columns = [
        { data: 'amount', title: 'Amount' },
        { data: 'cardnumber', title: 'Card Number', },
        { data: 'id', title: 'ID' },
        { data: 'datecreated', title: 'Created Date' }, 
        { data: 'userid', title: 'User ID' }
      ];
      console.log(data[0])
  return (<div className='container'>
<h1>Transaction History</h1>
<DataTable 
        data={data}  
        columns={columns}  
       className='table table-striped table-bordered pagination-sm'
        options={{
          paging: true, 
          searching: true,  
          ordering: true, 
          responsive: true, 
        }}
      />
  </div>);
}

export default Redeem;
