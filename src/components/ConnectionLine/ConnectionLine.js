import React from 'react';
import { useConnection } from '@xyflow/react';

const ConnectionLine = ({ fromX, fromY, toX, toY }) => {
  const { fromHandle } = useConnection();

  const midX = (fromX + toX) / 2; 

  return (
    <g>
      <path
        fill="none"
        stroke={'gray'} 
        strokeWidth={1.5}
        className="animated"

        d={`M${fromX},${fromY} L${midX},${fromY} L${midX},${toY} L${toX},${toY}`}
      />
    </g>
  );
};

export default ConnectionLine;
