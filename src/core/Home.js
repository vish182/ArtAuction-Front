import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts, getProductsSoldRecently} from './apiCore';
import { getCategories } from '../admin/apiAdmin';
import Carousel from 'react-bootstrap/Carousel' 
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style2.css"


const Home = () => {

    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [recentlySold, setRecentlySold] = useState([]);
    const [categories,setCategories] = useState([]);

    useEffect(() =>{
        loadProductByArrival();
        loadCategories();
        loadRecentlySold();
        //loadProductBySell();
    }, []);

    const loadCategories = () => {
        getCategories()
        .then((data) => {
            console.log('category data: ', data);
            if(data.error){
                console.log(data.error);
            } else{
                setCategories(data);
            }
        })
    };

    const loadProductBySell = () => {
        getProducts('sold', 5)
        .then((data) => {
            if(data.error){
                setError(data.error);
            } else{
                setProductBySell(data);
            }
        })
    };

    const loadRecentlySold = () => {
        getProductsSoldRecently('createdAt', 5)
        .then((data) => {
            if(data.error){
                setError(data.error);
            } else{
                setRecentlySold(data);
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt', 10)
        .then((data) => {
            if(data.error){
                setError(data.error);
            } else{
                setProductByArrival(data);
            }
        })
    };

    const carousel = () => {
        return(

            <div className='container-fluid' >  
                <Carousel>

                    {productByArrival.map((prod, i) =>(
                        <Carousel.Item style={{'height':"300px"}} >  
                        <div className="d-flex flex-row justify-content-center">
                            <img style={{height: "300px"}}  
                            className="d-block"  
                            src={`${API}/product/photo1/${prod._id}`}  />
                        </div>  
                            <Carousel.Caption>  
                                <h3 style={{color: "#DCDCDC"}}>{prod.name} </h3>  
                            </Carousel.Caption>  
                        </Carousel.Item  > 
                    ))} 
                </Carousel>  
            </div>   
        );
    }


    return(
        <Layout title="Home" description="Home page of the website" className="container-fluid">
         <div className="bgimg-1">
            <div className="caption">
            <span className="border dark-img-text"> WELCOME TO PICTURA! </span>
            </div>
        </div>
        
        <div className="light-bg">
            <h3>About Us</h3>
            <p className="d-flex flex-row justify-content-center mt-3">
            Distributing high art to noteworthy collectors since 2022.
            </p>
            <p className="d-flex flex-row justify-content-center">
                
                We are an auction house dedicated to restoring, preserving and sharing art in all shapes and forms with people who appreciate its value.
            </p>
        </div>
 
        <div className="bgimg-2">
            <div className="caption">
            {/*<span className="border light-img-text" > SOME TEXT </span>*/}
            </div>
        </div>

        <div style={{position:"relative"}}>
            <div className="light-bg">
                <div className="container-80">
                    <h3 style={{textAlign: "center"}}> New Arrivals </h3> <br/>
                    
                    {carousel()}

                </div>
            </div>
        </div>
 
        <div className="bgimg-3">
            <div className="caption">
            {/* <span className="border light-img-text"> SOME TEXT </span> */}
            </div>
        </div>

        <div style={{position:"relative"}}>
            <div className="dark-bg">
                <div className="container-80">
                    <h3 style={{color: "#ddd", textAlign:"left"}}> Recently Sold </h3> <br/>
                    <div className="row">
                        {recentlySold.map((prod, i) =>(                        <div class="col-md-3">
                            <div class="card o-container rounded-0" style={{width: "18rem"}}>
                                <img className="card-img-top o-img" src={`${API}/product/photo1/${prod._id}`} alt=" Liberty Leading the People - Eugène Delacroix, 1830 "/>
                                <div className="card-body o-middle width-100">
                                    <p className="card-text o-text"> {prod.name} <br/> <em>  {prod.description} </em>  </p>
                                </div>
                             </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
       
        <div className="bgimg-4">
            <div className="caption">
            <span className="border dark-img-text"> All artworks are authenticated by our team, kindly do not re-sell sold artworks. </span>
            </div>
        </div>

        <div style={{position:"relative"}}>
            <div className="dark-bg">
                <div className="container-80">
                    <h3 style={{color: "#ddd", textAlign: "left"}}> Categories </h3> <br/>
                    <div className="row">
                        {/* <div className="col-md-6 d-flex flex-column justify-content-center category-column">  */}
                        {categories.map((cat, i) =>(
                            <>
                            <div className="card category-card border-0 rounded-0 mr-2 dark" style={{width: "18rem", 'background-color': "#282E34"}}>
                                <div className="card-body dark">
                                    <h5 className="card-title">{cat.name}</h5>
                                    <p className="card-text">{cat.description}</p>
                                </div>
                            </div>
                            </>
                        ))}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>

       
        <div className="bgimg-5">
            <div className="caption">
            <span className="border dark-img-text"> You can reach out with further queries <a href="mailto:abc@gmail.com">here</a> .</span>
            </div>
        </div>
        </Layout>
    );
};

export default Home;