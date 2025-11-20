'use client'

import * as React from 'react'
import { type NodeProps, type Node } from '@xyflow/react'
import { WorkflowNode, type WorkflowNodeData } from './workflow-node'
import {
  Play,
  Zap,
  Clock,
  Globe,
  Brain,
  Code,
  Filter,
  Send,
  Save,
  Bell,
  Database,
  Sparkles,
} from 'lucide-react'

// Trigger Node - Starting points for workflows
export function TriggerNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: props.data.icon || Play,
    type: props.data.type || 'Trigger',
    typeAr: props.data.typeAr || 'مشغل',
  }

  return <WorkflowNode {...props} data={data} />
}

// Webhook Trigger
export function WebhookTriggerNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Globe,
    type: 'Webhook',
    typeAr: 'ويب هوك',
  }

  return <TriggerNode {...props} data={data} />
}

// Schedule Trigger
export function ScheduleTriggerNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Clock,
    type: 'Schedule',
    typeAr: 'جدولة',
  }

  return <TriggerNode {...props} data={data} />
}

// Action Node - Processing steps
export function ActionNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: props.data.icon || Zap,
    type: props.data.type || 'Action',
    typeAr: props.data.typeAr || 'إجراء',
  }

  return <WorkflowNode {...props} data={data} />
}

// Code Action
export function CodeActionNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Code,
    type: 'Code',
    typeAr: 'كود',
  }

  return <ActionNode {...props} data={data} />
}

// Filter/Condition
export function FilterNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Filter,
    type: 'Filter',
    typeAr: 'تصفية',
  }

  return <ActionNode {...props} data={data} />
}

// AI Node - AI/LLM operations
export function AINode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: props.data.icon || Brain,
    type: props.data.type || 'AI',
    typeAr: props.data.typeAr || 'ذكاء اصطناعي',
  }

  return <WorkflowNode {...props} data={data} />
}

// LLM Call
export function LLMNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Sparkles,
    type: 'LLM',
    typeAr: 'نموذج لغوي',
  }

  return <AINode {...props} data={data} />
}

// Embedding
export function EmbeddingNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Database,
    type: 'Embedding',
    typeAr: 'تضمين',
  }

  return <AINode {...props} data={data} />
}

// Output Node - End points
export function OutputNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: props.data.icon || Send,
    type: props.data.type || 'Output',
    typeAr: props.data.typeAr || 'إخراج',
  }

  return <WorkflowNode {...props} data={data} />
}

// Save Data
export function SaveNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Save,
    type: 'Save',
    typeAr: 'حفظ',
  }

  return <OutputNode {...props} data={data} />
}

// Notification
export function NotifyNode(props: NodeProps<Node<WorkflowNodeData>>) {
  const data = {
    ...props.data,
    icon: Bell,
    type: 'Notify',
    typeAr: 'إشعار',
  }

  return <OutputNode {...props} data={data} />
}

// Export all node types for easy registration
export const workflowNodeTypes = {
  trigger: TriggerNode,
  webhook: WebhookTriggerNode,
  schedule: ScheduleTriggerNode,
  action: ActionNode,
  code: CodeActionNode,
  filter: FilterNode,
  ai: AINode,
  llm: LLMNode,
  embedding: EmbeddingNode,
  output: OutputNode,
  save: SaveNode,
  notify: NotifyNode,
}
