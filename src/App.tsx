import React, {useEffect, useState} from 'react';
import './App.css';
import {Value} from './Counter/Value/Value';
import {Button} from './Counter/Button/Button';
import {v1} from 'uuid';
import {Inputs} from './Counter/Inputs/Input';

const maxValues = v1()
const minValues = v1()

type buttonItemType = {
    id: string,
    title: string,
    function: () => void,
    disable: boolean
}

type inputItemType = {
    id: string,
    title: string,
    function: (value: number) => void
    value: number
}

function App() {
    let [startValue, setStartValue] = useState<number>(0)
    let [maxValue, setMaxValue] = useState<number>(1)

    let [disableInc, setDisableInc] = useState<boolean>(false)
    let [disableReset, setDisableReset] = useState<boolean>(false)
    let [disableSet, setDisableSet] = useState<boolean>(false)

    let [error, setError] = useState<boolean>(false)

    useEffect( () => {
        let newStartValue = localStorage.getItem('startValue')
        let newMaxValue = localStorage.getItem('maxValue')
        if (newStartValue) {
            // console.log(JSON.parse(newStartValue))
            setStartValue(JSON.parse(newStartValue))
        }
        if (newMaxValue) {
            // console.log(JSON.parse(newMaxValue))
            setMaxValue(JSON.parse(newMaxValue))
        }
    }, [])


    // increase or reset button clicks
    function increaseValue() {
        if (startValue === maxValue - 1) {
            setDisableInc(true)
        }
        setStartValue(startValue + 1)

    }

    function resetValue() {
        setStartValue(0)
        setDisableInc(false)
    }


    // Button component items
    const buttonsItem: buttonItemType[] = [
        {id: v1(), title: 'increase', function: increaseValue, disable: disableInc},
        {id: v1(), title: 'reset', function: resetValue, disable: disableReset},
    ]

    const buttons = buttonsItem.map(b => {
        return (
            <div key={b.id}>
                <Button function={b.function} disable={b.disable} title={b.title}/>
            </div>
        )
    })


    // Inputs component
    const inputItem: inputItemType[] = [
        {id: minValues, title: 'start value', function: addStartValue, value: startValue},
        {id: maxValues, title: 'max value', function: addMaxValue, value: maxValue},
    ]

    function offAllButtons() {
        setDisableInc(true)
        setDisableReset(true)
        setDisableSet(true)
    }

    function onAllButtons() {
        setDisableInc(false)
        setDisableReset(false)
        setDisableSet(false)
    }

    function addStartValue(value: number) {
        setStartValue(value)
        setError(false)
        if (value >= maxValue) {
            offAllButtons()
            setError(true)
        } else {
            onAllButtons()
        }
    }

    function addMaxValue(value: number) {
        setMaxValue(value)
        setError(false)
        if (value <= startValue) {
            offAllButtons()
            setError(true)
        } else {
            onAllButtons()
        }
    }

    const inputs = inputItem.map(i => {
        return (
            <div key={i.id}>
                <Inputs id={i.id} title={i.title} function={i.function} value={i.value}/>
            </div>
        )
    })

    function setToLocalStorage() {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }


    // UI
    return (
        <div className={'container'}>
            <div className={'block1'}>
                <div className={'value'}>
                    <Value startValue={startValue} maxValue={maxValue} error={error}/>
                </div>
                <div className={'buttons-inc-res'}>
                    {buttons}
                </div>

            </div>
            <div className={'block2'}>
                {inputs}
                <div>
                    <Button function={setToLocalStorage} disable={disableSet} title={'set'}/>
                </div>
            </div>
        </div>
    )
}

export default App;
