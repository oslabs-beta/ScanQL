import '@testing-library/jest-dom/vitest'
import { mockReactFlow } from './RFSetup'

// call globally to mock missing Web API's and DOM elements needed to render React Flow
mockReactFlow();