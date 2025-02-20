import React, { useState, useEffect, useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import '@xyflow/react/dist/style.css';
import TaskNode from './components/TaskNode/TaskNode';
import TextChangerPopup from './components/TextChangerPopup/TextChangerPopup';
import ConnectionLine from './components/ConnectionLine/ConnectionLine';

export default function Job() {
    const initialNodes = [{ id: uuidv4(), position: { x: 0, y: 0 }, data: { label: 'an example task', isConnectable: false }, type: 'task' }];
    const initialEdges = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const { screenToFlowPosition } = useReactFlow();

    const nodeTypes = { task: TaskNode };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onConnectEnd = useCallback(
        (event, connectionState) => {
            if (!connectionState.isValid) {
                const id = uuidv4();
                const { clientX, clientY } =
                    'changedTouches' in event ? event.changedTouches[0] : event;
                const newNode = {
                    id,
                    position: screenToFlowPosition({
                        x: clientX,
                        y: clientY,
                    }),
                    data: { label: 'an example task', isConnectable: false },
                    origin: [0.5, 0.5],
                    type: 'task'
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({ id, source: connectionState.fromNode.id, target: id, type: 'smoothstep' }),
                );
            }
        },
        [screenToFlowPosition],
    );

    useEffect(() => {
        if (selectedNode != null) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === selectedNode.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                isSelected: true
                            },
                        };
                    }
                    return node;
                }),
            );
        } else {
            setNodes((nds) =>
                nds.map((node) => {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            isSelected: false
                        },
                    };
                }),
            );
        }
      }, [selectedNode]);

    const onPaneClicked = () => {
        setSelectedNode(null);
        closePopup()
    }

    const onNodeClicked = (event, node) => {
        if (node != selectedNode) {
            setSelectedNode(node)
        }
    }

    const onNodeDoubleClicked = (event) => {
        if (!popupOpen) {
            openPopup(event)
        } else {
            closePopup()
        }
    };

    const handleEnterPress = (text, date) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: text,
                            date: date
                        },
                    };
                }
                return node;
            }),
        );
        closePopup();
    };

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div style={{ width: '200vw', height: '200vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                onNodeClick={(event, node) => onNodeClicked(event, node)}
                onPaneClick={onPaneClicked}
                onNodeDoubleClick={(event, _) => onNodeDoubleClicked(event)}
                connectionLineComponent={ConnectionLine}
                nodeTypes={nodeTypes}
            >
                {popupOpen && (
                    <TextChangerPopup
                        open={popupOpen}
                        onClose={() => setPopupOpen(false)}
                        onEnterPress={handleEnterPress}
                    />
                )}
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}