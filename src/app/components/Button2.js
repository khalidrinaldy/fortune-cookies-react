export const Button2 = ({color, text, onClick}) => {
    const buttonStyle = {
        backgroundColor: color,
        width: "200px",
        height: "55px",
        borderRadius: "25px",
        fontFamily: "Quantico",
        fontSize: "30px",
        color: 'black',
        border: "1px solid black",
        cursor: "pointer"
    }
    return <button style={buttonStyle} onClick={onClick}>
        {text}
    </button>;
}