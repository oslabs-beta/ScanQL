import { type } from 'os';
import { create } from 'zustand';

export type TableInfo = {
  tableName: string;
  numberOfRows: number;
  numberOfIndexes: number;
  numberOfField: number;
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
  errorMessage: string;
  metricsData: {
    databaseInfo: DatabaseInfo;
    executionPlans: {};
  }

  view: 'metrics' | 'erd';

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  openConnectDB: () => void;
  closeConnectDB: () => void;
  setView: (view: 'metrics' | 'erd') => void;

  setDBName: (dbName: string) => void;
  setUri: (uri: string) => void;
  setIsDBConnected: (isDBConnected: boolean) => void;
  connectToDatabase: (uri: string, dbName: string) => Promise<void>;
}


const useAppStore = create<AppState>((set) => ({
  // username: '',
  //password: '',
  // isLoggedIn: false,
  isConnectDBOpen: false,
  dbName: '',
  uri: '',
  isDBConnected: false,
  errorMessage: 'string',
  metricsData: {
    databaseInfo: {},
    executionPlans: {},
  },

  // default initialize view state to metrics
  view: 'metrics',
  //set default to light
  theme: 'light',
  
  toggleConnectDB: () => {
    const { isConnectDBOpen } = useAppStore();
    isConnectDBOpen ? set({ isConnectDBOpen: false }) : set({ isConnectDBOpen: true })
  },
  //toggle light/dark mode
  toggleTheme: () => {set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))},

  openConnectDB: () => set({ isConnectDBOpen: true }),
  closeConnectDB: () => set({ isConnectDBOpen: false }),
  setView: (view) => set({ view }), // method to set viewState

  setDBName: (dbName: string) => set({ dbName }),
  setUri: (uri: string) => set({ uri }),
  setIsDBConnected: (isDBConnected) => set({ isDBConnected }),
  setMetrics: (metricsData: {databaseInfo: DatabaseInfo, executionPlans: {}}) => set({ metricsData }),

  connectToDatabase: async (uri, dbName) => {
    try {
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
      console.log('data', data);
      set({ metricsData: data })
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


