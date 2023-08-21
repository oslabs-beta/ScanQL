//
// State Management for React Flow
// 
import { create } from 'zustand';
import {
    Connection, 
    Edge, 
    EdgeChange, 
    Node, 
    NodeChange, 
    addEdge, 
    OnNodesChange,
    OnEdgesChange, 
    OnConnect, 
    applyNodeChanges, 
    applyEdgeChanges
} from 'reactflow';
import { RFState } from '../Types';

// import initialNodes and initialEdges to be used

const useFlowStore = create<RFState>((set, get) => ({
    edges: [],
    setEdges: (eds) => set((state) => ({...state, edges: eds})),
    nodes: [],
    setNodes: (nds) => set((state) => ({...state, nodes: nds})),

    onNodesChange: (changes) => set((state) => ({...state, nodes: applyNodeChanges(changes, get().nodes),
    })),

    onEdgesChange: (changes) => set((state) => ({...state, edges: applyEdgeChanges(changes, get().edges), 
    })),

    onConnect: (connection) => set((state) => ({...state, edges: addEdge(connection, get().edges),
    })),

})
);

export default useFlowStore