import React from 'react';
import { Spinner, Intent } from "@blueprintjs/core";

export default function LoadingIndicator(props) {
    return (
        <Spinner intent={Intent.PRIMARY} size="50" />
    );
}