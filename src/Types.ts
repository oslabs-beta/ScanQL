export type RFState = {
  edges: any[];
  setEdges: (eds: any) => void;
  nodes: any[];
  setNodes: (nds: any) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  style: {strokeWidth: number; stroke: string};
  markerEnd: {
    type: string;
    width: number;
    height: number;
    color: string;
  };
  type: string;
};

export interface IndexItem {
  [key: string]: any;
}

export type RowsInfo = {
  tableName: string;
  numberOfRows: number;
};

export type RowsInfoArray = RowsInfo[];

export type indexInfo = {
  tableName: string;
  numberOfIndexes: number;
};

export type indexTableArray = indexInfo[];
