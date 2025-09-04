import React, { useState } from 'react'

function AnalysisPanel({ collapsed, onToggle, onReplayConversation }) {
  const [activeTab, setActiveTab] = useState('Analyze')
  const [showNotification, setShowNotification] = useState(false)

  console.log('AnalysisPanel component rendering...', { collapsed })

  const handleDoLater = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000) // Hide notification after 3 seconds
  }

  return (
    <div className={`bg-white border-l border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out ${
      collapsed ? 'w-0 overflow-hidden' : 'w-80'
    }`}>
      {/* Header with Close Button */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-800">Analysis</h2>
        )}
        <div className="flex items-center gap-2">
          {!collapsed && (
            <>
              <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
                ←
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
                →
              </button>
            </>
          )}
          <button
            onClick={onToggle}
            className="p-2 text-gray-600 hover:text-yellow-ai-purple hover:bg-gray-100 rounded-lg transition-colors"
            title="Close Analysis Panel"
          >
            ✕
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 flex-shrink-0">
            {['Analyze', 'Solve', 'Improve'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  activeTab === tab
                    ? 'text-gray-800 border-b-2 border-gray-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {index + 1}. {tab}
              </button>
            ))}
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {activeTab === 'Analyze' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Examine the problem in detail to uncover the underlying cause.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">ROOT CAUSE</h3>
                    <p className="text-sm text-gray-700">
                      From description of issue, it seems like an issue with the AI Agent persona. The agent is not providing detailed responses and is missing proper greetings at the start of conversations.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">REASONING</h3>
                    <p className="text-sm text-gray-700">
                      From description of issue, it seems like an issue with the AI Agent persona. The agent is not providing detailed responses and is missing proper greetings at the start of conversations.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'Solve' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Make changes based on the suggestions to improve the outcome.
                </p>
                
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-800">
                        Modify current version to better specify the instructions.
                      </h3>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        🔖
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">1 Current version:</span>
                        <span className="text-gray-600"> Step - 3 Updation of ticket details</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">2 Updated version:</span>
                        <span className="text-gray-600"> Anything not related to the assistant use case and gibberish example :- who is ceo of google, who is your competitor etc</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        <span>✏️</span>
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-800">
                        Modify current version to better specify the instructions.
                      </h3>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        🔖
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">1 Current version:</span>
                        <span className="text-gray-600"> Step - 3 Updation of ticket details</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">2 Updated version:</span>
                        <span className="text-gray-600"> Anything not related to the assistant use case and gibberish example :- who is ceo of google, who is your competitor etc</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        <span>✏️</span>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'Improve' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  After applying the suggested updates, regenerate to view the refined response.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">Improvement Summary</h3>
                  <p className="text-sm text-blue-700">
                    The AI agent has been updated with proper greeting protocols and enhanced response capabilities. 
                    Test the improvements by starting a new conversation.
                  </p>
                </div>

                {/* Do Later Button */}
                <div className="flex justify-center pt-48">
                  <button
                    onClick={handleDoLater}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    <span>📝</span>
                    <span>Do Later</span>
                  </button>
                </div>

                {/* Replay Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => {
                      console.log('Replaying conversation from Improve section...')
                      if (onReplayConversation) {
                        onReplayConversation()
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <span>🔄</span>
                    <span>Replay Conversation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons at Bottom - Fixed */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 flex justify-between items-center flex-shrink-0 bg-white">
          <button 
            onClick={() => {
              const tabs = ['Analyze', 'Solve', 'Improve']
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1])
              }
            }}
            className={`flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors ${
              activeTab === 'Analyze' 
                ? 'text-gray-400 bg-white border border-gray-200 cursor-not-allowed' 
                : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
            }`}
            disabled={activeTab === 'Analyze'}
          >
            <span>←</span> Previous
          </button>
          <button 
            onClick={() => {
              const tabs = ['Analyze', 'Solve', 'Improve']
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1])
              } else {
                // Handle regenerate action for the last tab
                console.log('Regenerating with improvements...')
                if (onReplayConversation) {
                  onReplayConversation()
                }
              }
            }}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {activeTab === 'Improve' ? 'Regenerate' : 'Next'} 
            <span>{activeTab === 'Improve' ? '🔄' : '→'}</span>
          </button>
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
            <span>✅</span>
            <span className="font-medium">Added to-do list</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalysisPanel
