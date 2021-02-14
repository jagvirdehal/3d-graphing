import { useStore } from 'store';

function VectorGroup() {
    const vectors = useStore(state => state.vectors);

    return(
        <group>
            {vectors}
        </group>
    )
}

export default VectorGroup;
