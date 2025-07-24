'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // Simulation d'une réponse automatique
      setTimeout(() => {
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.',
          sender: 'support',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, supportMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary position-fixed"
        style={{
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots'}`}></i>
      </button>

      {/* Widget de chat */}
      {isOpen && (
        <div
          className="position-fixed bg-white border rounded shadow-lg"
          style={{
            bottom: '5rem',
            right: '2rem',
            width: '350px',
            height: '500px',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div className="bg-primary text-white p-3 rounded-top">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                <i className="bi bi-headset me-2"></i>
                Support Client
              </h6>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-outline-light"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-grow-1 p-3 overflow-auto"
            style={{ maxHeight: '350px' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 ${
                  message.sender === 'user' ? 'text-end' : 'text-start'
                }`}
              >
                <div
                  className={`d-inline-block p-2 rounded ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-light text-dark'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  <div className="small">{message.text}</div>
                  <div
                    className={`small mt-1 ${
                      message.sender === 'user' ? 'text-white-50' : 'text-muted'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-top">
            <div className="input-group">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="form-control"
                placeholder="Tapez votre message..."
                rows={2}
                style={{ resize: 'none' }}
              />
              <button
                onClick={handleSendMessage}
                className="btn btn-primary"
                disabled={!newMessage.trim()}
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 