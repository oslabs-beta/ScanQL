// import { query } from 'express';
// import { type } from 'os';
import { create } from 'zustand';

export type TableInfo = {
  tableName: string;
  numberOfRows: number;
  numberOfIndexes: number;
  numberOfFields: number;
  numberOfForeignKeys: number;
  numberOfPrimaryKeys: number;
  checkConstraints: object;
  foreignKeysObj: object;
  primaryKeysObj: object;
  sampleData: object;
  columnDataTypes: string[];
};
export type CustomTableInfo = {
  nodeType: string;
  actualRows: number;
  actualLoops: number;
  sharedHitBlocks: number;
  sharedReadBlocks: number;
  totalCosts: number;
  startUpCosts: number;
};

type DatabaseInfo = {
  [tableName: string]: TableInfo;
};

type ExecTimeByOperation = {
  [operation: string]: {
    query: string;
    operation: string;
    median_exec_time: number;
    mean_exec_time: number;
    stdev_exec_time: number;
    min_exec_time: number;
    max_exec_time: number;
    execution_count: number;

  }
}
type SlowestTotalMedianMean = {
  [query: string]: {
    query: string;
    median: number;
    mean: number;
  };
};
type SlowestCommonMedianMean = {
  [query: string]: {
    query: string;
    median: number;
    mean: number;
    count: number;
  };
};

interface AppState {
  isConnectDBOpen: boolean;
  dbName: string;
  uri: string;
  queryString: string
  customQueryData: {
    nodeType: string,
    sharedHitBlocks: number,
    sharedReadBlocks: number,
    cacheSize: number,
    workingMem: number,
    actualRows: number,
    actualLoops: number,
    totalCosts: number,
    startUpCosts: number,
    labelsArr: number[],
    planningTimesArr: number[],
    executionTimesArr: number[],
    totalTimesArr: number[],
    overallMeanTimesLabels: string[],
    overallMeanTimesArr: number[],
    queryString: string,
    customMetrics: object,
    queryDelay: number,
    queryCount: number,
  };
  customQueryValid: boolean;
  isDBConnected: boolean;
  isModalOpen: boolean;
  errorMessage: string;
  invalidURIMessage: boolean;
  metricsData: {
    databaseInfo: DatabaseInfo;
    executionPlans: object;
    dbSizeMetrics: {
      tableSizes: object;
      indexSizesByTable: object;
      tableNames: string[];
      totalDatabaseSize: string;
      activeConnections: number;
    };
    dbHistMetrics: {
      slowestTotalQueries: SlowestTotalMedianMean,
      slowestCommonQueries: SlowestCommonMedianMean,
      execTimesByOperation: ExecTimeByOperation,
    };
  }

  view: 'metrics' | 'erd' | 'custom' | 'loading';

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  openModal: () => void;
  closeModal: () => void;


  openConnectDB: () => void;
  closeConnectDB: () => void;
  setView: (view: 'metrics' | 'erd' | 'custom' | 'loading') => void;

  setDBName: (dbName: string) => void;
  setUri: (uri: string) => void;
  setIsDBConnected: (isDBConnected: boolean) => void;
  // change custom query state
  setQuery: (query: string) => void;
  setCustomQueryValid: (customQueryValid: boolean) => void;
  toNumInKB: (size: string) => number;
  connectToDatabase: (uri: string, dbName: string) => Promise<void>;
  //For the custom query view 
  setCustomQueryResults: (data: any) => void;
  sendCustomQuery: (uri: string, query: string) => Promise<void>
}


