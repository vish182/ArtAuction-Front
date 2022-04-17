import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import { getCategories } from '../admin/apiAdmin';
import Card from './Card';
import {Search} from './Search';
import "../style2.css"


const Home = () => {

    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [categories,setCategories] = useState([]);

    useEffect(() =>{
        loadProductByArrival();
        loadCategories();
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
            <div id="carousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carousel" data-slide-to="0"></li>
                <li data-target="#carousel" data-slide-to="1" className="active"></li>
                <li data-target="#carousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item">
                    <img className="d-block carousel-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg" alt="First slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Mona Lisa</h5>
                        <p> <em> Leonardo da Vinci, 1513-1517 </em> </p>
                    </div>
                </div>
                <div className="carousel-item active">
                    <img className="d-block carousel-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1200px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg" alt="Second slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>The Scream</h5>
                        <p> <em> Edvard Munch, 1893 </em></p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block carousel-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg" alt="Third slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Girl with a Pearl Earring</h5>
                        <p> <em> Johannes Vermeer, 1665</em> </p>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        );
    }


    return(
        <Layout title="Home" description="Home page of the website" className="container-fluid">
         <div className="bgimg-1">
            <div className="caption">
            <span className="border dark-img-text"> SOME TEXT </span>
            </div>
        </div>
        
        <div className="light-bg">
            <h3>About Us</h3>
            <p>Nascetur per nec posuere turpis, lectus nec libero turpis nunc at, sed posuere mollis ullamcorper libero ante lectus, blandit pellentesque a, magna turpis est sapien duis blandit dignissim. Viverra interdum mi magna mi, morbi sociis. Condimentum dui ipsum consequat morbi, curabitur aliquam pede, nullam vitae eu placerat eget et vehicula. Varius quisque non molestie dolor, nunc nisl dapibus vestibulum at, sodales tincidunt mauris ullamcorper, dapibus pulvinar, in in neque risus odio. Accumsan fringilla vulputate at quibusdam sociis eleifend, aenean maecenas vulputate, non id vehicula lorem mattis, ratione interdum sociis ornare. Suscipit proin magna cras vel, non sit platea sit, maecenas ante augue etiam maecenas, porta porttitor placerat leo.</p>
        </div>
 
        <div className="bgimg-2">
            <div className="caption">
            <span className="border light-img-text" > SOME TEXT </span>
            </div>
        </div>

        <div style={{position:"relative"}}>
            <div className="light-bg">
                <div className="container-80">
                    <h3 style={{textAlign: "left"}}> Best we have to offer </h3> <br/>
                    <p>Accumsan fringilla vulputate at quibusdam sociis eleifend, aenean maecenas vulputate, non id vehicula lorem mattis, ratione interdum sociis ornare. Suscipit proin magna cras vel, non sit platea sit, maecenas ante augue etiam maecenas, porta porttitor placerat leo.</p>
                    
                    {carousel()}

                </div>
            </div>
        </div>
 
        <div className="bgimg-3">
            <div className="caption">
            <span className="border light-img-text"> SOME TEXT </span>
            </div>
        </div>

        <div style={{position:"relative"}}>
            <div className="dark-bg">
                <div className="container-80">
                    <h3 style={{color: "#ddd", textAlign:"left"}}> Top Buys </h3> <br/>
                    <div className="row">
                        {productByArrival.map((prod, i) =>(                        <div class="col-md-3">
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
            <span className="border dark-img-text"> SOME TEXT </span>
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
                            <div className="card category-card border-0 rounded-0" style={{width: "18rem"}}>
                                <div className="card-body dark">
                                    <h5 className="card-title">{cat.name}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
            <span className="border dark-img-text"> SOME TEXT </span>
            </div>
        </div>
        </Layout>
    );
};

export default Home;