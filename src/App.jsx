
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./app/store";
import "./index.css"; 
import UserDashboard from './components/UserDashboard';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserDashboard />
      </div>
    </Provider>
  );
}

export default App;
