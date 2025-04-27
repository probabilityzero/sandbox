import Dexie, { type Table } from "dexie"
import type { Project } from "@/types/project"

class ProjectDatabase extends Dexie {
  projects!: Table<Project>

  constructor() {
    super("CreativeCodingDB")
    this.version(2).stores({
      projects: "++id, name, language, createdAt, updatedAt",
    })
  }
}

export const db = new ProjectDatabase()
