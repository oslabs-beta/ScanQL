import React, {useEffect} from 'react';
import ReactFlow, {Background, Controls} from 'reactflow';
import 'reactflow/dist/style.css';
import createNodes from './createNodes';
import createEdges from './createEdges';
import RFTable from './RFTable';
import useFlowStore from '../../store/flowStore';

const nodeTypes = {
    table: RFTable,
};
const masterData = ERDdata;

export default function Flow(): JSX.Element {
  const { edges, setEdges, nodes, setNodes, onNodesChange, onEdgesChange} = useFlowStore((state) => state);
    setNodes(createNodes(masterData))
    setEdges(createEdges(masterData))

    return (
        <div style = {{ height: '100%'}}>
            <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    )
};
