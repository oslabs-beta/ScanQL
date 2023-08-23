//
// State Management for React Flow
// 
import { create } from 'zustand';
import {
    Edge, 
    EdgeChange, 
    Node, 
    NodeChange, 
    OnNodesChange,
    OnEdgesChange, 
    applyNodeChanges, 
    applyEdgeChanges
} from 'reactflow';

//Types
type RFState = {
  edges: Edge[];
  setEdges: (eds: any) => void;
  nodes: Node[];
  setNodes: (nds: any) => void;
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
};

// import initialNodes and initialEdges to be used

const useFlowStore = create<RFState>((set, get) => ({
    edges: [],
    setEdges: (eds) => set((state) => ({...state, edges: eds})),
    nodes: [],
    setNodes: (nds) => set((state) => ({...state, nodes: nds})),

    onNodesChange: (changes: NodeChange[]) => set((state) => ({...state, nodes: applyNodeChanges(changes, get().nodes),
    })),

    onEdgesChange: (changes: EdgeChange[]) => set((state) => ({...state, edges: applyEdgeChanges(changes, get().edges), 
    }))
})
);

export default useFlowStore