import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { MdDelete, MdLocationOn, MdShoppingCart } from "react-icons/md";
import { FlexColumn, FlexRow, FontStyle } from "../../../core/constant/Styles";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartDataAtom, UserDataAtom } from "../../../data/provider/Atom";
import { Amount } from "../../../components/Amount";
import { Button2 } from "../../../components/Button2";
import { useState } from "react";
import { InfoDialog } from "../../../components/Dialog";
import { ApiService } from "../../services/ApiService";
import ItemCard from "../../../components/ItemCard";

export const CartView = () => {
    const [cartData, setCartData] = useRecoilState(CartDataAtom);
    const [userData, setUserData] = useRecoilState(UserDataAtom)
    const [openDialog, setOpenDialog] = useState(false);
    const apiService = new ApiService();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRemove = (product, index) => async() => {
        if (cartData[index].amount > 1) {
            await apiService.editCartItem({
                cart_id: userData.id,
                product_id: product.productId,
                amount: product.amount - 1,
                token: userData.token
            });
            let arr = [...cartData];
            arr[index] = {
                productName: cartData[index].productName,
                productPrice: cartData[index].productPrice,
                productImage: cartData[index].productImage,
                amount: cartData[index].amount - 1
            }
            setCartData(arr);
        }
    }

    const handleAdd = (product, index) => async () => {
        const res = await apiService.editCartItem({
            cart_id: userData.id,
            product_id: product.productId,
            amount: product.amount + 1,
            token: userData.token
        });
        console.log(res);
        let arr = [...cartData];
        arr[index] = {
            productName: cartData[index].productName,
            productPrice: cartData[index].productPrice,
            productImage: cartData[index].productImage,
            amount: cartData[index].amount + 1
        }
        setCartData(arr);
    }

    const removeItem = (product, index) => async () => {
        const res = await apiService.deleteCartItem({
            cart_id: userData.id,
            product_id: product.productId,
            token: userData.token
        });
        let arr = [...cartData];
        arr.splice(index,1);
        setCartData(arr);
    }

    return (
        <div style={{
            width: "100%",
            background: "#D2C1AC",
        }}>
            <Navbar />

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

                {cartData.length == 0 ?
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
                        {cartData.map((product, index) => {
                            return <div name={product.productName} style={{
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
                                }} onClick={(removeItem(product,index))} />
                                <img src={product.productImage} style={{
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
                                    }}>{product.productName}</p>
                                    <p style={{
                                        ...FontStyle,
                                        fontSize: "26px"
                                    }}>Rp.{product.productPrice * product.amount}</p>
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
                                    {cartData.reduce((total, data) => total + (data.productPrice * data.amount), 0)}
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
                                }} value={userData.address} onChange={handleChange} name="address" placeholder="Please input your address" />
                            </div>
                        </div>

                        <Button2 color="#C2DDD7" text="Purchase" onClick={() => {
                            setOpenDialog(true);
                            if (userData.address.trim().length != 0) {
                                setCartData([]);
                            }
                        }} />
                    </div>
                }
            </div>

            <Footer />
            <InfoDialog
                isOpen={openDialog}
                onClose={() => setOpenDialog(false)}
                title={
                    userData.address.trim().length == 0 ?
                        "Failed To Purchase" : "Congrats !"
                }
                content={
                    userData.address.trim().length == 0 ?
                        "Please input your address" : "Your order will be delivered !"
                } />
        </div>
    )
}