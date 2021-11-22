import React, { useState } from "react";
import "@fontsource/quantico"

function ItemCard({product}) {
    const [hover, setHover] = useState(false);

    function toggleHover() {
        setHover(!hover);
    }

    return (
        <div style={{
            width: "240px",
            height: "300px",
            border: "1px solid black",
            boxShadow: hover ? "4px 4px 4px rgba(0, 0, 0, 0.25)" : "",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
        }} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <img style={{width: "240px", height: "180px", objectFit: "cover", borderBottom: "1px solid black"}} src={product.image}></img>
            <div style={{ height: "120px", backgroundColor: "#EEE0CE", paddingLeft: "24px", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                <div style={{fontFamily: "Quantico", fontSize: "20px", overflow: "hidden", textOverflow: "ellipsis"}}>{product.name}</div>
                <p style={{fontFamily: "Quantico", fontSize: "18px"}}>Rp.{product.price}</p>
            </div>
        </div>
    );
}

export default ItemCard;