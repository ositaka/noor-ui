'use client'

import * as React from 'react'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card'
import { Badge } from './badge'
import { cn } from '../../lib/utils'
import { LucideIcon } from 'lucide-react'

export interface WorkflowNodeData extends Record<string, unknown> {
  /**
   * Node label/title
   */
  label: string
  /**
   * Node label in Arabic
   */
  labelAr?: string
  /**
   * Node description
   */
  description?: string
  /**
   * Node description in Arabic
   */
  descriptionAr?: string
  /**
   * Node type/category
   */
  type?: string
  /**
   * Node type in Arabic
   */
  typeAr?: string
  /**
   * Icon component
   */
  icon?: LucideIcon
  /**
   * Badge status
   */
  status?: 'active' | 'inactive' | 'error' | 'success'
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Custom content to render
   */
  children?: React.ReactNode
}

const statusColors = {
  active: 'bg-blue-500',
  inactive: 'bg-gray-400',
  error: 'bg-red-500',
  success: 'bg-green-500',
}

export function WorkflowNode({ data, selected }: NodeProps<Node<WorkflowNodeData>>) {
  const Icon = data.icon
  const isRTL = data.isRTL || false

  const handleStyle = {
    width: 12,
    height: 12,
  }

  return (
    <Card
      className={cn(
        'min-w-[240px] transition-all',
        selected && 'ring-2 ring-primary ring-offset-2',
        data.status === 'error' && 'border-red-500',
        data.status === 'success' && 'border-green-500'
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={isRTL ? Position.Right : Position.Left}
        className="!bg-primary"
        style={handleStyle}
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {Icon && (
              <div className="shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium truncate">
                {isRTL ? (data.labelAr || data.label) : data.label}
              </CardTitle>
              {data.description && (
                <CardDescription className="text-xs mt-0.5 line-clamp-2">
                  {isRTL ? (data.descriptionAr || data.description) : data.description}
                </CardDescription>
              )}
            </div>
          </div>
          {data.status && (
            <div
              className={cn(
                'w-2 h-2 rounded-full shrink-0 mt-1',
                statusColors[data.status]
              )}
            />
          )}
        </div>
        {data.type && (
          <Badge variant="secondary" className="text-xs w-fit mt-2">
            {isRTL ? (data.typeAr || data.type) : data.type}
          </Badge>
        )}
      </CardHeader>

      {data.children && (
        <CardContent className="pt-0 pb-3">
          {data.children}
        </CardContent>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={isRTL ? Position.Left : Position.Right}
        className="!bg-primary"
        style={handleStyle}
      />
    </Card>
  )
}
