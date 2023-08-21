import { create } from 'zustand';

interface AppState {
  // isLoggedIn: boolean;
  isConnectDBOpen: boolean;

  uri: string;
  isDBConnected: boolean;
  errorMessage: string;

  view: 'metrics' | 'erd';

  openConnectDB: () => void;
  closeConnectDB: () => void;
  setView: (view: 'metrics' | 'erd') => void;

  setUri: (uri: string) => void;
  setIsDBConnected: (isDBConnected: boolean) => void;
  connectToDatabase: (uri: string) => Promise<void>;
}


const useAppStore = create<AppState>((set) => ({
  // username: '',
  //password: '',
  // isLoggedIn: false,
  isConnectDBOpen: false,
  uri: 'string',
  isDBConnected: false,
  errorMessage: 'string',

  // initialize view state to metrics
  view: 'metrics',

  openConnectDB: () => set({ isConnectDBOpen: true }),
  closeConnectDB: () => set({ isConnectDBOpen: false }),
  setView: (view) => set({ view }), // method to set viewState

  setUri: (uri: string) => set({ uri }),
  setIsDBConnected: (isDBConnected) => set({ isDBConnected }),

  connectToDatabase: async (uri: string) => {
    try {
      const response = await fetch('/api/pg/dbInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri }),
      });

      const data = await response.json();
      if (data.validURI) {
      console.log('data', data);
        set({ isDBConnected: true, errorMessage: '' });
      } else {
        set({ isDBConnected: false, errorMessage: 'Failed to connect to the database.' });
      }
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


