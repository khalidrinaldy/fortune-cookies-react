import { MdAdd, MdRemove } from "react-icons/md";
import { FlexRow, FontStyle } from "../core/constant/Styles";

export const Amount = ({amount, onRemove, onAdd}) => {
    return (
        <div style={{
            background: "#D2D5E1",
            border: "1 solid black",
            boxSizing: "border-box",
            borderRadius: "25px",
            ...FlexRow,
            justifyContent: "space-around",
            alignItems: "center",
            width: "200px"
        }}>
            <MdRemove size="30px" color="black" style={{cursor: "pointer"}} onClick={onRemove} />
            <p style={{...FontStyle, fontSize: "30px"}}>{amount}</p>
            <MdAdd size="30px" color="black" style={{cursor: "pointer"}} onClick={onAdd} />
        </div>
    );
}