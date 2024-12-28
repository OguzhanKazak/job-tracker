import React, { useCallback } from 'react';
 
import '@xyflow/react/dist/style.css';
import Job from './Job';

 
export default function App() {
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Job/>
    </div>
  );
}