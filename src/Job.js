import React, { useState, useCallback } from 'react';
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

export default function Job() {
    const initialNodes = [{ id: uuidv4(), position: { x: 0, y: 0 }, data: { label: 'an example task' }, type: 'task' }];
    const initialEdges = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupAnchor, setPopupAnchor] = useState(null);

    const { screenToFlowPosition } = useReactFlow();

    const nodeTypes = { task: TaskNode };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onConnectEnd = useCallback(
        (event, connectionState) => {
            // when a connection is dropped on the pane it's not valid
            if (!connectionState.isValid) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = uuidv4();
                const { clientX, clientY } =
                    'changedTouches' in event ? event.changedTouches[0] : event;
                const newNode = {
                    id,
                    position: screenToFlowPosition({
                        x: clientX,
                        y: clientY,
                    }),
                    data: { label: 'an example task' },
                    origin: [0.5, 0.5],
                    type: 'task'
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({ id, source: connectionState.fromNode.id, target: id }),
                );
            }
        },
        [screenToFlowPosition],
    );

    const onPaneClicked = () => {
        setSelectedNode(null);
        closePopup()
    }

    const onNodeClicked = (event, node) => {
        if (node != selectedNode) {
            setSelectedNode(node)
            closePopup()
        }
    }

    const onNodeDoubleClicked = (event) => {
        if (!popupOpen) {
            openPopup(event)
        } else {
            closePopup()
        }
    };

    const handleEnterPress = (text) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: text,
                        },
                    };
                }
                return node;
            }),
        );
        closePopup();
    };

    const openPopup = (event) => {
        setPopupAnchor(event.currentTarget);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setPopupAnchor(null);
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
                nodeTypes={nodeTypes}
            >
                {popupOpen && (
                    <TextChangerPopup
                        open={popupOpen}
                        anchor={popupAnchor}
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