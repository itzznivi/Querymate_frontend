import React from 'react'
import { MessageSquare, PlusCircle, Database, Clock } from 'lucide-react'
import type { DatabaseConnection } from '../types'

interface SidebarProps {
  isOpen: boolean
  activeView: 'chat' | 'history' | 'credentials'
  dbConnection: DatabaseConnection | null
  onViewChange: (view: 'chat' | 'history' | 'credentials') => void
  onSignOut: () => void
}

export function Sidebar({
  isOpen,
  activeView,
  dbConnection,
  onViewChange,
  onSignOut
}: SidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          QueryMate
        </h1>
        <nav className="space-y-2">
          <button
            onClick={() => onViewChange('chat')}
            disabled={!dbConnection}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              !dbConnection ? 'opacity-50 cursor-not-allowed' :
              activeView === 'chat' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            New Chat
          </button>
          <button
            onClick={() => onViewChange('history')}
            disabled={!dbConnection}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              !dbConnection ? 'opacity-50 cursor-not-allowed' :
              activeView === 'history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5" />
            Chat History
          </button>
          <button
            onClick={() => onViewChange('credentials')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeView === 'credentials' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Database className="w-5 h-5" />
            {dbConnection ? 'Update DB Connection' : 'Add DB Credentials'}
          </button>
        </nav>
      </div>
    </div>
  )
}