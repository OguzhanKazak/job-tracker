import { Handle, Position } from '@xyflow/react';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './TaskNode.css'; // Import the CSS file for styling

const TaskNode = ({ data, isConnectable }) => {
  return (
    <> {data.isSelected ? <div className="task-toggle">
      <IconButton
        aria-label="toggle-task"
        size="small"
        color={data.isDone ? 'success' : ''}
        onClick={() => {
          data.isDone = !data.isDone; // Update isDone state
        }}
      >
        <CheckCircleIcon fontSize="small" />
      </IconButton>
    </div> : <></>}

      <div className={`task-node ${data.isDone ? 'done' : 'not-done'}`}>
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <div className="task-label">{data.label}</div>
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
};

export default TaskNode;
