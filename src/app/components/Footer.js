import { FlexRow, FontStyle } from "../core/constant/Styles";
import {SocialIcon} from "react-social-icons"

export const Footer = () => {
    return (
        <footer style={{
            height: "120px",
            width: "100%",
            background: "#B9B99F",
            paddingLeft: "60px",
            paddingTop: "10px",
        }}>
            <p style={{ ...FontStyle, marginBottom: "10px", fontSize: "26px"}}>Follow Us in other platform</p>
            <div style={{ ...FlexRow, alignItems: "center"}}>
                <SocialIcon url="https://facebook.com" label="Fortune Cookies Indonesia" />
                <p style={{ ...FontStyle }}>Fortune Cookies Indonesia</p>
                <div style={{width: "100px"}}></div>
                <SocialIcon url="https://instagram.com" label="Fortune Cookies Indonesia" />
                <p style={{ ...FontStyle }}>Fortune Cookies Indonesia</p>
                {/* <div style={{ ...FlexRow }}>
                    <MdFacebook />
                    <p style={{ ...FontStyle }}>Fortune Cookies Indonesia</p>
                </div>
                <div style={{ ...FlexRow }}>
                    <MdFacebook />
                    <p style={{ ...FontStyle }}>Fortune Cookies Indonesia</p>
                </div> */}
            </div>
        </footer>
    );
}