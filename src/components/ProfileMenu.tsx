import React, { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import type { User as UserType } from '../types'

interface ProfileMenuProps {
  user: UserType
  onSignOut: () => void
}

export function ProfileMenu({ user, onSignOut }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || user.email}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || user.email}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {user.name || 'User'}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            {user.role && (
              <div className="mt-2 text-sm text-gray-600">
                Role: {user.role}
              </div>
            )}
            {user.lastLogin && (
              <div className="mt-1 text-xs text-gray-500">
                Last login: {user.lastLogin.toLocaleString()}
              </div>
            )}
          </div>
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false)
                // Add settings handler here
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                onSignOut()
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}