import React from 'react';


export const Message = ({msg, bgColor}) => {
    let styles = {
        backgroundColor: bgColor,
        padding: "1rem",
        color: "#fff",
        width: "100%",
        marginBotom: "1rem",
        textAlign: "center",
        fontWeight: "bolder"
    };

    return ( 
        <div>
            <h2 style={styles}>{msg}</h2>
        </div>
     );
}
 
