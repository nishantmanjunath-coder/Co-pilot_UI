# Conversational Agent Platform - Streamlit Version

A conversational AI agent platform built with Streamlit, featuring debug mode, message analysis, and workflow visualization.

## Features

- 🤖 **Conversational Interface**: Chat with an AI agent
- 🔍 **Debug Mode**: View processing logs and metrics for each message
- 📊 **Analysis Panel**: Analyze, solve, and improve conversations
- 📈 **Message Metrics**: Cost, token usage, and latency tracking
- 🎯 **Workflow Visualization**: Interactive flowchart of conversation flow
- 📝 **Do Later**: Save items for later review
- 🎨 **Responsive Design**: Clean, modern interface

## Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Application**
   ```bash
   streamlit run streamlit_app.py
   ```

3. **Open in Browser**
   - The app will automatically open at `http://localhost:8501`
   - If not, manually navigate to the URL shown in the terminal

### Streamlit Cloud Deployment

1. **Fork this Repository**
   - Go to the repository on GitHub
   - Click "Fork" to create your own copy

2. **Deploy to Streamlit Cloud**
   - Go to [share.streamlit.io](https://share.streamlit.io)
   - Sign in with your GitHub account
   - Click "New app"
   - Select your forked repository
   - Set the main file path to `streamlit_app.py`
   - Click "Deploy"

3. **Your App is Live!**
   - Streamlit will provide you with a public URL
   - Share the URL with others to access your app

## Usage

### Basic Chat
1. Use the sidebar quick actions to load sample conversations
2. Type messages in the input field
3. Click "Send" to chat with the agent

### Debug Mode
1. Toggle "Debug Mode" in the sidebar
2. View processing logs above each assistant message
3. See metrics (cost, tokens, latency) below messages
4. Click "Select Message" to view detailed debug information

### Analysis Panel
1. Use the "Analyze", "Solve", and "Improve" tabs
2. Click "Do Later" to save items for later review
3. Click "Replay" to regenerate conversations

### Workflow Visualization
1. Enable Debug Mode
2. Click "Open Flowchart" in the sidebar
3. View the conversational workflow diagram

## File Structure

```
├── streamlit_app.py      # Main Streamlit application
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## Customization

### Adding New Conversations
Edit the `sample_conversations` dictionary in `streamlit_app.py` to add new sample conversations.

### Modifying Styling
Update the CSS in the `st.markdown()` section at the top of `streamlit_app.py`.

### Adding Features
The app is modular - you can easily add new features by:
1. Adding new session state variables
2. Creating new UI components
3. Implementing new functionality

## Troubleshooting

### Common Issues

1. **App won't start**
   - Ensure you have Python 3.7+ installed
   - Check that all dependencies are installed: `pip install -r requirements.txt`

2. **Styling issues**
   - Clear browser cache
   - Check browser console for errors

3. **Performance issues**
   - Reduce the number of messages in session state
   - Optimize the CSS and HTML rendering

### Getting Help

- Check the [Streamlit documentation](https://docs.streamlit.io)
- Visit the [Streamlit community forum](https://discuss.streamlit.io)
- Open an issue in this repository

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.