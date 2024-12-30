import { Handle, Position } from '@xyflow/react'
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TaskNode = ({ data, isConnectable }) => {

  return (
    <div className={`task-node ${data.isDone ? 'done' : 'not-done'}`}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
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