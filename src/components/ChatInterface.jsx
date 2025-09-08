import React, { useState, useRef, useEffect } from 'react'
import Message from './Message'

function ChatInterface({ messages, inputValue, setInputValue, onSendMessage, isReplaying, onLoadExample, debugEnabled, selectedMessageId, onMessageSelect, onRegenerateMessage }) {
  const quickActions = [
    'Failed test cases',
    'Failed production cases', 
    'Book a ticket',
    'Book a ticket'
  ]

  const [hasStartedTyping, setHasStartedTyping] = useState(false)
  const [previewDropdownOpen, setPreviewDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPreviewDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isReplaying) {
      onSendMessage(inputValue)
    }
  }

  const handleInputChange = (e) => {
    if (!isReplaying) {
      const value = e.target.value
      setInputValue(value)
      
      // Move input to bottom once user starts typing
      if (!hasStartedTyping && value.trim()) {
        setHasStartedTyping(true)
      }
    }
  }

  const handleInputFocus = () => {
    if (!isReplaying) {
      // Move input to bottom when user focuses on input
      if (!hasStartedTyping) {
        setHasStartedTyping(true)
      }
    }
  }

  const handlePreviewOption = (option) => {
    console.log(`Preview option selected: ${option}`)
    setPreviewDropdownOpen(false)
  }

  const handleQuickAction = (action) => {
    if (isReplaying) return
    
    // Special handling for "Failed test cases" button
    if (action === 'Failed test cases' && onLoadExample) {
      onLoadExample('Failed test cases', 'Session 1')
    } else {
      // For other actions, send as regular message
      onSendMessage(action)
    }
  }

  // Check if there are loaded messages (from sessions)
  const hasLoadedMessages = messages.length > 0

  console.log('ChatInterface component rendering...')

  return (
    <div className="flex-1 bg-white flex flex-col h-screen">
      {/* Top Right - Preview Dropdown */}
      <div className="p-4 flex justify-end">
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setPreviewDropdownOpen(!previewDropdownOpen)}
          >
            Preview
            <span className={`transition-transform duration-200 ${previewDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>
          
          {/* Dropdown Menu */}
          {previewDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="py-1">
                <button
                  onClick={() => handlePreviewOption('Website')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Website
                </button>
                <button
                  onClick={() => handlePreviewOption('Facebook')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handlePreviewOption('WhatsApp')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Replay Indicator */}
      {isReplaying && (
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center gap-2 text-blue-700">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
            <span className="text-sm font-medium">Replaying conversation...</span>
          </div>
        </div>
      )}

      {/* Input Field and Header - Only show when no messages */}
      {!hasLoadedMessages && (
        <div className={`transition-all duration-500 ease-in-out ${
          hasStartedTyping ? 'px-6 pb-4 border-b border-gray-200' : 'px-6 pb-4'
        }`}>
          {!hasStartedTyping ? (
            // Centered input when not typing
            <div className="flex justify-center mt-60">
              <div className="w-full max-w-2xl text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Start a conversation
                  </h2>
                  <p className="text-gray-600">
                    Type your message below to begin chatting with the AI agent
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Start typing..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-ai-purple focus:border-transparent text-center"
                    disabled={isReplaying}
                  />
                  <button
                    type="submit"
                    className={`p-3 rounded-lg transition-colors ${
                      isReplaying 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    disabled={isReplaying}
                  >
                    📤
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Top input when typing
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Start typing..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-ai-purple focus:border-transparent"
                disabled={isReplaying}
              />
              <button
                type="submit"
                className={`p-3 rounded-lg transition-colors ${
                  isReplaying 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                disabled={isReplaying}
              >
                📤
              </button>
            </form>
          )}
        </div>
      )}

      {/* Quick Action Buttons - Only show when no messages */}
      {!hasLoadedMessages && (
        <div className="px-6 pb-4">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className={`quick-action-btn ${
                      isReplaying ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isReplaying}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Area - Now shows at top when messages exist */}
      <div className={`flex-1 overflow-y-auto px-6 ${hasLoadedMessages ? 'pt-4 pb-4' : 'pb-4'}`}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-sm">No messages yet. Start typing above to begin your conversation.</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Message 
                key={message.id} 
                message={message} 
                debugEnabled={debugEnabled}
                isSelected={selectedMessageId === message.id}
                onSelect={() => onMessageSelect(message.id)}
                onRegenerate={onRegenerateMessage}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input Field at Bottom - Always show when there are messages */}
      {hasLoadedMessages && (
        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={isReplaying ? "Replaying conversation..." : "Continue the conversation..."}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-ai-purple focus:border-transparent"
              disabled={isReplaying}
            />
            <button
              type="submit"
              className={`p-3 rounded-lg transition-colors ${
                isReplaying 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              disabled={isReplaying}
            >
              📤
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ChatInterface
