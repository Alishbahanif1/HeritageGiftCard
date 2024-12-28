// https://aptech.heritagejewels.com.pk/microservices/transaction.php
// {
//     "id": 1,
//     "datecreated": "2024-12-20 10:26:31",
//     "cardnumber": "DML101",
//     "amount": 2,
//     "userid": 1
//   },

import DataTable from 'datatables.net-react';  
import DT from 'datatables.net-dt';  
import ApiCall from './ApiCall.js';
import NavBar from './NavBar.jsx';
DataTable.use(DT);

function DisplayTable() {
  const url="https://aptech.heritagejewels.com.pk/microservices/transaction.php";
  const {data,loading,error}=ApiCall(url);

  const columns = [
    { data: 'id', title: 'ID' },
    { data: 'datecreated', title: 'Date Created', },
    { data: 'cardnumber', title: 'Card Number' },
    { data: 'amount', title: 'Amount' },
    { data: 'userid', title: 'User ID' }, 
   
  ];

  return (
    <div className="container">
      <NavBar/>
      <h1>Transaction Details</h1>
  
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
    </div>
  );
}

export default DisplayTable;
