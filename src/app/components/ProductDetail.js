import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlexColumn, FlexRow, FontStyle } from "../core/constant/Styles";
import { CartDataAtom, IsLoggedAtom, UserDataAtom } from "../data/provider/Atom";
import { ApiService } from "../modules/services/ApiService";
import { Amount } from "./Amount";
import { Button2 } from "./Button2";
import { InfoDialog } from "./Dialog";

export const ProductDetail = ({ product }) => {
    const [amount, setAmount] = useState(1)
    const userData = useRecoilValue(UserDataAtom);
    const [cartData, setCartData] = useRecoilState(CartDataAtom)
    const isLogged = useRecoilValue(IsLoggedAtom)
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const apiService = new ApiService();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div style={{
            background: "rgba(210, 193, 172, 0.9)",
            width: "100%",
            padding: "30px 20px 30px 20px",
            marginTop: "20vh",
        }}>
            <p style={{
                ...FontStyle,
                fontWeight: "bold",
                fontSize: "42px"
            }}>{product.name}</p>

            <div style={{
                height: "350px",
                width: "100%",
                margin: "15px 0 15px 0",
                ...FlexRow
            }}>
                <img style={{
                    height: "100%",
                    width: "40%",
                    border: "1px solid black"
                }} src={product.image} />

                <div style={{
                    height: "100%",
                    width: "60%",
                    paddingLeft: "15vw",
                    ...FlexColumn,
                    justifyContent: "space-around",
                }}>
                    <p style={{
                        ...FontStyle,
                        fontWeight: "bold",
                        fontSize: "36px"
                    }}>Rp.{amount != 0 ? product.price * amount : product.price}</p>
                    <div style={{
                        width: "100%",
                        ...FlexRow,
                    }}>
                        <Amount amount={amount} onRemove={() => amount > 1 ? setAmount(amount - 1) : setAmount(amount)} onAdd={() => setAmount(amount + 1)} />
                        <div style={{ width: "30px" }}></div>
                        {isLoading ?
                            <div style={{ height: "100%", width: "100%", ...FlexColumn, justifyContent: "center", alignItems: "center" }}>
                                <CircularProgress />
                            </div>
                            :
                            <Button2 color="#C2DDD7" text="Add To Cart" onClick={async () => {
                                if (!isLogged) {
                                    history.replace('/login');
                                }

                                if (!cartData.some(item => item.productName == product.name)) {
                                    setIsLoading(true);
                                    const res = await apiService.addCartItem({
                                        product_id: product.id,
                                        amount: amount,
                                        token: userData.token
                                    });
                                    setCartData(prev => [...prev, {
                                        id: product.id,
                                        productName: product.name,
                                        productImage: product.image,
                                        productPrice: product.price * amount,
                                        amount: amount
                                    }]);
                                    setIsLoading(false);
                                    setOpen(true);
                                }

                                // const res = apiService.getCartList({id: userData.id});
                                // const data = res['data'];
                            }} />
                        }
                    </div>
                    <div style={{
                        ...FontStyle,
                        fontSize: "24px"
                    }}>
                        {product.description}
                    </div>
                </div>
            </div>
            <InfoDialog isOpen={open} title="Item added to cart !" content="Let's buy something else :)" onClose={handleClose} />
        </div>
    );
}