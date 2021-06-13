import React from 'react';

type ButtonPropsType = {
    function: () => void
    disable: boolean
    title: string
}

export function Button(props: ButtonPropsType) {
    return (
        <span>
            <button onClick={props.function} disabled={props.disable}>{props.title}</button>
        </span>
    )
}