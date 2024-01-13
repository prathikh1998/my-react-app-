import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserList from './components/UserList';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import './styles/App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="app">
      <Header />
      {loading && <LoadingIndicator />}
      {error && <ErrorDisplay message={error} />}
      {!loading && !error && <UserList users={users} />}
    </div>
  );
};

export default App;
