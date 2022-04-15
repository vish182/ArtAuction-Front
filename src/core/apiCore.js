import {
    API
} from '../config';
import queryString from 'query-string';

export const getProducts = (sortBy, limit) => {
    //console.log(user.name, user.email, user.password, user.phone);


    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=${limit}`, {
            method: 'GET',
        })
        .then(response => {
            //console.log(JSON.stringify(response.json()));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};

export const getProductsByUser = ({userId}) => {
    //console.log(user.name, user.email, user.password, user.phone);


    return fetch(`${API}/products/byuser/${userId}`, {
            method: 'GET',
        })
        .then(response => {
            //console.log(JSON.stringify(response.json()));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    //console.log(user.name, user.email, user.password, user.phone);

    const data = {
        skip,
        limit,
        filters
    };
    //console.log("data: ", data)
    console.log("filters: ", JSON.stringify(data))
    return fetch(`${API}/products/by/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            //console.log(JSON.stringify(response.json()));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};

export const getProductsBySearch = (params) => {
    //console.log(user.name, user.email, user.password, user.phone);

    const query = queryString.stringify(params);
    console.log('query', query);

    return fetch(`${API}/products/query/search?${query}`, {
            method: 'GET',
        })
        .then(response => {
            //console.log(JSON.stringify(response.json()));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};


export const readProduct = (productId) => {
    //console.log(user.name, user.email, user.password, user.phone);


    return fetch(`${API}/product/view/${productId}`, {
            method: 'GET',
            // headers: {
            //     Accept: 'application/json',
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${token}`
            // },
            //body: JSON.stringify(category)
        })
        .then(response => {
            //console.log(JSON.stringify(response.json()));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};

export const getUserName = ({user_id}) => {
    return fetch(`${API}/user/getname/${user_id}`, {
            method: 'GET',
            // headers: {
            //     Accept: 'application/json',
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${token}`
            // },
            //body: JSON.stringify(category)
        })
        .then(response => {
            //console.log("User Name: ", JSON.stringify(response));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};

export const getBidList = (product_id) => {
    console.log(product_id, "here121");
    return fetch(`${API}/bids/list/${product_id}`, {
            method: 'GET',
            // headers: {
            //     Accept: 'application/json',
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${token}`
            // },
            //body: JSON.stringify(category)
        })
        .then(response => {
            //console.log("User Name: ", JSON.stringify(response));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};

export const createBid = (productId, buyerId, sellerId, amount) => {
    //console.log(user.name, user.email, user.password, user.phone);

    const data = {
        "product_id": productId,
        "seller": sellerId,
        "buyer": buyerId,
        "amount": amount
    };
    //console.log("data: ", data)
    console.log("filters: ", JSON.stringify(data))
    return fetch(`${API}/bids/createBid`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            //console.log(JSON.stringify(response.json()));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};

export const sellBid = (productId, buyerId, sellerId, amount) => {
    //console.log(user.name, user.email, user.password, user.phone);

    const data = {
        "product_id": productId,
        "seller": sellerId,
        "buyer": buyerId,
        "amount": amount
    };
    //console.log("data: ", data)
    console.log("sell bid: ", JSON.stringify(data))
    return fetch(`${API}/bids/sellBid`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            //console.log(JSON.stringify(response.json()));
            return response.json();
        })
        .catch((err) => {
            console.log(err);

        })
};