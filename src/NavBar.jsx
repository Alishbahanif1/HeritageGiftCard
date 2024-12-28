import React from 'react'
import LogOut from './components/LogOut';
import { Routes, Route, Link } from 'react-router-dom';
function NavBar() {
     const userId = localStorage.getItem('userid');
  return (
    <div>
         <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
          <a class="navbar-brand" href="#">HERITAGE</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
            

               
                    {userId ==1 &&(
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allCustomers">View All Customers</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transactionDetails">Transaction Details</Link>
                  </li>
                </>
              )}

              {/* Always show Redeem button */}
              <li className="nav-item">
                <Link className="nav-link" to="/redeem">Redeem</Link>
              </li>

              
                
           
            </ul>
            <LogOut />
            </div>
          </div>
        </nav>
      
    </div>
  )
}

export default NavBar
