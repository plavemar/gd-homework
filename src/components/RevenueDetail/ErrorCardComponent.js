import React from "react";
import { Card, CardContent } from "@material-ui/core";


const ErrorCardComponent = () => {

    return (<Card
            style={{maxWidth: 345}}>
            <CardContent>
                <h2> Calculations N/A </h2>
            </CardContent>
        </Card>
    );
};

export default ErrorCardComponent;