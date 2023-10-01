import React from 'react';
import ReactDOM from 'react-dom';
const { useState, useEffect } = React;
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import axios from 'axios';

const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  projectId: 'PROJECT_IT',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'MSG_ID',
  appId: 'app_ID',
  measurementId: 'G-TAG',
  databaseURL: 'DATABASE_URL',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

function Counter() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  // const [country, setCountry] = useState('');

  useEffect(() => {
    // Retrieve the current click count from Firebase and set it in the state
    const clicksRef = ref(database, 'clicks');

    // Listen for changes to the 'clicks' reference
    const unsubscribe = onValue(clicksRef, (snapshot) => {
      const clickCount = snapshot.val() || 0;
      setCount(clickCount);

      setIsLoading(false);
    });
    // axios.get('https://ipinfo.io/json');

    return () => {
      // Unsubscribe from the 'clicks' reference when the component unmounts
      unsubscribe();
    };
  }, [database]);

  const increment = () => {
    // Increment the click count in Firebase using set
    const clicksRef = ref(database, 'clicks');
    const newCount = count + 1;

    try {
      // Use set to update the click count
      set(clicksRef, newCount);
      console.log('Click count updated successfully.');
    } catch (error) {
      console.error('Error updating click count:', error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div class="dot-spinner">
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
        </div>
      ) : (
        <>
          <p className="count">Count: {count}</p>
          <button className="counterButton" onClick={increment}>
            Count
          </button>
        </>
      )}
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('counter'));
