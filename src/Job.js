import React, { useEffect, useState, useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import '@xyflow/react/dist/style.css';
import TaskNode from './components/TaskNode';


export default function Job() {
    const initialNodes = [{ id: uuidv4(), position: { x: 0, y: 0 }, data: { label: 'an example task detail' }, type: 'task' }, { id: uuidv4(), position: { x: 0, y: 0 }, data: { label: 'an example task detail' }, type: 'task' }];
    const initialEdges = [];

    const [selectedNode, setSelectedNode] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = { task: TaskNode };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onPaneClicked = () => {
        setSelectedNode(null);
        disableNodeEditMode();
    }

    const enableNodeEditMode = () => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === selectedNode.id) {
                    node.id = uuidv4();
                    node.data = {
                        ...node.data,
                        isEditMode: true
                    };
                }
                return node;
            })
        );
    };

    const disableNodeEditMode = () => {
        if (nodes.find(t => t.data.isEditMode)) {
            setNodes((nodes) =>
                nodes.map((node) => {
                    if (node.data.isEditMode) {
                        node.id = uuidv4();
                        node.data = {
                            ...node.data,
                            isEditMode: false
                        };
                    }
                    return node;

                })
            );
        }

    };

    return (
        <div style={{ width: '200vw', height: '200vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={(_, node) => setSelectedNode(node)}
                onPaneClick={onPaneClicked}
                onNodeDoubleClick={enableNodeEditMode}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}