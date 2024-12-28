import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react'
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextField from '@mui/material/TextField';

const TaskNode = ({ data, isConnectable }) => {

  const [taskLabel, setTaskLabel] = useState(data.label)

  const changeTaskLabel = (event) => {
    setTaskLabel(event.target.value);
    data.label = event.target.value;
  }

  return (
    <div className={`task-node ${data.isDone ? 'done' : 'not-done'}`}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      {data.isEditMode ? (
        <div>
          <TextField
            id="standard-basic"
            value={taskLabel}
            onChange={changeTaskLabel}
            variant="standard"
            inputProps={{ maxLength: 128 }}
            size="small"
            autoFocus
          />
        </div>
      ) : (
        <div>{data.label}</div>
      )}
  
      <div className="task-toggle">
        <IconButton
          aria-label="toggle-task"
          size="small"
          color={data.isDone ? 'success' : ''}
          onClick={() => {
            data.isDone = !data.isDone;
          }}
        >
          <CheckCircleIcon fontSize="small" />
        </IconButton>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TaskNode;