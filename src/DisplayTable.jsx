
import DataTable from 'datatables.net-react';  
import DT from 'datatables.net-dt';  
import ApiCall from './ApiCall.js';
import NavBar from './NavBar.jsx';
DataTable.use(DT);

function DisplayTable() {
  const url="https://aptech.heritagejewels.com.pk/microservices/giftcard.php";
  const {data,loading,error}=ApiCall(url);

  const columns = [
    { data: 'id', title: 'ID' },
    { data: 'cardnumber', title: 'Card Number', },
    { data: 'cardvalue', title: 'Card Value' },
    { data: 'cardbalance', title: 'Card Balance' },
    { data: 'creadteddate', title: 'Created Date' }, 
    { data: 'isactive', title: 'Is Active' }
  ];

  return (
    <div className="container">
      <NavBar/>
      <h1>Gift Card Information</h1>
  
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
