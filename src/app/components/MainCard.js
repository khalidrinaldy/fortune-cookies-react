import Cookies from "../../assets/img/main-cookies.png";
import Cake from "../../assets/img/main-cake.png";
import Bread from "../../assets/img/main-bread.png";
import Chocolates from "../../assets/img/main-chocolates.png";
import { FontStyle } from "../core/constant/Styles";
import { useEffect, useState } from "react";

export const MainCard = ({ title, onClick }) => {
    const [image, setImage] = useState()
    const [hover, setHover] = useState(false);

    function toggleHover() {
        setHover(!hover);
    }

    useEffect(() => {
        if (title === "Cookies") {
            setImage(Cookies)
        } else if (title === "Cake") {
            setImage(Cake)
        } else if (title === "Bread") {
            setImage(Bread)
        } else if (title === "Chocolates") {
            setImage(Chocolates)
        }
    }, [])

    return (
        <div style={{
            width: "30vh",
            height: "30vh",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "15px",
            marginLeft: "auto",
            marginRight: "auto",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer"
        }} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={onClick} >
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: hover ? "scale(1.2)" : "scale(1.0)",
                transition: "all .5s"
            }}>
                <p style={{ ...FontStyle, color: "white", fontSize: "36px" }}>{title}</p>
            </div>
        </div>
    );
}