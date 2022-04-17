import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

import PaintLogo from '../assets/paint.png';

import "./menu.css";
import "../style2.css";

const Footer = () => {

    return(
        <>
                <div id="footer" style={{position:"relative"}}>
            <div className="dark-bg">
            <p>Works used on this webpage-
                <ul>
                    <li> The School of Athens - 	Raphael, 1509-1511 </li>
                    <li> The Starry Night - 	Vincent van Gogh, 1889</li>
                    <li> The Creation of Adam - 	Michelangelo, 1512</li>
                    <li> Mitsukuni Defying the Skeleton Spectre Invoked by Princess Takiyasha -  Utagawa Kuniyoshi, 19th Century (Made)</li>
                    <br/>
                    <li> Mona Lisa - Leonardo da Vinci, 1513-1517</li>
                    <li> The Scream - Edvard Munch, 1893 </li>
                    <li> Girl with a Pearl Earring - Johannes Vermeer, 1665</li>
                    <br/>
                    <li> Liberty Leading the People - Eugène Delacroix, 1830 </li>
                    <li> The Great Wave off Kanagawa - Katsushika Hokusai, 1831 </li>
                    <li> Ajanta Padmapani, Cave 1, Ajanta, India, 450-500 </li>
                    <li> The Wedding at Cana - Paolo Veronese, 1563 </li>
                </ul>
            </p>
            </div>
        </div>
        <div id="copyright" className="dark-bg darker">
            <h5> &copy; 2022 Copyright: <strong> PICTURA - ART AUCTION PORTAL </strong></h5>
        </div></>
    );
};

export default Footer; //history


