import React from 'react'

function Message({ message, debugEnabled, isSelected, onSelect, onRegenerate, versionInfo, onVersionNavigation }) {
  const isUser = message.type === 'user'

  console.log('Message component rendering:', message.type)

  const handleMessageClick = () => {
    if (debugEnabled && !isUser && onSelect) {
      onSelect()
    }
  }

  const handleRegenerate = (e) => {
    e.stopPropagation() // Prevent message selection when clicking regenerate
    if (onRegenerate) {
      onRegenerate(message)
    }
  }

  // Default metrics for messages (can be customized per message)
  const metrics = message.metrics || {
    cost: '0.2$',
    tokens: '3000',
    latency: '20ms'
  }

  // Default debug logs for assistant messages (can be customized per message)
  const debugLogs = message.debugLogs || [
    { type: 'setting', text: 'agent set Language to English', timestamp: '1m' },
    { type: 'personality', text: "agent's personality: Friendly, Concise", timestamp: '1m' },
    { type: 'trigger', text: 'Troubleshoot roaming data triggered by agent', timestamp: '1m', icon: '🔧' },
    { type: 'instruction', text: 'Task instructions started by agent', timestamp: '1m' },
    { type: 'guidance', text: 'agent followed the Guidance below', timestamp: 'now' },
    { type: 'guidance', text: 'Personalize responses with names', timestamp: '' },
    { type: 'guidance', text: 'While troubleshoot, be clear, concise, friendly. D...', timestamp: '' },
    { type: 'thought', text: "agent's thoughts (Step 1) >", timestamp: 'now', icon: '✨' }
  ]

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-yellow-ai-purple rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm">🤖</span>
        </div>
      )}
      
      <div className={`max-w-[70%] ${isUser ? 'order-first' : ''}`}>
        {/* Debug Logs - Only show for assistant messages when debug is enabled */}
        {!isUser && debugEnabled && (
          <div className="mb-2 space-y-1">
            {debugLogs.map((log, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                {log.icon && <span className="text-sm">{log.icon}</span>}
                <span className="flex-1">{log.text}</span>
                {log.timestamp && (
                  <span className="text-gray-500 text-xs">{log.timestamp}</span>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div 
          className={`rounded-lg px-4 py-3 transition-all duration-200 ${
            isUser 
              ? 'bg-yellow-ai-purple text-white' 
              : `bg-gray-100 text-gray-800 ${
                  debugEnabled 
                    ? 'cursor-pointer hover:bg-gray-200 hover:shadow-md' 
                    : ''
                } ${
                  isSelected && debugEnabled
                    ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg' 
                    : ''
                }`
          }`}
          onClick={handleMessageClick}
        >
          {/* Version Navigation - Only show for assistant messages with versions */}
          {!isUser && versionInfo && versionInfo.total > 1 && (
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onVersionNavigation('prev')
                  }}
                  disabled={!versionInfo.canGoPrev}
                  className={`p-1 rounded ${
                    versionInfo.canGoPrev 
                      ? 'text-gray-600 hover:bg-gray-200' 
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className="text-xs text-gray-600 font-medium">
                  {versionInfo.current}/{versionInfo.total}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onVersionNavigation('next')
                  }}
                  disabled={!versionInfo.canGoNext}
                  className={`p-1 rounded ${
                    versionInfo.canGoNext 
                      ? 'text-gray-600 hover:bg-gray-200' 
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                Version {versionInfo.current}
              </div>
            </div>
          )}
          
          <p className="text-sm">{message.content}</p>
          
          {/* Metrics Icons - Only show for assistant messages */}
          {!isUser && (
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-3">
                {/* Cost Icon */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-yellow-800 text-xs font-bold">$</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{metrics.cost}</span>
                </div>
                
                {/* Token Count Icon */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🏷️</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{metrics.tokens}</span>
                </div>
                
                {/* Latency Icon */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🕒</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{metrics.latency}</span>
                </div>
              </div>
              
              {/* Regenerate Button - Only show when debug mode is disabled */}
              {!debugEnabled && (
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors duration-200"
                  title="Regenerate response"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Regenerate</span>
                </button>
              )}
            </div>
          )}
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {message.timestamp}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 text-sm">👤</span>
        </div>
      )}
    </div>
  )
}

export default Message
