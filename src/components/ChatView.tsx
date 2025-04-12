import React from 'react'
import { MessageSquare, Database, Code, Copy } from 'lucide-react'
import type { Message, DatabaseConnection } from '../types'

interface ChatViewProps {
  messages: Message[]
  isLoading: boolean
  dbConnection: DatabaseConnection | null
  message: string
  setMessage: (message: string) => void
  onSubmit: (e: React.FormEvent) => void
  onCopySQL: (sql: string) => void
}

export function ChatView({
  messages,
  isLoading,
  dbConnection,
  message,
  setMessage,
  onSubmit,
  onCopySQL
}: ChatViewProps) {
  if (!dbConnection) {
    return (
      <div className="text-center text-gray-500 mt-12">
        <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg">Please connect to a database first</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg">Ask anything about your database...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              msg.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p>{msg.content}</p>
            {msg.sql && (
              <div className="mt-3 bg-gray-50 rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Code className="w-4 h-4" /> Generated SQL
                  </span>
                  <button
                    onClick={() => onCopySQL(msg.sql!)}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" /> Copy
                  </button>
                </div>
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {msg.sql}
                </pre>
              </div>
            )}
            <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[80%]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}