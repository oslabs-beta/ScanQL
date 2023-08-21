import React, {useEffect} from 'react';
import ReactFlow, {Background, Controls} from 'reactflow';
import 'reactflow/dist/style.css';
import useFlowStore from '../../store/flowStore';
export default function Flow(): JSX.Element {
  const { edges, setEdges, nodes, setNodes, onNodesChange, onEdgesChange, onConnect } = useFlowStore((state) => state);
    return (
        <div style = {{ height: '100%'}}>
            <ReactFlow>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    )
};
