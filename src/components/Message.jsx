import React from 'react'

function Message({ message, debugEnabled, isSelected, onSelect }) {
  const isUser = message.type === 'user'

  console.log('Message component rendering:', message.type)

  const handleMessageClick = () => {
    if (debugEnabled && !isUser && onSelect) {
      onSelect()
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
          <p className="text-sm">{message.content}</p>
          
          {/* Metrics Icons - Only show for assistant messages */}
          {!isUser && (
            <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-200">
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
