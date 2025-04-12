import React, { useState } from 'react'
import { ChevronLeft, Send } from 'lucide-react'
import { Auth } from './components/Auth'
import { Sidebar } from './components/Sidebar'
import { ChatView } from './components/ChatView'
import { HistoryView } from './components/HistoryView'
import { DatabaseForm } from './components/DatabaseForm'
import { Toast } from './components/Toast'
import { ProfileMenu } from './components/ProfileMenu'
import { mockUser, mockMessages, mockChatHistory, mockDbConnection } from './lib/mockData'
import type { User, Message, ChatSession, DatabaseConnection } from './types'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeView, setActiveView] = useState<'chat' | 'history' | 'credentials'>('credentials')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [dbConnection, setDbConnection] = useState<DatabaseConnection | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([])

  const handleLogin = (user: User) => {
    setUser({ ...mockUser, email: user.email })
    showNotification('Successfully logged in')
  }

  const handleSignOut = () => {
    setUser(null)
    setDbConnection(null)
    setMessages([])
    setChatHistory([])
    setActiveView('credentials')
  }

  const handleDatabaseConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    // Simulate API call
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)

    setDbConnection(mockDbConnection)
    setChatHistory(mockChatHistory)
    showNotification('Successfully connected to database')
    setActiveView('chat')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user || !dbConnection) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      type: 'user'
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const response: Message = mockMessages[1]
    setMessages(prev => [...prev, { ...response, id: (Date.now() + 1).toString() }])
    setIsLoading(false)
  }

  const handleCopySQL = (sql: string) => {
    navigator.clipboard.writeText(sql)
    showNotification('SQL copied to clipboard!')
  }

  const showNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        activeView={activeView}
        dbConnection={dbConnection}
        onViewChange={setActiveView}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            <h2 className="ml-4 text-lg font-semibold text-gray-800">
              {activeView === 'chat' && 'New Chat'}
              {activeView === 'history' && 'Chat History'}
              {activeView === 'credentials' && 'Database Credentials'}
            </h2>
          </div>
          <ProfileMenu user={user} onSignOut={handleSignOut} />
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {activeView === 'chat' && (
            <ChatView
              messages={messages}
              isLoading={isLoading}
              dbConnection={dbConnection}
              message={message}
              setMessage={setMessage}
              onSubmit={handleSubmit}
              onCopySQL={handleCopySQL}
            />
          )}

          {activeView === 'history' && (
            <HistoryView chatHistory={chatHistory} />
          )}

          {activeView === 'credentials' && (
            <DatabaseForm onSubmit={handleDatabaseConnect} />
          )}
        </div>

        {activeView === 'chat' && dbConnection && (
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask a question about your database..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!message.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Toast message={toastMessage} show={showToast} />
    </div>
  )
}

export default App