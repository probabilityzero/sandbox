"use client"

import { useEffect } from "react"
import { EditorContainer } from "@/components/sandbox/sandbox-container"
import { useProjects } from "@/hooks/use-projects"
import { useParams } from "next/navigation"

export default function ProjectPage() {
  const { changeProject } = useProjects()
  const params = useParams()
  
  useEffect(() => {
    if (params.id) {
      const projectId = Number(params.id)
      if (!isNaN(projectId)) {
        changeProject(projectId)
      }
    }
  }, [params.id, changeProject])
  
  return (
    <main className="flex flex-1 flex-col">
      <EditorContainer />
    </main>
  )
}
