import ReactFlow, {Background, Controls} from 'reactflow';
import React, {useEffect} from 'react';
import 'reactflow/dist/style.css';
import createNodes from './createNodes';
import createEdges from './createEdges';
import RFTable from './RFTable';
import useAppStore from '../../store/appStore';
import useFlowStore from '../../store/flowStore';

const nodeTypes = {
  table: RFTable,
};

export default function Flow(): JSX.Element {
  const {edges, setEdges, nodes, setNodes, onNodesChange, onEdgesChange} =
    useFlowStore((state) => state);
  const {metricsData} = useAppStore();
  const masterData = metricsData.erDiagram;

  useEffect(() => {
    setNodes(createNodes(masterData));
    setEdges(createEdges(masterData));
  }, [masterData, setNodes, setEdges]);

  return (
    <div style={{height: '100%'}}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
