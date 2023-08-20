import React, {useEffect} from 'react';
import ReactFlow, {Background, Controls} from 'reactflow';
import 'reactflow/dist/style.css';

export default function Flow() {
    return (
        <div style = {{ height: '100%'}}>
            <ReactFlow>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    )
};
