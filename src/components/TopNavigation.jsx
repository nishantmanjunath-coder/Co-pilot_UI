import React, { useState, useRef, useEffect } from 'react'

function RecentUpdatesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const recentUpdates = [
    "The Persona is updated to Polite",
    "A new Agent \"Refund\" is created",
    "A new rules to follow during conversation on \"bike\" Agent has been added",
    "A new rules to follow during conversation on \"bike\" Agent has been added",
    "Agent response time optimized by 15%",
    "New greeting templates added for customer service"
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-yellow-ai-purple transition-colors"
      >
        <span>🕒</span>
        <span>Recent updates</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Updates</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentUpdates.map((update, index) => (
                <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded border-l-2 border-yellow-ai-purple">
                  {update}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TopNavigation({ activeTab, setActiveTab, debugEnabled, onToggleDebug }) {
  const tabs = ['Playground', 'Super agent', 'Agents', 'Global components']

  console.log('TopNavigation component rendering...')

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Tabs */}
        <div className="flex items-center gap-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Center - Preview/Debug Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {debugEnabled ? 'Debug' : 'Preview'}
          </span>
          <button
            onClick={onToggleDebug}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-ai-purple focus:ring-offset-2 ${
              debugEnabled ? 'bg-yellow-ai-purple' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                debugEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Right side - Utility Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-yellow-ai-purple transition-colors">
            🔍
          </button>
          
          <button className="p-2 text-gray-600 hover:text-yellow-ai-purple transition-colors">
            ❓
          </button>
          
          <button className="p-2 text-gray-600 hover:text-yellow-ai-purple transition-colors">
            ⚡
          </button>
          
          {/* Sandbox Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-yellow-ai-purple transition-colors">
              Sandbox
              <span>▼</span>
            </button>
          </div>
          
          {/* Recent Updates Dropdown */}
          <RecentUpdatesDropdown />
          
          <button className="p-2 text-gray-600 hover:text-yellow-ai-purple transition-colors">
            🔔
          </button>
          
          <button className="p-2 text-gray-600 hover:text-yellow-ai-purple transition-colors">
            👤
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopNavigation
