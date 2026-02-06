import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/nextjs-vite'
import * as previewAnnotations from './preview'

// Apply Storybook's global decorators and parameters
const project = setProjectAnnotations([previewAnnotations])

beforeAll(project.beforeAll)
