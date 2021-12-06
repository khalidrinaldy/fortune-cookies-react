import axios from "axios"
import { useRecoilValue } from "recoil"
import { Product } from "../../data/models/Product.model"
import { UserDataAtom } from "../../data/provider/Atom"

//const API_URL = "http://localhost:4000"
const API_URL = "https://fortune-cookies-apiserver.herokuapp.com"

export class ApiService {

    //USER
    async login(email, password) {
        const data = { email: email, password: password }
        const res = await axios
            .post(API_URL + `/login?email=${data.email}&password=${data.password}`, data, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
        return res.data
    }
    async register(email, password) {
        const data = { email: email, password: password }
        const res = await axios
            .post(API_URL + `/register?email=${data.email}&password=${data.password}`, data, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
        return res.data;
    }
    // async register(email, password) {
    //     const data = { email: email, password: password }
    //     return axios.post(API_URL + `/register`, data, {
    //             headers: { "Content-Type": "application/x-www-form-urlencoded" }
    //         })
    //         .then(res => res.data);
    // }
    async getUser() {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data != null) {
            const res = await axios.get(API_URL + `/userbytoken`, {
                headers: { "Authorization": `Bearer ${data["token"]}` }
            })
            return res.data
        }
        return data
    }

    //PRODUCT
    async getProduct({ category }) {
        const res = await axios.get(API_URL + `/product/${category}`)
        return res.data
    }

    //CART
    async getCartList({ token }) {
        const res = await axios.get(API_URL + `/cart`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        return res.data
    }
    async addCartItem({ product_id, amount, token }) {
        const data = {
            product_id: product_id,
            amount: amount
        }
        const res = await axios.post(API_URL + `/cart?product_id=${data.product_id}&amount=${data.amount}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    }
    async editCartItem({ product_id, amount, token }) {
        const data = {
            product_id: product_id,
            amount: amount
        }
        const res = await axios.put(API_URL + `/cart`, `product_id=${data.product_id}&amount=${data.amount}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    }
    async deleteCartItem({ product_id, token }) {
        const res = await axios.delete(API_URL + `/cart/${product_id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        })
        return res.data
    }

    //HISTORY + PURCHASE
    async GetAllHistory({ token }) {
        const res = await axios.get(API_URL + `/history`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        return res.data;
    }
    async GetHistoryDetail({ history_id, token }) {
        const res = await axios.get(API_URL + `/history/detail/${history_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        return res.data;
    }
    async Purchase({ address, total_price, products_id, amounts, token }) {
        const data = {
            address: address,
            total_price: total_price,
            products_id: products_id,
            amounts: amounts
        };
        const res = await axios
            .post(
                API_URL + `/purchase?address=${address}&total_price=${total_price}&products_id=${products_id}&amounts=${amounts}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
        return res.data;
    }
}