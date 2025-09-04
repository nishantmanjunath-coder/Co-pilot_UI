import streamlit as st
import time
import json
from datetime import datetime

# Page configuration
st.set_page_config(
    page_title="Conversational Agent Platform",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        text-align: center;
    }
    
    .main-header h1 {
        color: white;
        margin: 0;
        font-size: 2.5rem;
    }
    
    .chat-message {
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border-left: 4px solid;
    }
    
    .user-message {
        background-color: #e3f2fd;
        border-left-color: #2196f3;
        margin-left: 20%;
    }
    
    .assistant-message {
        background-color: #f3e5f5;
        border-left-color: #9c27b0;
        margin-right: 20%;
    }
    
    .debug-logs {
        background-color: #f5f5f5;
        padding: 0.5rem;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        font-size: 0.8rem;
        color: #666;
    }
    
    .metrics-container {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        background-color: #f9f9f9;
        border-radius: 5px;
    }
    
    .metric-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8rem;
    }
    
    .metric-icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        font-weight: bold;
    }
    
    .cost-icon { background-color: #ffd700; color: #b8860b; }
    .token-icon { background-color: #4caf50; color: white; }
    .latency-icon { background-color: #f44336; color: white; }
    
    .sidebar-section {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }
    
    .flowchart-container {
        background-color: white;
        padding: 2rem;
        border-radius: 10px;
        border: 1px solid #ddd;
        margin: 1rem 0;
    }
    
    .flowchart-node {
        display: inline-block;
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        border-radius: 8px;
        text-align: center;
        font-weight: bold;
        border: 2px solid;
    }
    
    .node-green { background-color: #d4edda; border-color: #28a745; color: #155724; }
    .node-red { background-color: #f8d7da; border-color: #dc3545; color: #721c24; }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'messages' not in st.session_state:
    st.session_state.messages = []
if 'debug_mode' not in st.session_state:
    st.session_state.debug_mode = False
if 'selected_message' not in st.session_state:
    st.session_state.selected_message = None
if 'show_flowchart' not in st.session_state:
    st.session_state.show_flowchart = False
if 'show_notification' not in st.session_state:
    st.session_state.show_notification = False
if 'active_tab' not in st.session_state:
    st.session_state.active_tab = 'Analyze'

# Sample conversation data
sample_conversations = {
    'Failed test cases': {
        'Session 1': [
            {'id': 1, 'type': 'user', 'content': 'My tests are failing with "Cannot read property of undefined"', 'timestamp': '9:15 AM'},
            {'id': 2, 'type': 'assistant', 'content': 'This error typically occurs when you\'re trying to access a property on an undefined object. Let\'s debug this step by step.', 'timestamp': '9:15 AM', 'metrics': {'cost': '0.18$', 'tokens': '2800', 'latency': '22ms'}, 'debugLogs': [
                {'type': 'setting', 'text': 'agent set Language to English', 'timestamp': '1m'},
                {'type': 'personality', 'text': "agent's personality: Helpful, Technical", 'timestamp': '1m'},
                {'type': 'trigger', 'text': 'Debug React error triggered by agent', 'timestamp': '1m', 'icon': '🔧'},
                {'type': 'instruction', 'text': 'Task instructions started by agent', 'timestamp': '1m'},
                {'type': 'guidance', 'text': 'agent followed the Guidance below', 'timestamp': 'now'},
                {'type': 'guidance', 'text': 'Provide step-by-step debugging approach', 'timestamp': ''},
                {'type': 'thought', 'text': "agent's thoughts (Step 1) > Analyzing error pattern", 'timestamp': 'now', 'icon': '✨'}
            ]},
            {'id': 3, 'type': 'user', 'content': 'The error happens in my component when I try to access user.name', 'timestamp': '9:16 AM'},
            {'id': 4, 'type': 'assistant', 'content': 'You need to add a null check before accessing user.name. Try: {user && user.name ? user.name : "Loading..."}', 'timestamp': '9:16 AM', 'metrics': {'cost': '0.15$', 'tokens': '2400', 'latency': '18ms'}}
        ]
    }
}

def render_debug_logs(debug_logs):
    """Render debug logs for a message"""
    if not debug_logs:
        return
    
    for log in debug_logs:
        icon = log.get('icon', '')
        timestamp = log.get('timestamp', '')
        st.markdown(f"""
        <div class="debug-logs">
            {icon} {log['text']} {f'· {timestamp}' if timestamp else ''}
        </div>
        """, unsafe_allow_html=True)

def render_metrics(metrics):
    """Render metrics for a message"""
    if not metrics:
        return
    
    st.markdown(f"""
    <div class="metrics-container">
        <div class="metric-item">
            <div class="metric-icon cost-icon">$</div>
            <span>{metrics['cost']}</span>
        </div>
        <div class="metric-item">
            <div class="metric-icon token-icon">🏷️</div>
            <span>{metrics['tokens']}</span>
        </div>
        <div class="metric-item">
            <div class="metric-icon latency-icon">🕒</div>
            <span>{metrics['latency']}</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

def render_message(message):
    """Render a single message"""
    is_user = message['type'] == 'user'
    
    if is_user:
        st.markdown(f"""
        <div class="chat-message user-message">
            <strong>You:</strong> {message['content']}
            <br><small>{message['timestamp']}</small>
        </div>
        """, unsafe_allow_html=True)
    else:
        # Debug logs (only show in debug mode)
        if st.session_state.debug_mode and 'debugLogs' in message:
            render_debug_logs(message['debugLogs'])
        
        # Message content
        st.markdown(f"""
        <div class="chat-message assistant-message">
            <strong>Agent:</strong> {message['content']}
            <br><small>{message['timestamp']}</small>
        </div>
        """, unsafe_allow_html=True)
        
        # Metrics
        if 'metrics' in message:
            render_metrics(message['metrics'])

def render_flowchart():
    """Render the conversational workflow flowchart"""
    st.markdown("""
    <div class="flowchart-container">
        <h3>Conversational Workflow</h3>
        <div style="text-align: center; margin: 2rem 0;">
            <!-- Top Row -->
            <div style="margin-bottom: 2rem;">
                <span class="flowchart-node node-green">name</span>
                <span style="margin: 0 1rem;">→</span>
                <span class="flowchart-node node-red">phone</span>
                <span style="margin: 0 1rem;">→</span>
                <span class="flowchart-node node-green">age</span>
            </div>
            
            <!-- Vertical connection -->
            <div style="margin: 1rem 0;">
                <div style="width: 2px; height: 40px; background-color: #666; margin: 0 auto;"></div>
            </div>
            
            <!-- Bottom Row -->
            <div>
                <span class="flowchart-node node-green">Start</span>
                <span style="margin: 0 1rem;">→</span>
                <span class="flowchart-node node-red">process</span>
                <span style="margin: 0 1rem;">→</span>
                <span class="flowchart-node node-green">response</span>
                <span style="margin: 0 1rem;">→</span>
                <span class="flowchart-node node-red">End</span>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

# Main header
st.markdown("""
<div class="main-header">
    <h1>🤖 Conversational Agent Platform</h1>
</div>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.markdown("## 🎛️ Controls")
    
    # Debug mode toggle
    debug_mode = st.toggle("Debug Mode", value=st.session_state.debug_mode)
    st.session_state.debug_mode = debug_mode
    
    st.markdown("---")
    
    # Quick actions
    st.markdown("### Quick Actions")
    if st.button("Failed test cases", use_container_width=True):
        # Load sample conversation
        session_data = sample_conversations['Failed test cases']['Session 1']
        st.session_state.messages = session_data
        st.rerun()
    
    if st.button("Failed production cases", use_container_width=True):
        st.info("Loading production cases...")
    
    if st.button("Book a ticket", use_container_width=True):
        st.info("Opening ticket booking...")
    
    st.markdown("---")
    
    # History section
    st.markdown("### 📚 History")
    
    # Sessions
    with st.expander("Sessions", expanded=True):
        if st.button("Session 1", use_container_width=True):
            session_data = sample_conversations['Failed test cases']['Session 1']
            st.session_state.messages = session_data
            st.rerun()
        
        if st.button("Session 2", use_container_width=True):
            st.info("Loading Session 2...")
    
    # Debug panel
    if st.session_state.debug_mode:
        st.markdown("---")
        st.markdown("### 🔍 Debug Panel")
        
        if st.button("Open Flowchart", use_container_width=True):
            st.session_state.show_flowchart = True
            st.rerun()
        
        if st.session_state.selected_message:
            st.markdown("#### Selected Message")
            st.json(st.session_state.selected_message)

# Main content area - adjust columns based on debug mode
if st.session_state.debug_mode:
    col1, col2 = st.columns([2, 1])
else:
    col1 = st.container()

with col1:
    st.markdown("## 💬 Chat Interface")
    
    # Chat messages
    if st.session_state.messages:
        for message in st.session_state.messages:
            render_message(message)
            
            # Add click handler for assistant messages in debug mode
            if not message['type'] == 'user' and st.session_state.debug_mode:
                if st.button(f"Select Message {message['id']}", key=f"select_{message['id']}"):
                    st.session_state.selected_message = message
                    st.rerun()
    else:
        st.info("No messages yet. Use the quick actions in the sidebar to load a conversation.")
    
    # Input area
    st.markdown("---")
    user_input = st.text_input("Type your message:", placeholder="Continue the conversation...")
    
    if st.button("Send", type="primary"):
        if user_input:
            # Add user message
            user_message = {
                'id': len(st.session_state.messages) + 1,
                'type': 'user',
                'content': user_input,
                'timestamp': datetime.now().strftime('%I:%M %p')
            }
            st.session_state.messages.append(user_message)
            
            # Simulate agent response
            with st.spinner("Agent is thinking..."):
                time.sleep(1)
                agent_message = {
                    'id': len(st.session_state.messages) + 1,
                    'type': 'assistant',
                    'content': f'I understand you said: "{user_input}". This is a simulated response from the conversational agent.',
                    'timestamp': datetime.now().strftime('%I:%M %p'),
                    'metrics': {'cost': '0.20$', 'tokens': '3000', 'latency': '20ms'},
                    'debugLogs': [
                        {'type': 'setting', 'text': 'agent set Language to English', 'timestamp': '1m'},
                        {'type': 'personality', 'text': "agent's personality: Helpful, Conversational", 'timestamp': '1m'},
                        {'type': 'trigger', 'text': 'General conversation triggered by agent', 'timestamp': '1m', 'icon': '🔧'},
                        {'type': 'instruction', 'text': 'Task instructions started by agent', 'timestamp': '1m'},
                        {'type': 'guidance', 'text': 'agent followed the Guidance below', 'timestamp': 'now'},
                        {'type': 'guidance', 'text': 'Provide helpful and accurate responses', 'timestamp': ''},
                        {'type': 'thought', 'text': "agent's thoughts (Step 1) > Processing user input", 'timestamp': 'now', 'icon': '✨'}
                    ]
                }
                st.session_state.messages.append(agent_message)
            
            st.rerun()

# Only show analysis panel when debug mode is enabled
if st.session_state.debug_mode:
    with col2:
        st.markdown("## 📊 Analysis Panel")
        
        # Tabs
        tab1, tab2, tab3 = st.tabs(["Analyze", "Solve", "Improve"])
        
        with tab1:
            st.markdown("### Root Cause")
            st.write("From description of issue, it seems like an issue with the AI Agent persona. The agent is not providing detailed responses and is missing proper greetings at the start of conversations.")
            
            st.markdown("### Reasoning")
            st.write("The agent needs better configuration for greeting protocols and response capabilities.")
        
        with tab2:
            st.markdown("### Suggested Changes")
            st.write("1. Modify current version to better specify the instructions.")
            st.write("2. Update greeting protocols.")
            st.write("3. Enhance response capabilities.")
        
        with tab3:
            st.markdown("### Improvement Summary")
            st.info("The AI agent has been updated with proper greeting protocols and enhanced response capabilities. Test the improvements by starting a new conversation.")
            
            col_do, col_replay = st.columns(2)
            
            with col_do:
                if st.button("📝 Do Later", use_container_width=True):
                    st.session_state.show_notification = True
                    st.rerun()
            
            with col_replay:
                if st.button("🔄 Replay", use_container_width=True):
                    st.success("Replaying conversation...")

# Flowchart modal
if st.session_state.show_flowchart:
    st.markdown("---")
    render_flowchart()
    
    if st.button("Close Flowchart"):
        st.session_state.show_flowchart = False
        st.rerun()

# Notification
if st.session_state.show_notification:
    st.markdown("""
    <div class="notification">
        ✅ Added to-do list
    </div>
    """, unsafe_allow_html=True)
    
    # Auto-hide notification after 3 seconds
    time.sleep(3)
    st.session_state.show_notification = False
    st.rerun()

# Footer
st.markdown("---")
st.markdown("Built with ❤️ using Streamlit")
