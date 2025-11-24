import { useState, useEffect } from 'react';
import { getBoards } from '../api/api';

export default function useBoards(){
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBoards = async () => {
    try{
      setLoading(true);
      const res = await getBoards();
      setBoards(res.data);
    }catch(err){
      setError(err.message || 'Failed to load boards');
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchBoards(); }, []);

  return { boards, loading, error, refresh: fetchBoards };
}
