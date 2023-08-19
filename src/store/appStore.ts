import { create } from 'zustand';

interface AppState {
  username: string;
  password: string; // <-- add this (either string or number)
  isLoggedIn: boolean;
  isConnectDBOpen: boolean;

  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;

  openConnectDB: () => void;
  closeConnectDB: () => void;
}

const useAppStore = create<AppState>((set) => ({
  username: '',
  password: '',
  isLoggedIn: false,
  isConnectDBOpen: false,

  loginUser: (username, password) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password: password.toString() }), // need to convert to string bc json does not have distinction between number and string?
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          set({ username, password, isLoggedIn: true });
        } else {
          console.log('login failed', data.message);
        }
      })
      .catch((err) => {
        console.log('error occurred:', err);
      });
  },
  logoutUser: () => set({ username: '', isLoggedIn: false }),

  openConnectDB: () => set({ isConnectDBOpen: true }),
  closeConnectDB: () => set({ isConnectDBOpen: false }),
}));

export default useAppStore;


