import { fontStyle } from "@mui/system";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import bgcookies from "../../../../assets/img/cookies.png"
import { Footer } from "../../../components/Footer";
import ItemCard from "../../../components/ItemCard";
import Navbar from "../../../components/Navbar";
import { ProductDetail } from "../../../components/ProductDetail";
import { FlexColumn, FlexRow } from "../../../core/constant/Styles";
import { Product } from "../../../data/models/Product.model";
import { ApiService } from "../../services/ApiService";
import CircularProgress from '@mui/material/CircularProgress';

export const Cookies = () => {
    const history = useHistory()
    const apiService = new ApiService()
    const [products, setProducts] = useState([])
    const [productDetail, setProductDetail] = useState()
    const [showDetail, setShowDetail] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const res = await apiService.getProduct({ category: "cookies" })
        const data = res['data']
        let items = []
        for (const index in data) {
            const product = new Product({
                id: data[index]["ID"],
                name: data[index]["product_name"],
                price: data[index]["product_price"],
                category: data[index]["product_category"],
                image: data[index]["product_image"],
                description: data[index]["product_description"]
            });
            items.push(product)
        }
        setProducts(items);
        setIsLoading(false);
    }, [])

    const clickShowDetail = (product) => {
        setProductDetail(product);
        setShowDetail(true);
    }

    return (
        isLoading ?
            <div style={{height: "100%", width: "100%", ...FlexColumn, justifyContent: "center", alignItems: "center"}}>
                <CircularProgress  />
            </div>
            :
            <div style={{
                backgroundImage: `url(${bgcookies})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
            }}>
                <Navbar />
                <div style={{
                    width: "50vw",
                    height: "50px",
                    background: "rgba(185, 185, 159, 0.95)",
                    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "0px 0px 25px 25px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    ...FlexRow,
                    justifyContent: "space-around",
                    alignItems: "center"
                }}>
                    <a style={{
                        ...fontStyle,
                        fontWeight: "bold",
                        cursor: "pointer"
                    }} onClick={() => {
                        history.replace("/cookies");
                    }} >Cookies</a>

                    <a style={{
                        ...fontStyle,
                        cursor: "pointer"
                    }} onClick={() => {
                        history.replace("/cake");
                    }}>Cake</a>

                    <a style={{
                        ...fontStyle,
                        cursor: "pointer"
                    }} onClick={() => {
                        history.replace("/bread");
                    }}>Bread</a>

                    <a style={{
                        ...fontStyle,
                        cursor: "pointer"
                    }} onClick={() => {
                        history.replace("/chocolates");
                    }}>Chocolates</a>
                </div>

                {showDetail ?
                    <ProductDetail product={productDetail} /> :
                    <div style={{
                        background: "rgba(210, 193, 172, 0.9)",
                        width: "100%",
                        padding: "30px 0 30px 0",
                        marginTop: "20vh",
                        display: "grid",
                        gridTemplateColumns: "auto auto auto auto",
                        justifyContent: "space-around",
                        rowGap: "30px"
                    }}>
                        {products.map((product, i) => <div onClick={() => clickShowDetail(product)}>
                            <ItemCard key={i} product={product} />
                        </div>)}
                    </div>}

                <Footer />
            </div>
    );
}