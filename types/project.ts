export type LanguageType = "javascript" | "python" | "glsl"

export interface Version {
  code: string
  timestamp: Date
}

export interface Project {
  id: number
  name: string
  code: string
  language: LanguageType
  createdAt: Date
  updatedAt: Date
  versions: Version[]
}
