import React , {useEffect, useState} from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import Layout from './Layout';
import {readProduct, getBidList, createBid, sellBid} from './apiCore';
import {ShowImage} from './showImage';
import './Product.css';
import { useHistory } from "react-router-dom";


export const ProductPage = (props) => {

    let history = useHistory();

    const [error, setError] = useState(false);
    const [product, setProduct] = useState({});
    const [imgNum, setImgNum] = useState(0);
    const imgNums = [1,2,3,4];
    const [bid, setBid] = useState(0);
    const [bidList, setBidList] = useState([]);

    const [user, setUser] = useState("");
    
    const loadSingleProduct = (productId) => {
        readProduct(productId)
        .then((data) => {
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // console.log("product: ", data)
            }
        });
    };

    const loadBidList = (productId) => {
        console.log(productId, "hereeee");
        getBidList(productId)
        .then((data) => {
            if(data.error){
                setError(data.error);
            } else{
                setBidList(data.data);
                console.log(data.data);
            }
        });
    }
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        loadBidList(productId);

        if(JSON.parse(localStorage.getItem('jwt'))){
            setUser(JSON.parse(localStorage.getItem('jwt')).user);
            console.log(user);
        } else{
            setUser(null);
        }

        //loadBids
        
    }, []);

    const handleChange = (event) =>{
        console.log(event.target.value);
        setBid(event.target.value);
    }

   const makeBid = () => {
        const productId = props.match.params.productId;
        if(JSON.parse(localStorage.getItem('jwt'))){
            setUser(JSON.parse(localStorage.getItem('jwt')).user);
            console.log(user);
        } else{
            setUser(null);
        }
       console.log("user null? ",user == null, user);
        if(user){
            if(product.user === user._id){
                alertify.alert("Cannot bid on your own item!", () =>{
                    alertify.message("Ok");
                });
                return;
            };
            console.log("signed in: ", {sellerEmail: product.user, userEmail: user._id});

            if(bid > user.wallet){
                alertify.alert("You dont have enough money in your wallet!", () =>{
                    alertify.message("Ok");
                });
                return;
            }

            createBid(productId, user._id, product.user, bid)
            .then((data) => {
                console.log(data);
            })
            .then(() => {
                loadBidList(props.match.params.productId);
            });

        } else{
           history.push('/');
        }
   }

   const sellItem = () =>{
        let highestBid;
        if(bidList.length > 0){
            highestBid = bidList[0];
        } else {
            alertify.alert("No bids yet", () =>{
                alertify.message("Ok");
            });
            return;
        }

        const productId = props.match.params.productId;
        if(JSON.parse(localStorage.getItem('jwt'))){
            setUser(JSON.parse(localStorage.getItem('jwt')).user);
            console.log(user);
        } else{
            setUser(null);
        }
       console.log("user null? ",user == null, user);
        if(user){
            if(product.user !== user._id){
                alertify.alert("Cannot cannot sell other user's item!", () =>{
                    alertify.message("Ok");
                });
                return;
            };
            console.log("signed in: ", {sellerEmail: product.user, userEmail: user._id});

            console.log("highest bid");
            console.log(highestBid);

            sellBid(productId, highestBid.buyer._id, product.user, highestBid.amount)
            .then((data) => {
                console.log(data);
            })
            .then(() => {
                const productId = props.match.params.productId;
                loadSingleProduct(productId);
            });

        } else{
           history.push('/signin');
        }


   }


    return(
        <Layout title={product.name} description={product && product.description && product.description.substring(0,100)} className="container-fluid">

            <div className="detail-parent">
                <div className="details" key={product._id}>
                    <div className="big-img">
                        <ShowImage myStyling="view-product-img" item={product} url="product" imageNumber={1}/>
                    </div>
                    <div className="box">
                        <div>
                            <h2>{product.name}</h2>
                            <hr/>
                            <span>₹{product.price}</span>
                        </div> 
                        <hr/> 
                        {product && product.soldStatus && <h2 style={{color: "red"}}>SOLD</h2>}
                        {product && product.soldStatus === false &&
                        <div>
                            {user && product && product.user != user._id && 
                            <div style={{display: "flex"}}>
                                <input type="search" minLength="4" className="form-control" style={{width: "fit-content", marginRight: "5px"}} onChange={handleChange} placeholder="Bid amount"/>
                                <button className="mycard-btn btn-blue" onClick={makeBid}>Make Bid</button>
                            </div>}

                            {user && product && product.user == user._id && 
                            <div style={{display: "flex"}}>
                                <button className="mycard-btn btn-blue" onClick={sellItem}>Sell Item</button>
                            </div>}
                        </div>
                        }
                        

                        <div className="card" style={{width: "18rem", marginTop: "10px"}}>
                        <div className="card-header">
                            Bids
                        </div>
                        <ul className="list-group list-group-flush">
                            {bidList.map((mBid, i) => {
                                return(<li className="list-group-item" style={{fontWeight: (800 - 100*i)}}>{mBid.amount + " by " + mBid.buyer.name}</li>)
                            })}
                        </ul>
                        </div>
                        <hr/>
                        <p>{product.description}</p>
                        {/* {
                            JSON.stringify(bidList)
                        } */}
                    </div>
                    
                </div>
                
            </div>

        </Layout>
    );

};