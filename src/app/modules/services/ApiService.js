import axios from "axios"
import { useRecoilValue } from "recoil"
import { Product } from "../../data/models/Product.model"
import { UserDataAtom } from "../../data/provider/Atom"

//const API_URL = "http://localhost:4000"
const API_URL = "https://fortune-cookies-apiserver.herokuapp.com"

export class ApiService {

    //USER
    async login(username, password) {
        const data = { username: username, password: password }
        const res = await axios
            .post(API_URL + `/login?username=${data.username}&password=${data.password}`, data, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
        return res.data
    }
    async register(username, password) {
        const data = { username: username, password: password }
        const res = await axios
            .post(API_URL + `/register?username=${data.username}&password=${data.password}`, data, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
        return res.data;
    }
    // async register(username, password) {
    //     const data = { username: username, password: password }
    //     return axios.post(API_URL + `/register`, data, {
    //             headers: { "Content-Type": "application/x-www-form-urlencoded" }
    //         })
    //         .then(res => res.data);
    // }
    async getUser() {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data != null) {
            const res = await axios
                .get(API_URL + `/user/${data["ID"]}`)
            return res.data
        }
        return null
    }

    //PRODUCT
    async getProduct({ category }) {
        const res = await axios.get(API_URL + `/product/${category}`)
        return res.data
    }

    //CART
    async getCartList({ id, token }) {
        const res = await axios.get(API_URL + `/cart/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        return res.data
    }
    async addCartItem({ cart_id, product_id, amount, token }) {
        const data = {
            cart_id: cart_id,
            product_id: product_id,
            amount: amount
        }
        const res = await axios.post(API_URL + `/cart?cart_id=${data.cart_id}&product_id=${data.product_id}&amount=${data.amount}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    }
    async editCartItem({ cart_id, product_id, amount, token }) {
        const data = {
            cart_id: cart_id,
            product_id: product_id,
            amount: amount
        }
        const res = await axios.put(API_URL + `/cart/${cart_id}`, `cart_id=${data.cart_id}&product_id=${data.product_id}&amount=${data.amount}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    }
    async deleteCartItem({ cart_id, product_id, token }) {
        // const res = await axios.delete(API_URL + `/cart/${cart_id}?product_id=${data.product_id}`, data, {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        const res = await axios.delete(API_URL + `/cart/${cart_id}/${product_id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        })
        return res.data
    }
}