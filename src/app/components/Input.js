import React from 'react';
import "@fontsource/quantico";

class TextInput extends React.Component {
    render() { 
        const labelStyle = {fontFamily: "Quantico", fontSize: "24px", color: "black", textAlign: "left"}
        const inputStyle = {
            width: "450px",
            height:"70px", 
            background: "#F5F5F5",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            border: "1px solid transparent",
            borderRadius: "15px",
            fontSize: "24px",
        };
        return (
            <div>
                <p style={labelStyle}>{this.props.data.label}</p>
                <input type={this.props.data.type} style={inputStyle}></input>
            </div>
        );
    }
}
 
export default TextInput;