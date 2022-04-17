import React, { Fragment, useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

import PaintLogo from '../assets/paint.png';

import "./menu.css";
import "../style2.css";




const Menu = ({history}) => {

    const [open, setOpen] = useState(false);


    const openNav = () => {
        console.log("opening")
        setOpen(true);
    }
      
    const closeNav = () => {
        setOpen(false);
    }
    

    return(
        <div id="header">
            <div id="title" className="light-bg">
                <h3>Pictura</h3>
            </div>
            <div id="nav-container">
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <span className="curtain" onClick={openNav}>&#9776; </span>
                        <div id="curtainMenu" className="overlay" style={{width: open ? "100%" : "0%"}}>
                            <a className="closebtn" onClick={closeNav}>&times;</a>
                            <div className="overlay-content">
                            <Link className="nav-link" to="/">
                                <li className="nav-item">
                                    Home
                                </li>  
                            </Link>
                            <Link className="nav-link" to="/shop">
                                <li className="nav-item">
                                Shop
                                </li>
                            </Link>
                              <a href="#">View Collection</a>
                              <a href="#">E-Wallet</a>
                              <a href="#">Contact</a>
                            </div>
                          </div>

                        <button className="navbar-toggler btn-outline-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul id="nav-list" className="navbar-nav nav-fill d-flex justify-content-around">
                                <Link className="nav-link" to="/">
                                    <li className="nav-item active">
                                        Home
                                    </li>
                                </Link>
                                <Link className="nav-link" to="/shop">
                                    <li className="nav-item">
                                        Shop
                                    </li>
                                </Link>
                                {!isAuthenticated() && (
                                    <Fragment>
                                        <Link className="nav-link" to="/signup">
                                            <li className="nav-item">    
                                                Signup
                                            </li>
                                        </Link>
                                        <Link className="nav-link"  to="/signin">  
                                            <li className="nav-item">    
                                                Signin
                                            </li>
                                        </Link>
                                        
                                    </Fragment>)}
                                
                                    {isAuthenticated() && (
                                    <Fragment>


                                        <Link className="nav-link" to="/user/dashboard">
                                            <li className="nav-item">    
                                                Dashboard
                                            </li>
                                        </Link>
                                        

                                        <Link className="nav-link" to="/create/product">
                                                <li className="nav-item">    
                                                Sell
                                                </li>
                                        </Link>

                                        <Link className="nav-link" to="/remove/product">
                                                <li className="nav-item">    
                                                My Items
                                                </li>
                                        </Link>

                                        <li className="nav-item">    
                                            <span onClick={() => {
                                                    signout(() => {
                                                    history.push('/');
                                                });
                                            }}>Signout
                                            </span>
                                        </li>
                                    </Fragment>
                                )}

                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Browse
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li> */}
                            </ul>
                            {/* <form className="form-inline my-2 my-lg-0 ml-auto">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
                            </form> */}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Menu); //history