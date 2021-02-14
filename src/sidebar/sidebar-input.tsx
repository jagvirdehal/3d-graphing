import { CSSProperties, useState } from "react";
import { useStore } from "store";

function HeaderButtons(props) {
    const rowStyle : CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    return(
        <div style={rowStyle} className={"header-buttons"}>
            <button onClick={props.handleAdd}>Add</button>
            <button>Edit</button>
        </div>
    )
}

function NumberInput(props) {
    const numberStyle : CSSProperties = {
        width: '5ch',
        height: '4ch',
    };

    // Event handlers
    
    // Filters out non-numeric input, causes - to toggle negative
    const keyFilter = (event : React.KeyboardEvent<any>) => {
        const charCode = event.key.charCodeAt(0);
        const isNumber = (charCode >= 48 && charCode <= 57);

        if (event.key == '-') {
            event.currentTarget.value = -1 * parseInt(event.currentTarget.value);
            handleChange(event);
        }

        if (!isNumber) {
            event.preventDefault();
        }
    };

    // Limits value between -99 and 99
    const boundNumber = (event : React.ChangeEvent<any>) => {
        const number = parseInt(event.currentTarget.value);
        if (number < -99) {
            event.currentTarget.value = -99;
        } else if (number > 99) {
            event.currentTarget.value = 99;
        }
    }

    // Force value to be a number, 0 if NaN
    const forceNumber = (event : React.ChangeEvent<any>) => {
        const number = parseInt(event.currentTarget.value);
        event.currentTarget.value = number;

        if (Number.isNaN(number)) {
            event.currentTarget.value = 0;
        }
    };

    // Enabled changing value via scroll
    const scrollValue = (event : React.WheelEvent<any>) => {
        const number = parseInt(event.currentTarget.value);

        if (event.deltaY < 0) {
            event.currentTarget.value = number + 1;
        } else if (event.deltaY > 0) {
            event.currentTarget.value = number - 1;
        }
    };

    const handleChange = (event) => {
        forceNumber(event);
        boundNumber(event);
        props.updateVector(event);
    }

    const handleWheel = (event) => {
        scrollValue(event);
        boundNumber(event);
        props.updateVector(event);
    }

    return (
        <input {...props} style={numberStyle} onKeyPress={keyFilter} onWheel={handleWheel} onChange={handleChange} defaultValue={props.value} />
    )
}

function VectorInput(props) {
    const rowStyle : CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 10px',
    };

    const numberGroupStyle : CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    const vectorMap = useStore.getState().vectorMap;
    const myProps = vectorMap.get(props.name);
    const target = myProps?.target ? myProps.target : [0, 0, 0];

    const updateVector = useStore(state => state.updateVector);

    const [x, setX] = useState(target[0]);
    const [y, setY] = useState(target[1]);
    const [z, setZ] = useState(target[2]);

    if (myProps === undefined) {
        return(<span></span>);
    }

    let newProps = myProps;
    newProps.target = [x, y, z];
    
    updateVector(props.name, newProps);

    const updateTarget = (event, setFunc) => {
        setFunc(parseInt(event.currentTarget.value));
    }

    return(
        <div className="vector-input">
            <hr />
            <div style={rowStyle}>
                <span className="label">{props.name ? props.name.toUpperCase() : "V *"} </span>
                <div style={numberGroupStyle} className="number-input-group" >
                    <NumberInput className="x-coord" value={x} updateVector={event => updateTarget(event, setX)} />
                    <NumberInput className="y-coord" value={y} updateVector={event => updateTarget(event, setY)} />
                    <NumberInput className="z-coord" value={z} updateVector={event => updateTarget(event, setZ)} />
                </div>
                <button>Color</button>
            </div>
        </div>
    );
}

export { HeaderButtons, VectorInput };
