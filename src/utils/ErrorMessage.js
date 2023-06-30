import React from 'react';

const ErrorMessage = ({res}) => {
    let styles = {
        backgroundColor: "#d87093",
        padding: "1rem",
        color: "#fff",
        width: "100%",
        marginBotom: "1rem",
        textAlign: "center",
        fontWeight: "bolder"
    }
    return ( 
        <div>
            <h2 style={styles}>
                {`Error ${res.status}: ${res.statusText || "Error 00"}`}
            </h2>
        </div>
     );
}
 
export default ErrorMessage;