import React from "react";

export default function Error({error, reset}) {
    return(
        <>
        An error occured: {error.message}
        <button onClick = {()=> reset()}> Retry</button>
        </>
    );
}