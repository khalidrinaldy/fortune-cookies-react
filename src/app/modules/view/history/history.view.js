import { useTheme } from "@emotion/react"
import { Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { MdHistory, MdShoppingCart } from "react-icons/md"
import { useRecoilValue } from "recoil"
import { Button2 } from "../../../components/Button2"
import { Footer } from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import { FlexColumn, FlexRow, FontStyle } from "../../../core/constant/Styles"
import { DetailHistory } from "../../../data/models/DetailHistory.model"
import { HistoryModel } from "../../../data/models/History.model"
import { ApiService } from "../../services/ApiService"

export const HistoryView = () => {

    const apiService = new ApiService();
    const [historyList, setHistoryList] = useState([]);
    const [historyDetail, setHistoryDetail] = useState([]);
    const [openDetail, setOpenDetail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDialogOpen = () => setOpenDetail(true);
    const handleDialogClose = () => setOpenDetail(false);

    const getHistoryDetail = (history_id) => async () => {
        setIsLoading(true);
        const user = await JSON.parse(localStorage.getItem('user'))
        const res = await apiService.GetHistoryDetail({ history_id: history_id, token: user['token'] });
        if (res["error"]) {
            return console.error(res["data"]);
        }
        const data = res['data']
        let dumps = [];
        for (const index in data) {
            let detail = new DetailHistory(
                data[index]["Product_name"],
                data[index]["Product_image"],
                data[index]["Product_price"],
                data[index]["Amount"]
            );
            dumps.push(detail);
        }
        setHistoryDetail(dumps);
        setIsLoading(false);
        handleDialogOpen();
    }

    const getHistoryList = async () => {
        const user = await JSON.parse(localStorage.getItem('user'))
        const res = await apiService.GetAllHistory({ token: user['token'] });
        if (res["error"]) {
            return console.error(res["data"]);
        }
        const data = res["data"];
        let dumps = [];
        for (const index in data) {
            let convDate = parseDate(data[index]["CreatedAt"]);
            let history = new HistoryModel(
                data[index]["Id"],
                convDate,
                data[index]["Address"],
                data[index]["Total_price"]
            );
            dumps.push(history);
        }
        setHistoryList(dumps);
    }

    const parseDate = (time) => {
        let date = new Date(Date.parse(time));
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    useEffect(() => {
        setIsLoading(true);
        getHistoryList();
        setIsLoading(false);
    }, [])

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
                    <MdHistory size="36px" />
                    <div style={{ width: "15px" }}></div>
                    <p style={{
                        ...FontStyle,
                        fontWeight: "bold",
                        fontSize: "30px"
                    }}>Transaction History</p>
                </div>

                {
                    isLoading ?
                        <div style={{ height: "100%", width: "100%", ...FlexColumn, justifyContent: "center", alignItems: "center" }}>
                            <CircularProgress />
                        </div>
                        :
                        <div style={{
                            width: "100%",
                            ...FlexColumn,
                        }}>
                            {
                                historyList.length === 0 ?
                                    <div style={{
                                        margin: "15vh auto 0 auto",
                                        ...FontStyle,
                                        fontSize: "36px",
                                        fontWeight: "bold"
                                    }}>
                                        Your Transaction History Is Empty
                                    </div> :

                                    historyList.map((history, _) => <div style={{
                                        background: "#D2C1AC",
                                        height: "160px",
                                        width: "90%",
                                        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)",
                                        padding: "8px",
                                        marginBottom: "20px"
                                    }}>
                                        <div style={{
                                            ...FlexRow,
                                            alignItems: "center",
                                        }}>
                                            <MdShoppingCart size="30px" />
                                            <p style={{
                                                ...FontStyle,
                                                fontWeight: "bold",
                                                fontSize: "20px",
                                                marginLeft: "10px"
                                            }}>
                                                Ordered
                                            </p>
                                            <p style={{
                                                ...FontStyle,
                                                fontSize: "16px",
                                                marginLeft: "30px"
                                            }}>
                                                {history.createdAt}
                                            </p>
                                        </div>

                                        <div style={{
                                            width: "100%",
                                            ...FlexRow,
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            height: "100px",
                                        }}>
                                            <div style={{
                                                width: "50%",
                                                paddingTop: "20px",
                                                ...FontStyle,
                                                fontSize: "16px",
                                                height: "100%",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}>
                                                Alamat Pengiriman & Pembayaran: <br /> {history.address}
                                            </div>

                                            <Button2 text="Detail" color="#C2DDD7" onClick={getHistoryDetail(history.id)} />
                                        </div>

                                        <p style={{
                                            ...FontStyle,
                                            fontWeight: "bold",
                                            fontSize: "24px"
                                        }}>
                                            Total Price = Rp.{history.total_price}
                                        </p>
                                    </div>
                                    )

                            }
                        </div>
                }
            </div>

            <Dialog
                open={openDetail}
                onClose={handleDialogClose}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
                maxWidth={"md"}
                PaperProps={{ style: { backgroundColor: "#D2C1AC" } }}
            >
                <DialogTitle id="scroll-dialog-title">
                    <p style={{ ...FontStyle, fontSize: "26px", fontWeight: "bold" }}>
                        Transaction Detail
                    </p>
                </DialogTitle>

                <DialogContent
                    dividers={true}
                    id="scroll-dialog-description"
                    style={{ ...FlexColumn }}
                >
                    {
                        historyDetail.map((detail, _) =>
                            <div style={{ ...FlexRow, marginBottom: "15px" }}>
                                <img src={detail.product_image} style={{
                                    width: "120px",
                                    height: "80px",
                                    border: "1px solid black",
                                    marginRight: "20px",
                                }} />

                                <div style={{
                                    width: "70%",
                                    ...FlexColumn
                                }}>
                                    <p style={{
                                        ...FontStyle,
                                        fontSize: "24px"
                                    }}>{detail.product_name}</p>
                                    <p style={{
                                        ...FontStyle,
                                        fontSize: "24px"
                                    }}>{detail.amount} x Rp.{detail.product_price}</p>
                                </div>
                            </div>)
                    }
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>

            <Footer />
        </div>
    )
}