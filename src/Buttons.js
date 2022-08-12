import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { handlePage, loading, page, nbPages } = useGlobalContext();
  return (
    <div className='btn-container'>
      <button disabled={loading} onClick={() => handlePage('dec')}>
        prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={loading} onClick={() => handlePage('inc')}>
        next
      </button>
    </div>
  );
};

export default Buttons;
