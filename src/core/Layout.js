
import React from 'react';
import Menu from'./Menu';
import Footer from './footer';
import '../styles.css';

const Layout = ({title= "Title", description= "Description", className, children}) => {
    return(
        <div>
             <Menu/>

            <div className={className}>{children}</div>
            <Footer/>
        </div>
    );
};

//<div className="jumbotron">
//<h2>{title}</h2>
//{/* <p className="lead">{description}</p> */}
//</div>

export default Layout;