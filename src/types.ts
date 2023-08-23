export type RFState = {
    edges: any[];
    setEdges: (eds: any) => void;
    nodes: any[];
    setNodes: (nds: any) => void;
    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    onConnect: (connection: any) => void;
};
import { TableInfo } from './store/appStore'

export type RowsInfo = {
    tableName: string;
    numberOfRows: number;
}

export type RowsInfoArray = RowsInfo[];

export type indexInfo = {
    tableName: string;
    numberOfIndexes: number;
}

export type indexTableArray = indexInfo[];





