import { darkGreen } from "../core/constant/Colors";
import logo from "../../assets/img/logo.png";
import { MdLogin, MdShoppingCart, MdPerson } from "react-icons/md"
import { FontStyle, LogoStyle } from "../core/constant/Styles";
import { useRecoilValue } from "recoil";
import { CartDataAtom, IsLoggedAtom, UserDataAtom } from "../data/provider/Atom";
import { Link, useHistory } from "react-router-dom";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function Navbar() {
    const userData = useRecoilValue(UserDataAtom)
    const isLogged = useRecoilValue(IsLoggedAtom)
    const cartData = useRecoilValue(CartDataAtom)
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <nav style={{ backgroundColor: darkGreen, height: "150px", width: "100%", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)", display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "30px", paddingRight: "30px" }}>
            {isLogged ?
                <div style={{ display: "flex", width: "150px", cursor:"pointer" }} onClick={handleOpenMenu} >
                    <MdPerson size="30px" color="black" />
                    <p style={{
                        ...FontStyle,
                        fontSize: "20px",
                    }}>{userData.email}</p>
                </div> :
                <Link to="/login" style={{
                    textDecoration: "none"
                }}>
                    <div style={{ display: "flex", width: "150px" }} >
                        <MdLogin size="30px" color="black" />
                        <p style={{
                            ...FontStyle,
                            fontSize: "20px",
                        }}>Login</p>
                    </div>
                </Link>
            }
            <Menu
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <img src={logo} style={{ ...LogoStyle, cursor: "pointer" }} onClick={() => {
                history.push("/");
            }} />
            {isLogged ?
                <div style={{ width: "150px", cursor: "pointer" }} onClick={() => {
                    history.push("/cart");
                }}>
                    <Badge color="primary" badgeContent={cartData.length} >
                        <MdShoppingCart size="30px" color="black" />
                    </Badge>
                </div> :
                <div style={{ width: "150px" }}></div>}
        </nav>
    );
}

export default Navbar;