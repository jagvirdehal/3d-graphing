import create from 'zustand';
import Vector, { VectorProps } from './scene/vector';

export type State = {
    vectorMap: Map<string, VectorProps>,
    vectors: JSX.Element[],
    addVector: (props: VectorProps) => void,
    updateVector: (name: string, props: VectorProps) => void,
    refresh: () => void,
}

export const useStore = create<State>(set => ({
    vectorMap: new Map([["v1", {target: [1, 1, 1], name: "v1"}]]),
    vectors: [],
    
    addVector: (props : VectorProps) => {
        set(state => {
            state.refresh();
            return {vectorMap: state.vectorMap.set(props.name, props)}
        });
    },
    
    updateVector: (name : string, props : VectorProps) => {
        set(state => {
            state.refresh();
            return {vectorMap: state.vectorMap.set(name, props)}
        });
    },

    refresh: () => {
        set(state => ({vectors: Array.from(state.vectorMap.values()).map((props) => {
            return <Vector {...props} />
        }) as []}))
    }
}));