const useAppStore = create<AppState>((set) => ({
  // username: '',
  //password: '',
  // isLoggedIn: false,
  isConnectDBOpen: false,
  isModalOpen: false,
  dbName: '',
  uri: '',
  queryString: '',
  customQueryData: {
    nodeType: '',
    sharedHitBlocks: -1,
    sharedReadBlocks: -1,
    cacheSize: -1,
    workingMem: -1,
    actualRows: -1,
    actualLoops: -1,
    totalCosts: -1,
    startUpCosts: -1,
    labelsArr: [],
    planningTimesArr: [],
    executionTimesArr: [],
    totalTimesArr: [],
    overallMeanTimesLabels: [],
    overallMeanTimesArr: [],
    queryString: '',
    customMetrics: {},
    queryDelay: -1,
    queryCount: -1,
  },
  isDBConnected: false,
  invalidURIMessage: false,
  customQueryValid: false,
  errorMessage: '',
  metricsData: {
    databaseInfo: {},
    executionPlans: {},
    dbSizeMetrics: {
      tableSizes: {},
      indexSizesByTable: {},
      tableNames: [],
      totalDatabaseSize: '',
      activeConnections: 0,
    },
    dbHistMetrics: {
      slowestTotalQueries: {},
      slowestCommonQueries: {},
      execTimesByOperation: {},
    }
  },

  // default initialize view state to metrics
  view: 'metrics',

  //set default to light
  theme: 'light',

  //toggle light/dark mode
  toggleTheme: () => { set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })); },

  openConnectDB: () => set({ isConnectDBOpen: true }),
  closeConnectDB: () => set({ isConnectDBOpen: false }),
  setView: (view) => set({ view }), // method to set viewState

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setDBName: (dbName: string) => set({ dbName }),
  setUri: (uri: string) => set({ uri }),
  setQuery: (queryString: string) => set({ queryString }),
  setIsDBConnected: (isDBConnected) => set({ isDBConnected }),

  setMetrics: (metricsData: { databaseInfo: DatabaseInfo, executionPlans: {}, dbSizeMetrics: { tableSizes: {}, indexSizesByTable: {}, tableNames: [], totalDatabaseSize: '', activeConnections: 0 } }) => set({ metricsData }),

  // helper function for converting string numbers with units to number in kb
  // only converts to kb. could be refactored to loop through all the size units and find the one that is the most common, than proivde different scenarios for converting to each unit (kb, mb, gb); use a cache to store quantities of found unit tied to the unit as the key. 
  toNumInKB: (size: string): number => {
    let num = '';
    for (const char of size) {
      if (/[0-9]/.test(char)) num += char;
      else break;
    }
    // check if bytes, convert accordingly and return
    if (size.toLowerCase().includes('bytes')) return parseInt(num) / 1000;
    // check if mB, convert accordingly and return
    if (size.toLowerCase().includes('mb')) return parseInt(num) * 1000;
    // return num if already kb
    return parseInt(num);
  },

  // connect to database and fetch metrics data
  connectToDatabase: async (uri, dbName) => {
    try {
      set({ view: 'loading' });
      const response = await fetch('/api/pg/dbInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri, dbName, }),
      });
      if (response.status === 200) {
        set({ isDBConnected: true, errorMessage: '' });
        const data = await response.json();
        set({ metricsData: data });
        set({ view: 'metrics' });
      } else if (response.status === 400) {
        const res = await response.json();
        set({ view: 'metrics' });
        set({ isConnectDBOpen: true });
        // add a view for invalid uri
        set({ invalidURIMessage: true })
        console.log(res.error)
        set({ isDBConnected: false, errorMessage: 'Failed to connect to the database.' });
      } else {
        set({ isDBConnected: false, errorMessage: 'Failed to connect to the database.' });
      }
    } catch (error) {
      set({ isDBConnected: false, errorMessage: 'Error connecting to the database.' });
    }
  },
  // set custom queryString state
  setCustomQueryValid: (customQueryValid) => set({ customQueryValid }),

  // set custom queryString results
  setCustomQueryResults: async (queryString) => {
    console.log('this is the custom queryString:', queryString)
  },

  // fetch custom query results
  sendCustomQuery: async (uri: string, queryString: string) => {
    try {
      console.log('this is uri', uri);
      set({ view: 'loading' });
      const response = await fetch('/api/pg/customQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri, queryString }),
      });
      if (response.status === 200) {
        set({ customQueryValid: true, errorMessage: '' });
        console.log('Valid Query String',);

      } else {
        set({ customQueryValid: false, errorMessage: 'Failed to query database.' });
        console.log('Invalid Query String');
        return;
      }
      const data = await response.json();
      console.log('metrics object is ', data);
      set({ customQueryValid: data });
      set({ customQueryData: data });
      set({ view: 'custom' });
    } catch (error) {
      set({ customQueryValid: false, errorMessage: 'Error connecting to the database.' });
    }
  },



  // now using authO for login

  // loginUser: (username, password) => {
  //   fetch('/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password: password.toString() }), // need to convert to string bc json does not have distinction between number and string?
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         set({ username, password, isLoggedIn: true });
  //       } else {
  //         console.log('login failed', data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('error occurred:', err);
  //     });
  // },
  // logoutUser: () => set({ username: '', isLoggedIn: false }),


}));

export default useAppStore;


