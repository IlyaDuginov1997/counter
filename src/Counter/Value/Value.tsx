import React from 'react';

type ValuePropsType = {
    startValue: number
    maxValue: number
    error: boolean
}

export function Value(props: ValuePropsType) {
    return (
        <div>
            {props.error
                ? <div className={'error'}>Please, enter a valid value</div>
                : <h3 className={(props.startValue === props.maxValue) ? 'bold' : ''}>{props.startValue}</h3>}
        </div>
    )
}