import React, { useState, useEffect, useRef } from 'react'

function HistoryPanel({ collapsed, onToggle, onSessionClick, onReplay, onShare, isReplaying }) {
  const historyData = {
    'Sessions': [
      { name: 'Session 1', timestamp: '2 hours ago', lastModified: '10:30 AM' },
      { name: 'Session 2', timestamp: '1 day ago', lastModified: '2:15 PM' },
      { name: 'Session 3', timestamp: '3 days ago', lastModified: '4:45 PM' },
      { name: 'Session 4', timestamp: '1 week ago', lastModified: '6:20 PM' }
    ],
    'Failed test cases': [
      { name: 'Session 1', timestamp: '4 hours ago', lastModified: '9:15 AM' },
      { name: 'Session 2', timestamp: '2 days ago', lastModified: '11:30 AM' },
      { name: 'Session 3', timestamp: '5 days ago', lastModified: '3:45 PM' },
      { name: 'Session 4', timestamp: '1 week ago', lastModified: '5:20 PM' }
    ],
    'Failed production cases': [
      { name: 'Session 1', timestamp: '6 hours ago', lastModified: '8:30 AM' },
      { name: 'Session 2', timestamp: '1 day ago', lastModified: '10:45 AM' },
      { name: 'Session 3', timestamp: '2 days ago', lastModified: '2:15 PM' },
      { name: 'Session 4', timestamp: '4 days ago', lastModified: '4:30 PM' }
    ],
    'External Sessions': [
      { name: 'Session 1', timestamp: '1 hour ago', lastModified: '9:00 AM' },
      { name: 'Session 2', timestamp: '1 day ago', lastModified: '11:00 AM' },
      { name: 'Session 3', timestamp: '2 days ago', lastModified: '1:30 PM' },
      { name: 'Session 4', timestamp: '3 days ago', lastModified: '3:00 PM' }
    ]
  }

  const [openDropdown, setOpenDropdown] = useState(null)
  const [collapsedCategories, setCollapsedCategories] = useState({})
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDropdownToggle = (sessionId) => {
    setOpenDropdown(openDropdown === sessionId ? null : sessionId)
  }

  const handleAction = (action, sessionName, category) => {
    console.log(`${action} clicked for ${sessionName}`)
    setOpenDropdown(null)
    
    if (action === 'Replay' && onReplay) {
      onReplay(category, sessionName)
    } else if (action === 'Share' && onShare) {
      onShare(category, sessionName)
    }
  }

  const handleSessionClick = (category, sessionName) => {
    if (onSessionClick) {
      onSessionClick(category, sessionName)
    }
  }

  const toggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const isCategoryCollapsed = (category) => collapsedCategories[category]

  console.log('HistoryPanel component rendering...', { collapsed })

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out ${
      collapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header with Toggle */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-800">History</h2>
        )}
        <button
          onClick={onToggle}
          className="p-2 text-gray-600 hover:text-yellow-ai-purple hover:bg-gray-100 rounded-lg transition-colors"
          title={collapsed ? "Expand history panel" : "Collapse history panel"}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* History Content */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(historyData).map(([category, sessions]) => {
          const isCollapsed = isCategoryCollapsed(category)
          
          return (
            <div key={category} className="mb-4">
              {!collapsed ? (
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  {category}
                  <span className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
              ) : (
                <div className="px-2 py-2 text-center">
                  <div className="text-xs text-gray-500 font-medium">{sessions.length}</div>
                  <div className="text-xs text-gray-400">📋</div>
                </div>
              )}
              
              {/* Session Items - Only show when category is expanded */}
              {!isCollapsed && !collapsed && (
                sessions.map((session, index) => {
                  const sessionId = `${category}-${index}`
                  const isDropdownOpen = openDropdown === sessionId
                  
                  return (
                    <div key={sessionId} className={`history-item ${collapsed ? 'collapsed' : ''} relative`}>
                      <div 
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => handleSessionClick(category, session.name)}
                        title="Click to load conversation"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 hover:text-yellow-ai-purple transition-colors truncate">
                            {session.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{session.timestamp}</span>
                          <span>Last: {session.lastModified}</span>
                        </div>
                      </div>
                      <button 
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation() // Prevent triggering the session load
                          handleDropdownToggle(sessionId)
                        }}
                      >
                        ⋯
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isDropdownOpen && !collapsed && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => handleAction('Share', session.name, category)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            >
                              <span>🔗</span>
                              Share
                            </button>
                            <button
                              onClick={() => handleAction('Rename', session.name, category)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            >
                              <span>✏️</span>
                              Rename
                            </button>
                            <button
                              onClick={() => handleAction('Save', session.name, category)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            >
                              <span>💾</span>
                              Save
                            </button>
                            <button
                              onClick={() => handleAction('Replay', session.name, category)}
                              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${
                                isReplaying ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                              disabled={isReplaying}
                            >
                              <span>🔄</span>
                              {isReplaying ? 'Replaying...' : 'Replay'}
                            </button>
                            <button
                              onClick={() => handleAction('Delete', session.name, category)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                            >
                              <span>🗑️</span>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryPanel
