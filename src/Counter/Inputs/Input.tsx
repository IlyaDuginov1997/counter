import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type InputsPropsType = {
    id: string
    title: string
    value: number
    function: (value: number) => void
}

export function Inputs(props: InputsPropsType) {

    let [value, setValue] = useState<number>(props.value)
    let [error, setError] = useState<boolean>(false)

    function changeValue(e: ChangeEvent<HTMLInputElement>) {
        setError(false)
        const newValue = Number(e.currentTarget.value)
        if (!isNaN(newValue)) {
            setValue(newValue)
        } else {
            setError(true)

        }
    }

    function removeError() {
        setError(false)
    }

    function onEnterPresAddValue(e: KeyboardEvent<HTMLInputElement>) {
        if (e.charCode === 13) {
            props.function(value)
        }
    }

    return (
        <span>
            <h5>{props.title}</h5>
            <input
                value={value}
                onChange={changeValue}
                onBlur={removeError}
                onKeyPress={onEnterPresAddValue}/>
            {error && <div className={'error'}>Please, enter a valid value</div>}
        </span>

    )
}