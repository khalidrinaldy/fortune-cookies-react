import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { MdDelete, MdLocationOn, MdShoppingCart } from "react-icons/md";
import { FlexColumn, FlexRow, FontStyle } from "../../../core/constant/Styles";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartDataAtom, UserDataAtom } from "../../../data/provider/Atom";
import { Amount } from "../../../components/Amount";
import { Button2 } from "../../../components/Button2";
import { useEffect, useState } from "react";
import { InfoDialog } from "../../../components/Dialog";
import { ApiService } from "../../services/ApiService";
import ItemCard from "../../../components/ItemCard";
import { CircularProgress } from "@mui/material";
import {Product} from "../../../data/models/Product.model";

export const CartView = () => {
    const [cartData, setCartData] = useRecoilState(CartDataAtom)
    const [userData, setUserData] = useRecoilState(UserDataAtom)
    const [openDialog, setOpenDialog] = useState(false);
    const [addressInput, setAddressInput] = useState("");
    const [titlePurchase, setTitlePurchase] = useState("");
    const [messagePurchase, setMessagePurchase] = useState("");
    const apiService = new ApiService();
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);

    const getCartList = async () => {
        setIsLoading(true);
        const user = await JSON.parse(localStorage.getItem('user'));
        const res = await apiService.getCartList({token: user['token']});
        const data = res['data'];
        let dumps = [];
        for (const index in data) {
            const product = new Product({
                id: data[index]['Product_Id'],
                name: data[index]['Product_Name'],
                image: data[index]['Product_Image'],
                description: data[index]['Product_Description'],
                price: data[index]['Product_Price'],
                category: data[index]['Product_Category'],
                amount: data[index]['Amount']
            });
            dumps.push(product);
        }
        setCart(dumps);
        setIsLoading(false);
    }

    const handleRemove = (product, index) => async () => {
        if (cart[index].amount > 1) {
            setIsLoading(true);
            await apiService.editCartItem({
                product_id: product.id,
                amount: product.amount - 1,
                token: userData.token
            });
            let arr = [...cart];
            arr[index] = {
                id: cart[index].id,
                name: cart[index].name,
                price: cart[index].price,
                image: cart[index].image,
                amount: cart[index].amount - 1
            }
            setCart(arr);
            setIsLoading(false);
        }
    }

    const handleAdd = (product, index) => async () => {
        setIsLoading(true);
        const res = await apiService.editCartItem({
            product_id: product.id,
            amount: product.amount + 1,
            token: userData.token
        });
        let arr = [...cart];
        arr[index] = {
            id: cart[index].id,
            name: cart[index].name,
            price: cart[index].price,
            image: cart[index].image,
            amount: cart[index].amount + 1
        }
        setCart(arr);
        setIsLoading(false);
    }

    const removeItem = (product, index) => async () => {
        setIsLoading(true);
        const res = await apiService.deleteCartItem({
            product_id: product.id,
            token: userData.token
        });
        let arr = [...cart];
        arr.splice(index, 1);
        setCart(arr);
        setCartData(arr);
        setIsLoading(false);
    }

    const handlePurchase = async () => {
        setIsLoading(true);
        const user = await JSON.parse(localStorage.getItem('user'))
        const idList = cart.map((product, _) => {
            return product.id
        });
        const amountList = cart.map((product, _) => {
            return product.amount
        });
        const total_price = cart.reduce((total, data) => total + (data.price * data.amount), 0)
        const res = await apiService.Purchase({
            address: addressInput,
            total_price: total_price,
            products_id: idList.join(),
            amounts: amountList.join(),
            token: user['token']
        });
        setIsLoading(false);
        if (res['error']) {
            setTitlePurchase("Error Occured");
            setMessagePurchase(res['message']);
        } else {
            setTitlePurchase("Congrats !");
            setMessagePurchase("Your Order Will Be Delivered");
            setCart([]);
            setCartData([]);
        }
    }

    useEffect(() => {
        getCartList();
    }, [])

    return (
        <div style={{
            width: "100%",
            background: "#D2C1AC",
        }}>
            <Navbar />

            {
                isLoading ?
                    <div style={{ height: "600px", width: "100%", ...FlexColumn, justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress />
                    </div>
                    :
                    <div style={{
                        padding: "15px 8vw 15px 5vw",
                        width: "100%",
                        minHeight: "600px"
                    }}>
                        <div style={{
                            ...FlexRow,
                            alignItems: "center",
                            marginBottom: "30px"
                        }}>
                            <MdShoppingCart size="36px" />
                            <div style={{ width: "15px" }}></div>
                            <p style={{
                                ...FontStyle,
                                fontWeight: "bold",
                                fontSize: "30px"
                            }}>Cart</p>
                        </div>

                        {cart.length == 0 ?
                            <div style={{
                                margin: "15vh auto 0 auto",
                                ...FontStyle,
                                fontSize: "36px",
                                fontWeight: "bold"
                            }}>
                                Your Cart Is Empty
                            </div> :

                            <div style={{
                                ...FlexColumn,
                                width: "90%"
                            }}>
                                {cart.map((product, index) => {
                                    return <div name={product.name} style={{
                                        width: "100%",
                                        height: "150px",
                                        ...FlexRow,
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        borderBottom: "1px solid black",
                                        marginBottom: "15px",
                                        position: "relative"
                                    }}>
                                        <MdDelete size="32px" color="black" style={{
                                            position: "absolute",
                                            top: "0",
                                            right: "0",
                                            zIndex: "1",
                                            cursor: "pointer"
                                        }} onClick={(removeItem(product, index))} />
                                        <img src={product.image} style={{
                                            width: "10%",
                                            height: "135px",
                                            border: "1px solid black",
                                            marginRight: "20px",
                                        }} />

                                        <div style={{
                                            width: "70%",
                                            ...FlexColumn
                                        }}>
                                            <p style={{
                                                ...FontStyle,
                                                fontSize: "26px"
                                            }}>{product.name}</p>
                                            <p style={{
                                                ...FontStyle,
                                                fontSize: "26px"
                                            }}>Rp.{product.price * product.amount}</p>
                                        </div>

                                        <div style={{
                                            height: "100%",
                                            ...FlexColumn,
                                            justifyContent: "center"
                                        }}>
                                            <Amount amount={product.amount} onAdd={handleAdd(product, index)} onRemove={handleRemove(product, index)} />
                                        </div>
                                    </div>
                                })}

                                <div style={{
                                    width: "100%",
                                    height: "150px",
                                    ...FlexRow,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: "1px solid black",
                                    marginBottom: "15px",
                                }}>
                                    <div style={{
                                        ...FlexColumn,
                                        ...FontStyle,
                                        fontSize: "26px"
                                    }}>
                                        <p style={{ margin: "0" }}>Total</p>
                                        <p style={{ margin: "0" }}>Rp.
                                            {cart.reduce((total, data) => total + (data.price * data.amount), 0)}
                                        </p>
                                    </div>

                                    <div style={{
                                        width: "60%",
                                        height: "125px",
                                        background: "#D2D5E1",
                                        border: "1px solid black",
                                        boxSizing: "border-box",
                                        borderRadius: "15px",
                                        ...FlexRow,
                                        justifyContent: "space-around",
                                        alignItems: "center"
                                    }}>
                                        <MdLocationOn size="50px" color="black" />
                                        <textarea style={{
                                            width: "70%",
                                            height: "80%",
                                            ...FontStyle,
                                            fontSize: "26px",
                                            textAlign: "start",
                                            background: "#D2D5E1",
                                            border: "none",
                                        }} value={addressInput} onChange={(e) => setAddressInput(e.target.value)} name="address" placeholder="Please input your address" />
                                    </div>
                                </div>

                                <Button2 color="#C2DDD7" text="Purchase" onClick={async () => {
                                    setOpenDialog(true);
                                    if (addressInput.trim().length != 0) {
                                        await handlePurchase();
                                    }
                                }} />
                            </div>

                        }
                    </div>
            }

            <Footer />
            <InfoDialog
                isOpen={openDialog}
                onClose={() => setOpenDialog(false)}
                title={
                    addressInput.trim().length == 0 ?
                        "Failed To Purchase" : titlePurchase
                }
                content={
                    addressInput.trim().length == 0 ?
                        "Please input your address" : messagePurchase
                } />
        </div>
    )
}