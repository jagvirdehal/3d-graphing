import { useState } from 'react';
import { useStore } from 'store';
import { HeaderButtons, VectorInput } from './sidebar-input';
import './sidebar.css';

function Sidebar() {
    const vectorMap = useStore.getState().vectorMap;
    const defaultNames = Array.from(vectorMap.values()).map((props) => {
        return props.name;
    })
    
    const [vectorNames, setVectorNames] = useState(defaultNames);
    const inputs = vectorNames.map((name) => {
        return <VectorInput name={name} />;
    })

    const addVector = useStore(state => state.addVector);
    const handleAdd = (event) => {
        const myName = `v${vectorNames.length + 1}`;
        addVector({target: [0, 0, 1], name: myName});
        setVectorNames(vectorNames.slice().concat([myName]));
    }

    return(
        <div className="sidebar">
            <HeaderButtons handleAdd={handleAdd} />
            {inputs}
        </div>
    )
}

export default Sidebar;
