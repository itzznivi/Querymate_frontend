export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  role?: string
  lastLogin?: Date
}

export interface Message {
  id: string
  content: string
  timestamp: Date
  type: 'user' | 'assistant'
  sql?: string
}

export interface ChatSession {
  id: string
  title: string
  timestamp: Date
  lastMessage: string
}

export interface DatabaseConnection {
  id: string
  db_type: string
  host: string
  port: string
  username: string
  database_name: string
  is_connected: boolean
}