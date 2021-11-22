import React from 'react';

class Button extends React.Component {
    render() { 
        const buttonStyle = {
            backgroundColor: this.props.data.color,
            width: "200px",
            height: "55px",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "15px",
            fontFamily: "Quantico",
            fontSize: "30px",
            color: 'black',
            border: "1px solid transparent",
            cursor: "pointer"
        }
        return <button style={buttonStyle} onClick={this.props.data.onClick}>
            {this.props.data.text}
        </button>;
    }
}
 
export default Button;