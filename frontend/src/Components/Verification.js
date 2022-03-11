import React from "react";

export default function Verification(props) {
    return (<div>
        <h3>CODE : {props.code}</h3>
    </div>);
}
Verification.defaultProps = {
    code : '000000'
}