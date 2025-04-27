export type LanguageType = "javascript" | "python" | "glsl"

export interface Version {
  code: string
  timestamp: string
}

export interface Project {
  id?: number
  name: string
  code?: string
  language: LanguageType
  createdAt: string
  updatedAt: string
  versions: Version[]
}
