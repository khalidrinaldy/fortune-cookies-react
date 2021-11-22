import { useHistory } from "react-router";
import background from "../../../../assets/img/bg-dashboard.png"
import { Footer } from "../../../components/Footer";
import { MainCard } from "../../../components/MainCard";
import Navbar from "../../../components/Navbar";
import { FlexColumn, FlexRow, FontStyle } from "../../../core/constant/Styles";

const Dashboard = () => {
    const textCenter = "“Happiness is baking cookies. Happiness is giving them away...and serving them, and eating them, talking about them, reading and writing about them, thinking about them, and sharing them with you.”"
    const history = useHistory()
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "100% 100%",
            width: "100%",
            height: "100%",
            position: "fixed"
        }}>
            <Navbar />

            <div style={{
                width: "100vh",
                height: "20vh",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                <div style={{
                    ...FontStyle,
                    width: "100vh",
                    height: "20vh",
                    background: "#E2E1DD",
                    opacity: "0.75",
                    borderRadius: "25px 25px 0 0",
                    textAlign: "center",
                    ...FlexColumn,
                    justifyContent: "center",
                    fontSize: "26px",
                    marginTop: "10vh",
                    position: "absolute",
                    zIndex: "1"
                }}>
                    {textCenter}
                </div>
            </div>
            <div style={{
                ...FlexRow,
                height: "400px",
                width: "100%",
                background: "#D2C1AC",
                opacity: "0.85",
                justifyContent: "space-evenly",
                alignItems: "center",
                position: "fixed",
                bottom: "10%"
            }}>
                <MainCard title="Cookies" onClick={() => {
                    history.push("/cookies");
                }} />
                <MainCard title="Cake" onClick={() => {
                    history.push("/cake");
                }} />
                <MainCard title="Bread" onClick={() => {
                    history.push("/bread");
                }} />
                <MainCard title="Chocolates" onClick={() => {
                    history.push("/chocolates");
                }} />
            </div>

            <div style={{
                bottom: 0,
                position: "fixed",
                width: "100%"
            }}><Footer /></div>
        </div>
    );
}

export default Dashboard;