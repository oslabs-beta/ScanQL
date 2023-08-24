import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import React, { useEffect } from 'react';
import 'reactflow/dist/base.css';
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
  const proOptions = { hideAttribution: true };

  useEffect(() => {
    setNodes(initialData);
    setEdges(initialEdges);
  }, [masterData, setNodes, setEdges]);

  return (
      <div style={{ height: '70vh', width: '167vh' }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          proOptions={proOptions}>
          {/* <MiniMap /> */}
          <Background />
          <Controls />
        </ReactFlow>
      </div>
  );
}
