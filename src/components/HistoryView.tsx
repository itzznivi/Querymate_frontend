import React from 'react'
import type { ChatSession } from '../types'

interface HistoryViewProps {
  chatHistory: ChatSession[]
}

export function HistoryView({ chatHistory }: HistoryViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {chatHistory.map(chat => (
          <div
            key={chat.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-800">{chat.title}</h3>
              <span className="text-sm text-gray-500">
                {chat.timestamp.toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  )
}