import { API } from '../config';

export const signup = (user) => {
    //console.log(user.name, user.email, user.password, user.phone);
    user.wallet = 1000;
    
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) =>{
        //console.log(JSON.stringify(response.json()));
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        return err.json();
    })
};

export const signin = (user) => {
    // console.log("user: ", user);
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) =>{
        // console.log("signin: ",JSON.stringify(response));
        return response.json();
    })
    .catch((err) => {
        console.log("error signing: ",err);
        return err;
    })
};

export const authenticate = (data, next) => {
    if(window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if(window !== undefined){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then((response) =>{
            console.log(JSON.stringify(response.json()));
            //return response.json();
        })
        .catch((err) => {
            console.log(err);
            //return err.json();
        })
    }
};

export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    } else{
        return false;
    }
};

