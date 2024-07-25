import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MUsik from '../assets/aa.mp3'; // Path sesuai dengan file audio Anda

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency array is empty, so effect runs only once on mount

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      <audio ref={audioRef} src={MUsik} autoPlay loop />
      {children}
    </DataContext.Provider>
  );
};
