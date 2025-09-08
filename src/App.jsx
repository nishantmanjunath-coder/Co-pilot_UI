import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNavigation from './components/TopNavigation'
import HistoryPanel from './components/HistoryPanel'
import ChatInterface from './components/ChatInterface'
import DebugPanel from './components/DebugPanel'
import AnalysisPanel from './components/AnalysisPanel'

function App() {
  const [activeTab, setActiveTab] = useState('Playground')
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [historyPanelCollapsed, setHistoryPanelCollapsed] = useState(false)
  const [debugPanelCollapsed, setDebugPanelCollapsed] = useState(true)
  const [analysisPanelCollapsed, setAnalysisPanelCollapsed] = useState(true)
  const [isReplaying, setIsReplaying] = useState(false)
  const [showCopyNotification, setShowCopyNotification] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [conversationVersions, setConversationVersions] = useState({})
  const [currentVersion, setCurrentVersion] = useState({})
  const [versionHistory, setVersionHistory] = useState({})
  const [showFeedbackNotification, setShowFeedbackNotification] = useState(false)

  // Sample conversations for different instance types
  const sampleConversations = {
    'Instances': {
      'Instance 1': [
        { id: 1, type: 'user', content: 'Hello, I need help with my project.', timestamp: '10:30 AM' },
        { id: 2, type: 'assistant', content: 'Hello! I\'d be happy to help you with your project. What kind of project are you working on?', timestamp: '10:30 AM' },
        { id: 3, type: 'user', content: 'I\'m building a web application using React.', timestamp: '10:31 AM' },
        { id: 4, type: 'assistant', content: 'Great choice! React is excellent for building modern web applications. What specific aspect would you like help with?', timestamp: '10:31 AM' }
      ],
      'Instance 2': [
        { id: 1, type: 'user', content: 'Can you explain how to use hooks in React?', timestamp: '2:15 PM' },
        { id: 2, type: 'assistant', content: 'Absolutely! React Hooks are functions that allow you to use state and other React features in functional components. The most common ones are useState and useEffect.', timestamp: '2:15 PM' },
        { id: 3, type: 'user', content: 'How do I use useState?', timestamp: '2:16 PM' },
        { id: 4, type: 'assistant', content: 'useState is a Hook that lets you add React state to functional components. Here\'s the syntax: const [state, setState] = useState(initialValue);', timestamp: '2:16 PM' }
      ],
      'Instance 3': [
        { id: 1, type: 'user', content: 'What\'s the best way to handle forms in React?', timestamp: '4:45 PM' },
        { id: 2, type: 'assistant', content: 'For forms in React, you can use controlled components where form data is handled by the component\'s state, or uncontrolled components using refs.', timestamp: '4:45 PM' },
        { id: 3, type: 'user', content: 'Can you show me an example of a controlled component?', timestamp: '4:46 PM' },
        { id: 4, type: 'assistant', content: 'Sure! Here\'s a simple example: const [input, setInput] = useState(""); return <input value={input} onChange={(e) => setInput(e.target.value)} />;', timestamp: '4:46 PM' }
      ],
      'Instance 4': [
        { id: 1, type: 'user', content: 'How do I deploy a React app?', timestamp: '6:20 PM' },
        { id: 2, type: 'assistant', content: 'There are several ways to deploy a React app. You can use platforms like Netlify, Vercel, GitHub Pages, or build and deploy to traditional hosting services.', timestamp: '6:20 PM' },
        { id: 3, type: 'user', content: 'Which one do you recommend for beginners?', timestamp: '6:21 PM' },
        { id: 4, type: 'assistant', content: 'For beginners, I\'d recommend Netlify or Vercel. They offer free hosting, automatic deployments from Git, and are very easy to set up.', timestamp: '6:21 PM' }
      ]
    },
    'Failed test cases': {
      'Instance 1': [
        { id: 1, type: 'user', content: 'My tests are failing with "Cannot read property of undefined"', timestamp: '9:15 AM' },
        { id: 2, type: 'assistant', content: 'This error typically occurs when you\'re trying to access a property on an undefined object. Let\'s debug this step by step.', timestamp: '9:15 AM', metrics: { cost: '0.18$', tokens: '2800', latency: '22ms' }, debugLogs: [
          { type: 'setting', text: 'agent set Language to English', timestamp: '1m' },
          { type: 'personality', text: "agent's personality: Helpful, Technical", timestamp: '1m' },
          { type: 'trigger', text: 'Debug React error triggered by agent', timestamp: '1m', icon: '🔧' },
          { type: 'instruction', text: 'Task instructions started by agent', timestamp: '1m' },
          { type: 'guidance', text: 'agent followed the Guidance below', timestamp: 'now' },
          { type: 'guidance', text: 'Provide step-by-step debugging approach', timestamp: '' },
          { type: 'thought', text: "agent's thoughts (Step 1) > Analyzing error pattern", timestamp: 'now', icon: '✨' }
        ] },
        { id: 3, type: 'user', content: 'The error happens in my component when I try to access user.name', timestamp: '9:16 AM' },
        { id: 4, type: 'assistant', content: 'You need to add a null check before accessing user.name. Try: {user && user.name ? user.name : "Loading..."}', timestamp: '9:16 AM', metrics: { cost: '0.15$', tokens: '2400', latency: '18ms' } }
      ],
      'Instance 2': [
        { id: 1, type: 'user', content: 'Jest test is failing with "SyntaxError: Cannot use import statement outside a module"', timestamp: '11:30 AM' },
        { id: 2, type: 'assistant', content: 'This error suggests your Jest configuration isn\'t set up for ES6 modules. You need to configure Babel or use Jest\'s ES6 support.', timestamp: '11:30 AM', metrics: { cost: '0.21$', tokens: '3200', latency: '25ms' } },
        { id: 3, type: 'user', content: 'How do I configure Babel for Jest?', timestamp: '11:31 AM' },
        { id: 4, type: 'assistant', content: 'Create a babel.config.js file in your project root with: { presets: ["@babel/preset-env", "@babel/preset-react"] }', timestamp: '11:31 AM', metrics: { cost: '0.19$', tokens: '2600', latency: '20ms' } }
      ],
      'Instance 3': [
        { id: 1, type: 'user', content: 'My component test is failing because of missing context', timestamp: '3:45 PM' },
        { id: 2, type: 'assistant', content: 'You need to wrap your component in the required context providers during testing. Use React Testing Library\'s render method with a wrapper.', timestamp: '3:45 PM', metrics: { cost: '0.24$', tokens: '3500', latency: '28ms' } },
        { id: 3, type: 'user', content: 'Can you show me an example?', timestamp: '3:46 PM' },
        { id: 4, type: 'assistant', content: 'Here\'s an example: render(<MyComponent />, { wrapper: MyContextProvider })', timestamp: '3:46 PM', metrics: { cost: '0.12$', tokens: '1800', latency: '15ms' } }
      ],
      'Instance 4': [
        { id: 1, type: 'user', content: 'Async test is timing out', timestamp: '5:20 PM' },
        { id: 2, type: 'assistant', content: 'Async test timeouts usually happen when promises aren\'t properly awaited or when async operations take longer than expected.', timestamp: '5:20 PM', metrics: { cost: '0.26$', tokens: '3800', latency: '30ms' } },
        { id: 3, type: 'user', content: 'I\'m using waitFor but it\'s still timing out', timestamp: '5:21 PM' },
        { id: 4, type: 'assistant', content: 'Make sure you\'re using the correct syntax: await waitFor(() => expect(element).toBeInTheDocument())', timestamp: '5:21 PM', metrics: { cost: '0.20$', tokens: '2900', latency: '23ms' } }
      ]
    },
    'Failed production cases': {
      'Session 1': [
        { id: 1, type: 'user', content: 'Users are getting 500 errors when submitting forms', timestamp: '8:30 AM' },
        { id: 2, type: 'assistant', content: '500 errors indicate server-side issues. Let\'s check your server logs and database connections first.', timestamp: '8:30 AM', metrics: { cost: '0.16$', tokens: '2500', latency: '19ms' }, debugLogs: [
          { type: 'setting', text: 'agent set Language to English', timestamp: '1m' },
          { type: 'personality', text: "agent's personality: Supportive, Diagnostic", timestamp: '1m' },
          { type: 'trigger', text: 'Troubleshoot server error triggered by agent', timestamp: '1m', icon: '🔧' },
          { type: 'instruction', text: 'Task instructions started by agent', timestamp: '1m' },
          { type: 'guidance', text: 'agent followed the Guidance below', timestamp: 'now' },
          { type: 'guidance', text: 'Focus on server-side diagnostics first', timestamp: '' },
          { type: 'thought', text: "agent's thoughts (Step 1) > Checking error patterns", timestamp: 'now', icon: '✨' }
        ] },
        { id: 3, type: 'user', content: 'The logs show database connection timeout', timestamp: '8:31 AM' },
        { id: 4, type: 'assistant', content: 'You need to implement connection pooling and retry logic for your database connections.', timestamp: '8:31 AM', metrics: { cost: '0.22$', tokens: '3200', latency: '26ms' } }
      ],
      'Instance 2': [
        { id: 1, type: 'user', content: 'Mobile users can\'t access the app', timestamp: '10:45 AM' },
        { id: 2, type: 'assistant', content: 'This could be a responsive design issue or mobile-specific JavaScript errors. Let\'s check the mobile console logs.', timestamp: '10:45 AM', metrics: { cost: '0.28$', tokens: '4100', latency: '32ms' } },
        { id: 3, type: 'user', content: 'The app works on desktop but not mobile', timestamp: '10:46 AM' },
        { id: 4, type: 'assistant', content: 'Check for mobile-specific CSS media queries and ensure all JavaScript is mobile-compatible.', timestamp: '10:46 AM', metrics: { cost: '0.19$', tokens: '2800', latency: '21ms' } }
      ],
      'Instance 3': [
        { id: 1, type: 'user', content: 'API calls are taking too long', timestamp: '2:15 PM' },
        { id: 2, type: 'assistant', content: 'Slow API calls could be due to database queries, network latency, or server performance. Let\'s analyze the bottlenecks.', timestamp: '2:15 PM', metrics: { cost: '0.25$', tokens: '3600', latency: '27ms' } },
        { id: 3, type: 'user', content: 'Database queries are slow', timestamp: '2:16 PM' },
        { id: 4, type: 'assistant', content: 'You need to optimize your database queries, add proper indexing, and consider implementing caching.', timestamp: '2:16 PM', metrics: { cost: '0.21$', tokens: '3000', latency: '24ms' } }
      ],
      'Instance 4': [
        { id: 1, type: 'user', content: 'Users are experiencing random crashes', timestamp: '4:30 PM' },
        { id: 2, type: 'assistant', content: 'Random crashes often indicate memory leaks, unhandled errors, or race conditions. Let\'s implement better error handling.', timestamp: '4:30 PM', metrics: { cost: '0.29$', tokens: '4200', latency: '31ms' } },
        { id: 3, type: 'user', content: 'How do I implement error boundaries?', timestamp: '4:31 PM' },
        { id: 4, type: 'assistant', content: 'Create an Error Boundary component that catches JavaScript errors and displays a fallback UI.', timestamp: '4:31 PM', metrics: { cost: '0.17$', tokens: '2400', latency: '18ms' } }
      ]
    },
    'External Sessions': {
      'Session 1': [
        { id: 1, type: 'user', content: 'How do I integrate with Stripe payment?', timestamp: '9:00 AM' },
        { id: 2, type: 'assistant', content: 'To integrate with Stripe, you\'ll need to install the Stripe library and set up both client and server-side code.', timestamp: '9:00 AM', metrics: { cost: '0.23$', tokens: '3300', latency: '25ms' }, debugLogs: [
          { type: 'setting', text: 'agent set Language to English', timestamp: '1m' },
          { type: 'personality', text: "agent's personality: Technical, Detailed", timestamp: '1m' },
          { type: 'trigger', text: 'Integration guidance triggered by agent', timestamp: '1m', icon: '🔧' },
          { type: 'instruction', text: 'Task instructions started by agent', timestamp: '1m' },
          { type: 'guidance', text: 'agent followed the Guidance below', timestamp: 'now' },
          { type: 'guidance', text: 'Provide comprehensive integration steps', timestamp: '' },
          { type: 'thought', text: "agent's thoughts (Step 1) > Analyzing integration requirements", timestamp: 'now', icon: '✨' }
        ] },
        { id: 3, type: 'user', content: 'Can you show me the basic setup?', timestamp: '9:01 AM' },
        { id: 4, type: 'assistant', content: 'First install: npm install @stripe/stripe-js. Then initialize: const stripe = Stripe("your_publishable_key");', timestamp: '9:01 AM', metrics: { cost: '0.14$', tokens: '2100', latency: '16ms' } }
      ],
      'Instance 2': [
        { id: 1, type: 'user', content: 'I need to integrate with Google Maps API', timestamp: '11:00 AM' },
        { id: 2, type: 'assistant', content: 'Google Maps integration requires an API key and the Google Maps JavaScript library. You can use libraries like @googlemaps/js-api-loader.', timestamp: '11:00 AM', metrics: { cost: '0.27$', tokens: '3900', latency: '29ms' } },
        { id: 3, type: 'user', content: 'How do I get an API key?', timestamp: '11:01 AM' },
        { id: 4, type: 'assistant', content: 'Go to Google Cloud Console, enable Maps JavaScript API, and create credentials to get your API key.', timestamp: '11:01 AM', metrics: { cost: '0.20$', tokens: '2900', latency: '22ms' } }
      ],
      'Instance 3': [
        { id: 1, type: 'user', content: 'How to integrate with SendGrid for emails?', timestamp: '1:30 PM' },
        { id: 2, type: 'assistant', content: 'SendGrid integration requires setting up authentication and using their API or SMTP. You can use their Node.js library.', timestamp: '1:30 PM', metrics: { cost: '0.26$', tokens: '3700', latency: '28ms' } },
        { id: 3, type: 'user', content: 'What\'s the difference between API and SMTP?', timestamp: '1:31 PM' },
        { id: 4, type: 'assistant', content: 'API is more modern and feature-rich, while SMTP is traditional email protocol. API is recommended for new integrations.', timestamp: '1:31 PM', metrics: { cost: '0.18$', tokens: '2600', latency: '20ms' } }
      ],
      'Instance 4': [
        { id: 1, type: 'user', content: 'I need to integrate with AWS S3', timestamp: '3:00 PM' },
        { id: 2, type: 'assistant', content: 'AWS S3 integration requires AWS SDK and proper IAM permissions. You can use the AWS SDK for JavaScript.', timestamp: '3:00 PM', metrics: { cost: '0.22$', tokens: '3200', latency: '25ms' } },
        { id: 3, type: 'user', content: 'How do I set up IAM permissions?', timestamp: '3:01 PM' },
        { id: 4, type: 'assistant', content: 'Create an IAM user with S3 permissions, or use IAM roles if running on EC2. Attach the AmazonS3FullAccess policy for full access.', timestamp: '3:01 PM', metrics: { cost: '0.25$', tokens: '3600', latency: '27ms' } }
      ]
    }
  }

  const handleSendMessage = async (message) => {
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate GPT response (replace with actual API call)
    setTimeout(() => {
      const gptResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `I understand you said: "${message}". This is a simulated response from the GPT-powered conversational agent. In a real implementation, this would be an actual API call to OpenAI's GPT model.`,
        timestamp: new Date().toLocaleTimeString(),
        metrics: { cost: '0.20$', tokens: '3000', latency: '20ms' },
        debugLogs: [
          { type: 'setting', text: 'agent set Language to English', timestamp: '1m' },
          { type: 'personality', text: "agent's personality: Helpful, Conversational", timestamp: '1m' },
          { type: 'trigger', text: 'General conversation triggered by agent', timestamp: '1m', icon: '🔧' },
          { type: 'instruction', text: 'Task instructions started by agent', timestamp: '1m' },
          { type: 'guidance', text: 'agent followed the Guidance below', timestamp: 'now' },
          { type: 'guidance', text: 'Provide helpful and accurate responses', timestamp: '' },
          { type: 'thought', text: "agent's thoughts (Step 1) > Processing user input", timestamp: 'now', icon: '✨' }
        ]
      }
      setMessages(prev => [...prev, gptResponse])
    }, 1000)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleHistoryPanel = () => {
    setHistoryPanelCollapsed(!historyPanelCollapsed)
  }

  const toggleDebugPanel = () => {
    const newDebugState = !debugPanelCollapsed
    
    setDebugPanelCollapsed(newDebugState)
    
    // If debug panel is being opened (Debug mode), expand the left sidebar
    if (newDebugState) {
      setSidebarCollapsed(false)
    } else {
      // If debug panel is being closed (Preview mode), collapse the left sidebar and analysis panel
      setSidebarCollapsed(true)
      setAnalysisPanelCollapsed(true)
    }
  }

  const toggleAnalysisPanel = () => {
    setAnalysisPanelCollapsed(!analysisPanelCollapsed)
  }

  const handleMessageSelect = (messageId) => {
    setSelectedMessageId(messageId)
  }

  const handleRegenerateMessage = async (messageToRegenerate) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageToRegenerate.id)
    if (messageIndex === -1) return

    // Create a unique message version ID
    const messageVersionId = `msg_${messageToRegenerate.id}_${Date.now()}`
    
    // Get or create conversation ID for this message (use instance_1 as default for now)
    const conversationId = currentVersion.conversationId || 'instance_1'
    
    // Get existing versions for this message or create new
    const existingVersions = conversationVersions[conversationId]?.messageVersions?.[messageToRegenerate.id] || []
    const versionNumber = existingVersions.length + 1

    // Store the current conversation state before regeneration
    const conversationSnapshot = {
      id: messageVersionId,
      messages: [...messages],
      timestamp: new Date().toISOString(),
      version: versionNumber,
      messageId: messageToRegenerate.id,
      messageIndex: messageIndex
    }

    // Update conversation versions with message-specific versioning
    setConversationVersions(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        parentId: prev[conversationId]?.parentId || conversationId,
        messageVersions: {
          ...prev[conversationId]?.messageVersions,
          [messageToRegenerate.id]: [
            ...existingVersions,
            conversationSnapshot
          ]
        }
      }
    }))

    // Create the regenerated message
    const regeneratedMessage = {
      ...messageToRegenerate,
      id: Date.now(),
      content: `Here's a regenerated response for: "${messageToRegenerate.content}". This is version ${versionNumber} of this message.`,
      timestamp: new Date().toLocaleTimeString(),
      metrics: { 
        cost: (Math.random() * 0.1 + 0.15).toFixed(2) + '$', 
        tokens: Math.floor(Math.random() * 1000 + 2000).toString(), 
        latency: Math.floor(Math.random() * 10 + 15) + 'ms' 
      },
      debugLogs: [
        { type: 'setting', text: 'agent set Language to English', timestamp: '1m' },
        { type: 'personality', text: "agent's personality: Helpful, Regenerated", timestamp: '1m' },
        { type: 'trigger', text: 'Message regeneration triggered by agent', timestamp: '1m', icon: '🔄' },
        { type: 'instruction', text: 'Task instructions started by agent', timestamp: '1m' },
        { type: 'guidance', text: 'agent followed the Guidance below', timestamp: 'now' },
        { type: 'guidance', text: 'Provide improved response quality', timestamp: '' },
        { type: 'thought', text: "agent's thoughts (Step 1) > Regenerating with improvements", timestamp: 'now', icon: '✨' }
      ]
    }

    // Create new conversation with regenerated message
    const newMessages = [
      ...messages.slice(0, messageIndex),
      regeneratedMessage,
      ...messages.slice(messageIndex + 1)
    ]

    // Set current version
    setCurrentVersion({
      conversationId,
      version: versionNumber,
      messageId: regeneratedMessage.id,
      originalMessageId: messageToRegenerate.id
    })

    // Update messages with streaming effect
    if (isReplaying) return
    setIsReplaying(true)
    setMessages([])

    // Stream the new conversation
    for (let i = 0; i < newMessages.length; i++) {
      const message = newMessages[i]
      
      if (message.id === regeneratedMessage.id) {
        // Stream the regenerated message character by character
        setMessages(prev => [...prev, { ...message, content: '' }])
        
        let currentContent = ''
        for (let j = 0; j < message.content.length; j++) {
          currentContent += message.content[j]
          
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages]
            const lastMessageIndex = updatedMessages.length - 1
            if (lastMessageIndex >= 0) {
              updatedMessages[lastMessageIndex] = {
                ...updatedMessages[lastMessageIndex],
                content: currentContent
              }
            }
            return updatedMessages
          })
          
          await new Promise(resolve => setTimeout(resolve, 20))
        }
      } else {
        setMessages(prev => [...prev, message])
      }
      
      const delay = message.type === 'user' ? 800 : 1200
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    setIsReplaying(false)
    console.log('Message regenerated with versioning:', conversationId, versionNumber, 'for message:', messageToRegenerate.id)
  }

  const handleVersionNavigation = (direction) => {
    const { conversationId, version, originalMessageId } = currentVersion
    if (!conversationId || !conversationVersions[conversationId] || !originalMessageId) return

    const messageVersions = conversationVersions[conversationId].messageVersions?.[originalMessageId] || []
    const currentVersionIndex = messageVersions.findIndex(v => v.version === version)
    
    if (direction === 'prev' && currentVersionIndex > 0) {
      const prevVersion = messageVersions[currentVersionIndex - 1]
      setMessages(prevVersion.messages)
      setCurrentVersion({
        conversationId,
        version: prevVersion.version,
        messageId: prevVersion.messageId,
        originalMessageId: originalMessageId
      })
    } else if (direction === 'next' && currentVersionIndex < messageVersions.length - 1) {
      const nextVersion = messageVersions[currentVersionIndex + 1]
      setMessages(nextVersion.messages)
      setCurrentVersion({
        conversationId,
        version: nextVersion.version,
        messageId: nextVersion.messageId,
        originalMessageId: originalMessageId
      })
    }
  }

  const getVersionInfo = () => {
    const { conversationId, version, originalMessageId } = currentVersion
    if (!conversationId || !conversationVersions[conversationId] || !originalMessageId) {
      return { current: 1, total: 1, canGoPrev: false, canGoNext: false }
    }

    const messageVersions = conversationVersions[conversationId].messageVersions?.[originalMessageId] || []
    const currentVersionIndex = messageVersions.findIndex(v => v.version === version)
    
    return {
      current: version,
      total: messageVersions.length,
      canGoPrev: currentVersionIndex > 0,
      canGoNext: currentVersionIndex < messageVersions.length - 1
    }
  }

  const handleLoadVersion = (conversationId, versionNumber, messageId) => {
    const conversation = conversationVersions[conversationId]
    if (!conversation) return

    // If messageId is provided, load from message-specific versions
    if (messageId) {
      const messageVersions = conversation.messageVersions?.[messageId] || []
      const version = messageVersions.find(v => v.version === versionNumber)
      if (!version) return

      setMessages(version.messages)
      setCurrentVersion({
        conversationId,
        version: versionNumber,
        messageId: version.messageId,
        originalMessageId: messageId
      })
      
      console.log('Loaded message version:', conversationId, versionNumber, 'for message:', messageId)
    } else {
      // Fallback to conversation-level versions (legacy support)
      const version = conversation.versions?.find(v => v.version === versionNumber)
      if (!version) return

      setMessages(version.messages)
      setCurrentVersion({
        conversationId,
        version: versionNumber,
        messageId: version.messages[version.messages.length - 1]?.id
      })
      
      console.log('Loaded conversation version:', conversationId, versionNumber)
    }
  }

  const handleFeedbackSubmit = (isHelpful) => {
    console.log('Debugger suggestions feedback submitted:', isHelpful ? 'Suggestions Helpful' : 'Suggestions Not Helpful')
    setShowFeedbackNotification(false)
    // Here you could send the feedback to your backend
  }

  const handleAnalyzeClick = () => {
    // Open analysis panel and ensure debug panel is also open
    setAnalysisPanelCollapsed(false)
    setDebugPanelCollapsed(false)
  }

  const handleReplayFromAnalysis = async () => {
    // Replay a sample conversation to demonstrate the improvements
    const sampleConversation = [
      { id: 1, type: 'user', content: 'Hello, I need help with my project.', timestamp: '10:30 AM' },
      { id: 2, type: 'assistant', content: 'Hello! My name is Mia. Good Morning! How may I assist you today?', timestamp: '10:30 AM' },
      { id: 3, type: 'user', content: 'I\'m building a web application using React.', timestamp: '10:31 AM' },
      { id: 4, type: 'assistant', content: 'Great choice! React is excellent for building modern web applications. What specific aspect would you like help with? I can assist you with components, hooks, state management, or any other React-related topics.', timestamp: '10:31 AM' }
    ]

    if (!isReplaying) {
      setIsReplaying(true)
      setMessages([]) // Clear current messages
      
      console.log('Starting regeneration replay from analysis panel...')
      
      // Stream messages one by one with realistic delays
      for (let i = 0; i < sampleConversation.length; i++) {
        const message = sampleConversation[i]
        
        // Add message to the conversation
        setMessages(prev => [...prev, message])
        
        // Wait before showing next message (realistic typing/response time)
        const delay = message.type === 'user' ? 800 : 1200
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      
      setIsReplaying(false)
      console.log('Regeneration replay completed from analysis panel')
      
      // Show feedback notification if in debug mode
      if (!debugPanelCollapsed) {
        setShowFeedbackNotification(true)
      }
    }
  }

  const loadSession = (category, sessionName) => {
    const sessionData = sampleConversations[category]?.[sessionName]
    if (sessionData) {
      setMessages(sessionData)
      console.log(`Loaded session: ${category} - ${sessionName}`)
    }
  }

  const replaySession = async (category, sessionName) => {
    const sessionData = sampleConversations[category]?.[sessionName]
    if (sessionData && !isReplaying) {
      setIsReplaying(true)
      setMessages([]) // Clear current messages
      
      console.log(`Starting replay of session: ${category} - ${sessionName}`)
      
      // Stream messages one by one with realistic delays
      for (let i = 0; i < sessionData.length; i++) {
        const message = sessionData[i]
        
        // Add message to the conversation
        setMessages(prev => [...prev, message])
        
        // Wait before showing next message (realistic typing/response time)
        const delay = message.type === 'user' ? 800 : 1200 // User messages faster, AI responses slower
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      
      setIsReplaying(false)
      console.log(`Replay completed for session: ${category} - ${sessionName}`)
    }
  }

  const shareSession = async (category, sessionName) => {
    try {
      // Generate a shareable link (in a real app, this would create a unique URL)
      const shareableLink = `${window.location.origin}/share/${encodeURIComponent(category)}/${encodeURIComponent(sessionName)}`
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareableLink)
      
      // Show copy notification
      setShowCopyNotification(true)
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowCopyNotification(false)
      }, 3000)
      
      console.log(`Shared session: ${category} - ${sessionName}`)
      console.log(`Shareable link: ${shareableLink}`)
    } catch (error) {
      console.error('Failed to copy link:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareableLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      setShowCopyNotification(true)
      setTimeout(() => {
        setShowCopyNotification(false)
      }, 3000)
    }
  }

  const loadExampleConversation = (category, sessionName) => {
    const sessionData = sampleConversations[category]?.[sessionName]
    if (sessionData) {
      setMessages(sessionData)
      console.log(`Loaded example conversation: ${category} - ${sessionName}`)
    }
  }

  console.log('App component rendering...')

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        onToggleHistory={toggleHistoryPanel}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Navigation */}
        <TopNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          debugEnabled={!debugPanelCollapsed}
          onToggleDebug={toggleDebugPanel}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex min-h-0">
          {/* History Panel */}
          <HistoryPanel 
            collapsed={historyPanelCollapsed}
            onToggle={toggleHistoryPanel}
            onSessionClick={loadSession}
            onReplay={replaySession}
            onShare={shareSession}
            isReplaying={isReplaying}
            conversationVersions={conversationVersions}
            currentVersion={currentVersion}
            onLoadVersion={handleLoadVersion}
          />
          
          {/* Chat Interface */}
          <ChatInterface 
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={handleSendMessage}
            isReplaying={isReplaying}
            onLoadExample={loadExampleConversation}
            debugEnabled={!debugPanelCollapsed}
            selectedMessageId={selectedMessageId}
            onMessageSelect={handleMessageSelect}
            onRegenerateMessage={handleRegenerateMessage}
            versionInfo={getVersionInfo()}
            onVersionNavigation={handleVersionNavigation}
          />
          
          {/* Debug Panel */}
          <DebugPanel 
            collapsed={debugPanelCollapsed}
            onToggle={toggleDebugPanel}
            onAnalyzeClick={handleAnalyzeClick}
            selectedMessage={messages.find(msg => msg.id === selectedMessageId)}
            debugEnabled={!debugPanelCollapsed}
          />
          
          {/* Analysis Panel */}
          <AnalysisPanel 
            collapsed={analysisPanelCollapsed}
            onToggle={toggleAnalysisPanel}
            onReplayConversation={handleReplayFromAnalysis}
            showFeedbackNotification={showFeedbackNotification}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        </div>
      </div>

      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Link copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
