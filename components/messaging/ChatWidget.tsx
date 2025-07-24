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

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

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
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        className="btn btn-primary btn-lg position-fixed"
        style={{
          bottom: '2rem',
          right: '2rem',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots'}`}></i>
      </button>

      {/* Widget de chat */}
      {isOpen && (
        <div
          className="card position-fixed"
          style={{
            bottom: '5rem',
            right: '2rem',
            width: '350px',
            height: '500px',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <div className="card-header bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                <i className="bi bi-headset me-2"></i>
                Support Client
              </h6>
              <button
                className="btn btn-link text-white p-0"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          <div className="card-body p-0 d-flex flex-column" style={{ height: '400px' }}>
            {/* Messages */}
            <div className="flex-grow-1 p-3 overflow-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className={`p-2 rounded-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-light text-dark'
                    }`}
                    style={{ maxWidth: '80%' }}
                  >
                    <div className="small">{message.text}</div>
                    <div className="small opacity-75 mt-1">
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

            {/* Formulaire d'envoi */}
            <div className="p-3 border-top">
              <form onSubmit={handleSendMessage}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 