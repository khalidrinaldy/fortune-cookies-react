
import { fontStyle } from "@mui/system";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import SimpleReactValidator from "simple-react-validator";
import logo from "../../../../assets/img/logo.png";
import { InfoDialog } from "../../../components/Dialog";
import { buttonStyle, FlexCenterHorizontal, FlexColumn, inputStyle, labelStyle, LogoStyle } from "../../../core/constant/Styles";
import { ApiService } from "../../services/ApiService";
import { BodyLogin, LoginCard } from "../../styles/authentication/login.styles";
import { UserDataAtom } from '../../../data/provider/Atom';

function LoginView() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [, forceUpdate] = useState();
    const validator = useRef(new SimpleReactValidator())
    const apiService = new ApiService()
    const [open, setOpen] = useState(false);
    const [messageDialog, setMessageDialog] = useState({})
    const history = useHistory()

    const checkLogged = async () => {
        const res = await apiService.getUser()
        if (res != null) {
            history.replace("/")
            window.location.reload()
        }
    };

    const handleClose = () => {
        setOpen(false);
    }

    async function login() {
        if (!validator.current.allValid()) {
            validator.current.showMessages();
            forceUpdate(1);
        } else {
            let res = await apiService.login(username, password)
            console.log(res);
            if (res["error"]) {
                setMessageDialog({
                    "title": "Login Failed",
                    "content": res["message"]
                })
                setOpen(true)
            } else {
                localStorage.setItem("user", JSON.stringify({
                    "ID": res["data"]["ID"],
                    "token": res["data"]["token"]
                }))
                history.replace("/")
                window.location.reload()
            }
        }
    }

    async function register() {
        if (!validator.current.allValid()) {
            validator.current.showMessages();
            forceUpdate(1);
        } else {
            let res = await apiService.register(username, password)
            if (res["error"]) {
                setMessageDialog({
                    "title": "Register Failed",
                    "content": res["message"]
                })
                setOpen(true)
            } else {
                setMessageDialog({
                    "title": "Register Success",
                    "content": "You can login now"
                });
                setOpen(true)
                forceUpdate(1)
            }
        }
    }

    useEffect(() => {
        checkLogged()
    }, [])

    return (
        <div style={BodyLogin}>
            <div style={LoginCard}>
                <div style={FlexCenterHorizontal}>
                    <img src={logo} style={{ ...LogoStyle, marginTop: "20px" }} />
                </div>
                <div style={FlexCenterHorizontal}>
                    <div style={{ ...FlexColumn }}>
                        <p style={{ ...labelStyle, marginTop: "10px", fontSize: "20px" }}>Username</p>
                        <input type="text" style={{ ...inputStyle, width: "100%" }} value={username} onChange={e => setUsername(e.target.value)} />
                        <p style={{ ...fontStyle, color: "red" }}>{validator.current.message('username', username, 'required|alpha')}</p>

                        <p style={{ ...labelStyle, marginTop: "10px", fontSize: "20px" }}>Password</p>
                        <input type="password" style={{ ...inputStyle, width: "100%" }} value={password} onChange={e => setPassword(e.target.value)} />
                        <p style={{ ...fontStyle, color: "red" }}>{validator.current.message('password', password, 'required|min:8')}</p>

                        <div style={{ display: "flex", justifyContent: "space-between", height: "60px", marginTop: "60px" }}>
                            <button style={{ ...buttonStyle, background: "#EEE9C8", width: "130px" }} onClick={login} >Login</button>
                            <button style={{ ...buttonStyle, background: "#D0B89E", width: "130px" }} onClick={register}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
            <InfoDialog isOpen={open} onClose={handleClose} title={messageDialog["title"]} content={messageDialog["content"]} />
        </div>
    );
}

export default LoginView