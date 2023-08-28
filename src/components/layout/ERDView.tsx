import { Graph } from '../ReactFlow/Graph';
import Flow from '../ReactFlow/flow';
import React from 'react';

const ERDView: React.FC = () => {
  return (
    <div className="FlowContainer">
      <Flow/>
    </div>
  );
};

export default ERDView;