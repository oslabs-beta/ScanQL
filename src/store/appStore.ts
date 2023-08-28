import { type } from 'os';
import { create } from 'zustand';

export type TableInfo = {
  tableName: string;
  numberOfRows: number;
  numberOfIndexes: number;
  numberOfFields: number;
  numberOfForeignKeys: number;
};

type DatabaseInfo = {
  [tableName: string]: TableInfo;
};



// type executionPlans = {
//   {}
// }


interface AppState {
  isConnectDBOpen: boolean;
  dbName: string;
  uri: string;
  isDBConnected: boolean;
  isModalOpen: boolean;
  errorMessage: string;
  metricsData: {
    databaseInfo: DatabaseInfo;
    executionPlans: {};
    dbSizeMetrics: {
      tableSizes: {};
      indexSizesByTable: {};
      tableNames: string[];
      totalDatabaseSize: string;
      activeConnections: number;
    };
  }

  view: 'metrics' | 'erd' | 'loading';

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  openModal: () => void;
  closeModal: () => void;

  openConnectDB: () => void;
  closeConnectDB: () => void;
  setView: (view: 'metrics' | 'erd') => void;

  setDBName: (dbName: string) => void;
  setUri: (uri: string) => void;
  setIsDBConnected: (isDBConnected: boolean) => void;
  toNumInKB: (size: string) => number;
  connectToDatabase: (uri: string, dbName: string) => Promise<void>;
}


const useAppStore = create<AppState>((set) => ({
  // username: '',
  //password: '',
  // isLoggedIn: false,
  isConnectDBOpen: false,
  isModalOpen: false,
  dbName: '',
  uri: '',
  isDBConnected: false,
  errorMessage: 'string',
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
  },

  // default initialize view state to metrics
  view: 'metrics',

  //set default to light
  theme: 'light',

  //toggle light/dark mode
  toggleTheme: () => { set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })) },

  openConnectDB: () => set({ isConnectDBOpen: true }),
  closeConnectDB: () => set({ isConnectDBOpen: false }),
  setView: (view) => set({ view }), // method to set viewState
  
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setDBName: (dbName: string) => set({ dbName }),
  setUri: (uri: string) => set({ uri }),
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

  connectToDatabase: async (uri, dbName) => {
    try {
      set({ view: 'loading' })
      const response = await fetch('/api/pg/dbInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri, dbName, }),
      });
      if (response.status === 200) {
        set({ isDBConnected: true, errorMessage: '' });
        console.log('Valid URI String')

      } else {
        set({ isDBConnected: false, errorMessage: 'Failed to connect to the database.' });
        console.log('Invalid URI String')
        return;
      }
      const data = await response.json();
      set({ metricsData: data })
      set({ view: 'metrics' })
    } catch (error) {
      set({ isDBConnected: false, errorMessage: 'Error connecting to the database.' });
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


