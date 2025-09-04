import React from 'react'

function Sidebar({ collapsed, onToggle, onToggleHistory }) {
  console.log('Sidebar component rendering...', { collapsed })
  
  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header with Toggle */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-2xl font-bold text-yellow-ai-purple">yellow.ai</h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 text-gray-600 hover:text-yellow-ai-purple hover:bg-gray-100 rounded-lg transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 space-y-2">
        {/* History Button - Moved to top */}
        <div 
          className={`sidebar-item ${collapsed ? 'collapsed' : ''} cursor-pointer`}
          onClick={onToggleHistory}
          title={collapsed ? "Toggle History Panel" : "Toggle History Panel"}
        >
          <span>📜</span>
          {!collapsed && <span>History</span>}
        </div>

        {/* Home */}
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>🏠</span>
          {!collapsed && <span>Home</span>}
        </div>

        {/* Dashboards */}
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>📊</span>
          {!collapsed && <span>Dashboards</span>}
        </div>

        {/* BUILD & DEPLOY Section */}
        {!collapsed && <div className="sidebar-heading">BUILD & DEPLOY</div>}
        
        <div className={`sidebar-item active ${collapsed ? 'collapsed' : ''}`}>
          <span>🤖</span>
          {!collapsed && <span>AI Agent Studio</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>📋</span>
          {!collapsed && <span>Test suites</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>⚙️</span>
          {!collapsed && <span>Process automation</span>}
        </div>

        {/* KNOWLEDGE Section */}
        {!collapsed && <div className="sidebar-heading">KNOWLEDGE</div>}
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>📁</span>
          {!collapsed && <span>Files</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>🗄️</span>
          {!collapsed && <span>Database</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>🌐</span>
          {!collapsed && <span>API</span>}
        </div>

        {/* INSIGHTS Section */}
        {!collapsed && <div className="sidebar-heading">INSIGHTS</div>}
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>📊</span>
          {!collapsed && <span>Overview</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>💬</span>
          {!collapsed && <span>Analyze conversation</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>🔍</span>
          {!collapsed && <span>Data explorer</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>📈</span>
          {!collapsed && <span>Analytics</span>}
        </div>

        {/* INBOX Section */}
        {!collapsed && <div className="sidebar-heading">INBOX</div>}
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>👁️</span>
          {!collapsed && <span>Monitor</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>💭</span>
          {!collapsed && <span>Chats</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>🎫</span>
          {!collapsed && <span>Tickets</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>📊</span>
          {!collapsed && <span>Analytics</span>}
        </div>

        {/* Extensions & Settings */}
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>🧩</span>
          {!collapsed && <span>Extensions</span>}
        </div>
        
        <div className={`sidebar-item ${collapsed ? 'collapsed' : ''}`}>
          <span>⚙️</span>
          {!collapsed && <span>Settings</span>}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg">
          <div className="w-8 h-8 bg-yellow-ai-purple rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          {!collapsed && (
            <div className="flex-1">
              <div className="text-sm font-medium">Blu etc b...</div>
              <div className="text-xs text-gray-500">Staging</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
