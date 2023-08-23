export type RFState = {
  edges: any[];
  setEdges: (eds: any) => void;
  nodes: any[];
  setNodes: (nds: any) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
};