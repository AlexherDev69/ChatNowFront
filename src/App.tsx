import React from 'react';
import { UserProvider } from './context/UserContext';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <HomePage />
      </UserProvider>
    </div>
  );
}

export default App;
