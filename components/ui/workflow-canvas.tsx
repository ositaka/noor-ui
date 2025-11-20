'use client'

import * as React from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type FitViewOptions,
  type DefaultEdgeOptions,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { cn } from '../../lib/utils'

export interface WorkflowCanvasProps {
  /**
   * Initial nodes for the workflow
   */
  initialNodes?: Node[]
  /**
   * Initial edges/connections
   */
  initialEdges?: Edge[]
  /**
   * Custom node types
   */
  nodeTypes?: Record<string, React.ComponentType<any>>
  /**
   * Callback when nodes change
   */
  onNodesChange?: OnNodesChange
  /**
   * Callback when edges change
   */
  onEdgesChange?: OnEdgesChange
  /**
   * Callback when nodes connect
   */
  onConnect?: OnConnect
  /**
   * Whether the canvas is read-only
   */
  readOnly?: boolean
  /**
   * Show minimap
   */
  showMiniMap?: boolean
  /**
   * Show controls (zoom, fit view)
   */
  showControls?: boolean
  /**
   * Show background pattern
   */
  showBackground?: boolean
  /**
   * Background variant
   */
  backgroundVariant?: BackgroundVariant
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Fit view options
   */
  fitViewOptions?: FitViewOptions
  /**
   * Default edge options
   */
  defaultEdgeOptions?: DefaultEdgeOptions
}

const defaultFitViewOptions: FitViewOptions = {
  padding: 0.2,
}

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: 'smoothstep',
}

export function WorkflowCanvas({
  initialNodes = [],
  initialEdges = [],
  nodeTypes,
  onNodesChange: onNodesChangeProp,
  onEdgesChange: onEdgesChangeProp,
  onConnect: onConnectProp,
  readOnly = false,
  showMiniMap = true,
  showControls = true,
  showBackground = true,
  backgroundVariant = BackgroundVariant.Dots,
  isRTL = false,
  className,
  fitViewOptions = defaultFitViewOptions,
  defaultEdgeOptions: defaultEdgeOptionsProp = defaultEdgeOptions,
}: WorkflowCanvasProps) {
  const [nodes, setNodes] = React.useState<Node[]>(initialNodes)
  const [edges, setEdges] = React.useState<Edge[]>(initialEdges)

  const onNodesChange: OnNodesChange = React.useCallback(
    (changes) => {
      if (readOnly) return
      if (onNodesChangeProp) {
        onNodesChangeProp(changes)
      } else {
        setNodes((nds) => applyNodeChanges(changes, nds))
      }
    },
    [readOnly, onNodesChangeProp]
  )

  const onEdgesChange: OnEdgesChange = React.useCallback(
    (changes) => {
      if (readOnly) return
      if (onEdgesChangeProp) {
        onEdgesChangeProp(changes)
      } else {
        setEdges((eds) => applyEdgeChanges(changes, eds))
      }
    },
    [readOnly, onEdgesChangeProp]
  )

  const onConnect: OnConnect = React.useCallback(
    (connection) => {
      if (readOnly) return
      if (onConnectProp) {
        onConnectProp(connection)
      } else {
        setEdges((eds) => addEdge(connection, eds))
      }
    },
    [readOnly, onConnectProp]
  )

  return (
    <div
      className={cn(
        'relative w-full h-full bg-background rounded-lg border',
        isRTL && 'rtl',
        className
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptionsProp}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
        deleteKeyCode={readOnly ? null : 'Delete'}
      >
        {showBackground && <Background variant={backgroundVariant} />}
        {showControls && <Controls />}
        {showMiniMap && (
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="bg-background"
          />
        )}
      </ReactFlow>
    </div>
  )
}
