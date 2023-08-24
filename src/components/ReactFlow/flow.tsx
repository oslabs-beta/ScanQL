import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import React, { useEffect } from 'react';
import 'reactflow/dist/style.css';
import createNodes from './createNodes';
import createEdges from './createEdges';
import RFTable from './RFTable';
import useAppStore from '../../store/appStore';
import useFlowStore from '../../store/flowStore';

import '../../../tailwind.config.js'


const nodeTypes = {
  table: RFTable,
};

export default function Flow(): JSX.Element {
  const { edges, setEdges, nodes, setNodes, onNodesChange, onEdgesChange } =
    useFlowStore((state) => state);

  const { metricsData } = useAppStore();
  const masterData = metricsData.erDiagram;
  const initialData = createNodes(masterData);
  const initialEdges = createEdges(masterData);

  useEffect(() => {
    setNodes(initialData);
    setEdges(initialEdges);
  }, [masterData, setNodes, setEdges]);

  return (
      <div style={{ height: '68vh', width: '167vh' }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView>
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
  );
}
