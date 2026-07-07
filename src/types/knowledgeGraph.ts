export interface GraphNode {
  id: string
  name: string
  type: 'exercise' | 'muscle' | 'article'
  symbolSize: number
  muscleGroup?: string
  bodyPart?: string
  difficulty?: string
  exerciseCount?: number
}

export interface GraphEdge {
  source: string
  target: string
  label: string
}

export interface KnowledgeGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
