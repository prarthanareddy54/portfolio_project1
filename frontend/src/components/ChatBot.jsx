import React, { useState, useRef, useEffect } from 'react';

const BOT_INTRO = {
  role: 'assistant',
  content: "👋 Hi! I'm Prarthana's AI assistant. Ask me about her projects, skills, tech stack, or how to get in touch!",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([BOT_INTRO]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `⚠️ ${data.error || 'Something went wrong. Please try again.'}` },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Could not reach the server. The backend may be waking up — please try again in a moment.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="chatbot-toggle-btn"
        className={`chatbot-fab ${open ? 'chatbot-fab--active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        title={open ? 'Close chat' : 'Ask Prarthana\'s AI'}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
          </svg>
        )}
        {!open && <span className="chatbot-fab__badge">AI</span>}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${open ? 'chatbot-window--open' : ''}`} aria-hidden={!open}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header__info">
            <div className="chatbot-header__avatar">P</div>
            <div>
              <div className="chatbot-header__name">Prarthana's AI</div>
              <div className="chatbot-header__status">
                <span className="chatbot-status-dot" />
                Portfolio Assistant
              </div>
            </div>
          </div>
          <button className="chatbot-header__close" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" id="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-bubble chatbot-bubble--${msg.role}`}>
              {msg.role === 'assistant' && <span className="chatbot-bubble__icon">✦</span>}
              <span className="chatbot-bubble__text">{msg.content}</span>
            </div>
          ))}
          {loading && (
            <div className="chatbot-bubble chatbot-bubble--assistant">
              <span className="chatbot-bubble__icon">✦</span>
              <span className="chatbot-typing">
                <span /><span /><span />
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Row */}
        <div className="chatbot-input-row">
          <textarea
            ref={inputRef}
            id="chatbot-input"
            className="chatbot-input"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about skills, projects…"
            disabled={loading}
            aria-label="Chat message input"
          />
          <button
            id="chatbot-send-btn"
            className="chatbot-send-btn"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <div className="chatbot-footer">Powered by Groq · Qwen 3.6-27B</div>
      </div>
    </>
  );
}
