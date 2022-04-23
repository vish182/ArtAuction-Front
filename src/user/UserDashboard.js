import React, { useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import { addCoins } from '../core/apiCore';


const Dashboard = () => {

    const{user: {_id, name, email, role, wallet}} = isAuthenticated();

    const [money, setMoney] = useState(wallet);

    const userLinks = () => {
        return(
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    {/* <li className="list-group-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </li> */}
                    {/* <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Update Profile</Link>
                    </li> */}
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Sell Item</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/remove/product">My Items</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name: {" "+name}</li>
                    <li className="list-group-item">Email: {" "+email}</li>
                    <li className="list-group-item">Type: {role === 1 ? "Admin":"User"}</li>
                    <li className="list-group-item">Wallet: {money}</li>
                    <li className="list-group-item"><button className="btn btn-primary" onClick={() =>{
                        addCoins(_id, 1000)
                        .then((data) =>{
                            if(data.error){
                                console.log("error: ",data.error);
                            } else{

                                let userStorage;

                                if(typeof window == 'undefined'){
                                    return false;
                                }
                                if(localStorage.getItem('jwt')){
                                    userStorage = JSON.parse(localStorage.getItem('jwt'));
                                    userStorage.user.wallet = data.wallet;
                                    console.log(userStorage);
                                    localStorage.setItem("jwt", JSON.stringify(userStorage));
                                } else{
                                    return false;
                                }

                                setMoney(data.wallet);
                                console.log("UPDATED USER: ", data);
                            }
                        });
                    }}>Add 1000 coins</button></li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item">purchase 1</li> 
                </ul>
            </div>
        );
    };

    return(
        <Layout title="Dashboard" description={`Hello ${name.split(' ')[0]}!`} className="container-fluid">


            <div className="row" style={{marginTop: "50px", marginBottom: "50px"}}>
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                {userInfo()}
                {/* {purchaseHistory()} */}
                </div>
            </div>

            
            
            
        </Layout>
    );
};

export default Dashboard;