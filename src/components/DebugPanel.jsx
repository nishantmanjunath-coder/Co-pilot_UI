import React, { useState } from 'react'

function DebugPanel({ collapsed, onToggle, onAnalyzeClick, selectedMessage, debugEnabled }) {
  const [problemDescription, setProblemDescription] = useState('The AI Agent should always greet the user when starting a conversation')
  const [expectedAnswer, setExpectedAnswer] = useState('Hello, My name is Mia. Good Morning ! How may I assist you today?')
  const [showFlowchart, setShowFlowchart] = useState(false)

  const handleAnalyze = () => {
    console.log('Analyzing feedback...')
    console.log('Problem:', problemDescription)
    console.log('Expected Answer:', expectedAnswer)
    
    // Trigger the Analysis panel to open
    if (onAnalyzeClick) {
      onAnalyzeClick()
    }
  }

  const handleOpenFlowchart = () => {
    setShowFlowchart(true)
  }

  const handleCloseFlowchart = () => {
    setShowFlowchart(false)
  }

  console.log('DebugPanel component rendering...', { collapsed })

  return (
    <div className={`bg-white border-l border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out ${
      collapsed ? 'w-0 overflow-hidden' : 'w-80'
    }`}>
      {/* Header with Toggle */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-800">Traces</h2>
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
            title={collapsed ? "Expand debug panel" : "Collapse debug panel"}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Debug Content */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Selected Message Traces */}
          {selectedMessage && debugEnabled && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg">
              <div className="p-3 border-b border-blue-200">
                <span className="text-sm font-medium text-blue-800">SELECTED MESSAGE TRACES</span>
              </div>
              <div className="p-3 space-y-3">
                <div className="text-sm text-gray-700">
                  <strong>Message ID:</strong> {selectedMessage.id}
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Timestamp:</strong> {selectedMessage.timestamp}
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Content:</strong> {selectedMessage.content.substring(0, 100)}...
                </div>
                
                {/* Debug Logs */}
                {selectedMessage.debugLogs && (
                  <div className="mt-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Debug Logs:</div>
                    <div className="space-y-1">
                      {selectedMessage.debugLogs.map((log, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-600 bg-white p-2 rounded border">
                          {log.icon && <span className="text-sm">{log.icon}</span>}
                          <span className="flex-1">{log.text}</span>
                          {log.timestamp && (
                            <span className="text-gray-500 text-xs">{log.timestamp}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Metrics */}
                {selectedMessage.metrics && (
                  <div className="mt-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Metrics:</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-yellow-800 text-xs font-bold">$</span>
                        </div>
                        <span className="text-xs text-gray-600">{selectedMessage.metrics.cost}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">🏷️</span>
                        </div>
                        <span className="text-xs text-gray-600">{selectedMessage.metrics.tokens}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🕒</span>
                        </div>
                        <span className="text-xs text-gray-600">{selectedMessage.metrics.latency}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* AGENT CONFIGURATION - Expanded */}
          <div className="bg-green-50 border border-green-200 rounded-lg">
            <div className="p-3 border-b border-green-200 flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">AGENT CONFIGURATION</span>
              <span className="text-green-600">^</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="text-sm text-gray-700">Super agent</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">conversational workflow</span>
                <button 
                  onClick={handleOpenFlowchart}
                  className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                >
                  Open
                </button>
              </div>
              <div className="text-sm text-gray-700">super agent</div>
            </div>
          </div>

          {/* AGENT CONFIGURATION - Collapsed */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">AGENT CONFIGURATION</span>
              <span className="text-yellow-600">⌄</span>
            </div>
          </div>

          {/* AGENT EXECUTION - Collapsed */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">AGENT EXECUTION</span>
              <span className="text-yellow-600">⌄</span>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">What you dislike the most?</h3>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                ✕
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600">
                Share your feedback below and let AI analyze and suggest improvements.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe problem *
                </label>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-ai-purple focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Describe the problem you're experiencing..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected answer (sample response)
                </label>
                <textarea
                  value={expectedAnswer}
                  onChange={(e) => setExpectedAnswer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-ai-purple focus:border-transparent resize-none"
                  rows={3}
                  placeholder="What should the expected response be?"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>⭐</span>
                <span>Analyze</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyze Button at Bottom of Traces Section */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleAnalyze}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-100 border border-green-300 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
          >
            <span className="text-green-600">⭐</span>
            <span>Analyze</span>
          </button>
        </div>
      )}

      {/* Flowchart Modal */}
      {showFlowchart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleCloseFlowchart}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-t-xl shadow-2xl w-full max-w-6xl h-96 transform transition-transform duration-300 ease-out">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Conversational Workflow</h3>
              <button
                onClick={handleCloseFlowchart}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Flowchart Content */}
            <div className="p-6 h-full overflow-auto">
              <div className="flex items-center justify-center h-full">
                <div className="relative w-full max-w-6xl">
                  {/* Landscape Flowchart Container */}
                  <div className="relative">
                    {/* Top Row - Information Collection Flow */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="flex items-center space-x-6">
                        {/* Name Node - Green */}
                        <div className="flex flex-col items-center">
                          <div className="bg-green-200 border-2 border-green-400 rounded-lg p-4 min-w-24 text-center shadow-md">
                            <div className="text-sm font-medium text-green-800">name</div>
                            <div className="text-xs text-green-600 mt-1 bg-green-100 rounded px-2 py-1">trigger test camp</div>
                          </div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="w-8 h-0.5 bg-gray-400"></div>
                        
                        {/* Phone Node - Red */}
                        <div className="flex flex-col items-center">
                          <div className="bg-red-200 border-2 border-red-400 rounded-lg p-4 min-w-24 text-center shadow-md">
                            <div className="text-sm font-medium text-red-800">phone</div>
                            <div className="text-xs text-red-600 mt-1 bg-red-100 rounded px-2 py-1">trigger test camp</div>
                          </div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="w-8 h-0.5 bg-gray-400"></div>
                        
                        {/* Age Node - Green */}
                        <div className="flex flex-col items-center">
                          <div className="bg-green-200 border-2 border-green-400 rounded-lg p-4 min-w-24 text-center shadow-md">
                            <div className="text-sm font-medium text-green-800">age</div>
                            <div className="text-xs text-green-600 mt-1 bg-green-100 rounded px-2 py-1">trigger test camp</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Vertical Connection from name to Start */}
                    <div className="absolute top-16 left-1/4 transform -translate-x-1/2 w-0.5 h-16 bg-gray-400"></div>
                    
                    {/* Bottom Row - Main Flow */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-6">
                        {/* Start Node - Green */}
                        <div className="flex flex-col items-center">
                          <div className="bg-green-200 border-2 border-green-400 rounded-lg p-4 min-w-24 text-center shadow-md">
                            <div className="text-sm font-medium text-green-800">Start</div>
                            <div className="text-xs text-green-600 mt-1 bg-green-100 rounded px-2 py-1">trigger test camp</div>
                          </div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="w-8 h-0.5 bg-gray-400"></div>
                        
                        {/* Process Node - Red */}
                        <div className="flex flex-col items-center">
                          <div className="bg-red-200 border-2 border-red-400 rounded-lg p-4 min-w-24 text-center shadow-md">
                            <div className="text-sm font-medium text-red-800">process</div>
                            <div className="text-xs text-red-600 mt-1 bg-red-100 rounded px-2 py-1">trigger test camp</div>
                          </div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="w-8 h-0.5 bg-gray-400"></div>
                        
                        {/* Response Node - Green */}
                        <div className="flex flex-col items-center">
                          <div className="bg-green-200 border-2 border-green-400 rounded-lg p-4 min-w-24 text-center shadow-md">
                            <div className="text-sm font-medium text-green-800">response</div>
                            <div className="text-xs text-green-600 mt-1 bg-green-100 rounded px-2 py-1">trigger test camp</div>
                          </div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="w-8 h-0.5 bg-gray-400"></div>
                        
                        {/* End Node - Red */}
                        <div className="flex flex-col items-center">
                          <div className="bg-red-200 border-2 border-red-400 rounded-lg p-4 min-w-24 text-center shadow-md">
                            <div className="text-sm font-medium text-red-800">End</div>
                            <div className="text-xs text-red-600 mt-1 bg-red-100 rounded px-2 py-1">trigger test camp</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: -1}}>
                      {/* From name to Start (vertical) */}
                      <line x1="25%" y1="80" x2="25%" y2="160" stroke="#9CA3AF" strokeWidth="2" />
                      
                      {/* From Start to process (horizontal) */}
                      <line x1="25%" y1="180" x2="35%" y2="180" stroke="#9CA3AF" strokeWidth="2" />
                      
                      {/* From process to response (horizontal) */}
                      <line x1="35%" y1="180" x2="45%" y2="180" stroke="#9CA3AF" strokeWidth="2" />
                      
                      {/* From response to End (horizontal) */}
                      <line x1="45%" y1="180" x2="55%" y2="180" stroke="#9CA3AF" strokeWidth="2" />
                      
                      {/* From name to phone (horizontal) */}
                      <line x1="15%" y1="60" x2="25%" y2="60" stroke="#9CA3AF" strokeWidth="2" />
                      
                      {/* From phone to age (horizontal) */}
                      <line x1="25%" y1="60" x2="35%" y2="60" stroke="#9CA3AF" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DebugPanel
