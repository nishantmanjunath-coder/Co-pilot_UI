# Conversational Agent Platform

A modern conversational AI agent platform built with React, featuring a yellow.ai-inspired interface with advanced debugging and analysis capabilities.

## 🚀 Features

- **Interactive Chat Interface** - Real-time conversation with AI agents
- **Debug Mode** - Toggle debug features with detailed message analysis
- **Message Metrics** - View cost, tokens, and latency for each response
- **Conversation History** - Manage and replay previous sessions
- **Analysis Panel** - Detailed conversation analysis and improvement suggestions
- **Workflow Visualization** - Interactive flowchart of conversation flows
- **Collapsible Sidebars** - Customizable interface layout
- **Sample Conversations** - Pre-loaded test cases and scenarios

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nishantmanjunath-coder/Co-pilot_UI.git
   cd Co-pilot_UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Usage

### Basic Chat
- Type messages in the input field at the bottom
- Send messages to start a conversation with the AI agent
- View responses with detailed metrics (cost, tokens, latency)

### Debug Mode
- Toggle "Debug Mode" in the left sidebar
- Click on agent messages to select them for debugging
- View detailed traces and logs in the debug panel
- Open workflow visualizations

### Sample Conversations
- Use "Quick Actions" to load sample conversations
- Browse "History" to access previous sessions
- Replay conversations to see the flow

### Analysis Panel
- Available when debug mode is enabled
- View conversation analysis and improvement suggestions
- Use "Do Later" to add items to your todo list
- Replay conversations with detailed insights

## 📁 Project Structure

```
src/
├── components/
│   ├── AnalysisPanel.jsx    # Analysis and improvement panel
│   ├── ChatInterface.jsx    # Main chat interface
│   ├── DebugPanel.jsx       # Debug information panel
│   ├── HistoryPanel.jsx     # Conversation history
│   ├── Message.jsx          # Individual message component
│   ├── Sidebar.jsx          # Left sidebar with controls
│   └── TopNavigation.jsx    # Top navigation bar
├── App.jsx                  # Main application component
├── index.css               # Global styles
└── main.jsx                # Application entry point
```

## 🎨 Customization

The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles using Tailwind classes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by yellow.ai's conversational AI platform
- Built with modern React and Tailwind CSS
- Icons provided by Lucide React