import React, {useState} from 'react';
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
    let [disable, setDisable] = useState<boolean>(false)
    let [maxValue, setMaxValue] = useState<number>(5)
    let [error, setError] = useState<boolean>(false)


    // increase or reset button clicks
    function increaseValue() {
        if (startValue === maxValue - 1) {
            setDisable(true)
        }
        setStartValue(startValue + 1)

    }

    function resetValue() {
        setStartValue(0)
        setDisable(false)
    }


    // Button component items
    const buttonsItem: buttonItemType[] = [
        {id: v1(), title: 'increase', function: increaseValue, disable: disable},
        {id: v1(), title: 'reset', function: resetValue, disable: false},
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


    function addStartValue(value: number) {
        setError(false)
        if (value >= maxValue) {
            setDisable(true)
            setError(true)
        } else {
            setStartValue(value)
            setDisable(false)
        }
    }

    function addMaxValue(value: number) {
        debugger
        setError(false)
        if (value <= startValue) {
            setDisable(true)
            setError(true)
        } else {
            setMaxValue(value)
            setDisable(false)
        }
    }

    const inputs = inputItem.map(i => {
        return (
            <div key={i.id}>
                <Inputs id={i.id} title={i.title} function={i.function} value={i.value}/>
            </div>
        )
    })


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
                    <button>set</button>
                </div>
            </div>
        </div>
    )
}

export default App;
