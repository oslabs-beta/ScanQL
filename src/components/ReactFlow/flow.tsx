import ReactFlow, { Background, Controls } from 'reactflow';
import { useEffect } from 'react';
import 'reactflow/dist/base.css';
import createNodes from './createNodes';
import createEdges from './createEdges';
import RFTable from './RFTable';
import useAppStore from '../../store/appStore';
import useFlowStore from '../../store/flowStore';
import { SmartBezierEdge } from '@tisoap/react-flow-smart-edge'; 
import { SmartStraightEdge } from '@tisoap/react-flow-smart-edge'; 
import { SmartStepEdge } from '@tisoap/react-flow-smart-edge'; 

import '../../../tailwind.config.js'


const nodeTypes = {
  table: RFTable,
};

const edgeTypes = {
  smart: SmartBezierEdge,
  smartStraight: SmartStraightEdge,
  smartStep: SmartStepEdge
}

export default function Flow(): JSX.Element {
  const { edges, setEdges, nodes, setNodes, onNodesChange, onEdgesChange } =
    useFlowStore((state) => state);

  const { metricsData, theme } = useAppStore();
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
          edgeTypes={edgeTypes}
          fitView
          proOptions={proOptions}>
          <Background />
          <Controls style={{background: theme === 'dark' ?  'rgb(255,255,255,0.3)' : undefined }}/>
        </ReactFlow>
      </div>
  );
  }