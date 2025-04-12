import type { User, Message, ChatSession, DatabaseConnection } from '../types'

export const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0066ff&color=fff',
  role: 'Database Administrator',
  lastLogin: new Date('2025-04-12T09:00:00')
}

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Show me all users who signed up in the last 7 days',
    timestamp: new Date('2025-04-12T10:30:00'),
    type: 'user'
  },
  {
    id: '2',
    content: 'Here are the results from your query:',
    timestamp: new Date('2025-04-12T10:30:02'),
    type: 'assistant',
    sql: 'SELECT * FROM users WHERE created_at > NOW() - INTERVAL \'7 days\';'
  }
]

export const mockChatHistory: ChatSession[] = [
  {
    id: '1',
    title: 'Query about recent user signups',
    timestamp: new Date('2025-04-12T10:30:00'),
    lastMessage: 'Found 25 users who signed up in the last 7 days'
  },
  {
    id: '2',
    title: 'Analysis of product sales',
    timestamp: new Date('2025-04-12T09:15:00'),
    lastMessage: 'Total sales for Q1 2025: $1.2M with a 15% increase from Q4 2024'
  }
]

export const mockDbConnection: DatabaseConnection = {
  id: '1',
  db_type: 'postgresql',
  host: 'localhost',
  port: '5432',
  username: 'admin',
  database_name: 'app_db',
  is_connected: true
}