import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();

let token = localStorage.getItem('userToken')

let headers = {
    token
}

async function addToCart(id) {

    return await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            productId: id
        },
        {
            headers

        }).then((data) => data)
        .catch((err) => err)
}
async function updateCartProductQuantity(count, id) {

    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            count
        },
        {
            headers

        }).then((data) => data)
        .catch((err) => err)
}

async function getCartData() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        }).then((data) => data)
        .catch((err) => err)
}
async function clearUserCart() {
    return await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        }).then((data) => data)
        .catch((err) => err)
}

async function removeSpecificCartItem(id) {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers

        }).then((data) => data)
        .catch((err) => err)
}


async function onlinePayment(idCart, url, values) {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${idCart}?url=${url}`,
        {
            shippingAddress: values
        },
        {
            headers

        }).then((data) => data)
        .catch((err) => err)
}








export default function CartContextProvider(props) {

    const [cartId, setCartId] = useState(null)


    return <>
        <cartContext.Provider value={{ addToCart, getCartData, removeSpecificCartItem, updateCartProductQuantity, clearUserCart, cartId, setCartId, onlinePayment }}>
            {props.children}
        </cartContext.Provider>
    </>
}