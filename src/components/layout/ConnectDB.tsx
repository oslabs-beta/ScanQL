import * as React from 'react';

import { useState } from 'react';

interface ConnectDBProps {
  closeModal: () => void;
}


const ConnectDB: React.FC<ConnectDBProps> = ({closeModal}) => {

  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  }

  return (
    <div>
      <h1>Connect DB</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Connection String:
          <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />1
      </form>
      <button onClick={closeModal}>Close</button>
    </div>
  )
}

export default ConnectDB;


