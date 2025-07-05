'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { z } from 'zod';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

interface ChatContextValue {
  messages: ChatMessage[];
  loading: boolean;
  sendMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

const messageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  createdAt: z.string()
});
const messagesSchema = z.array(messageSchema);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const eventRef = useRef<EventSource | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = () => {
    if (eventRef.current) {
      eventRef.current.close();
      eventRef.current = null;
    }
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/chat');
        const data = await res.json();
        const parsed = messagesSchema.parse(data);
        setMessages(parsed);
      } catch (err) {
        console.error('Failed to load chat messages', err);
      }
    })();
    return cleanup;
  }, []);

  const startPolling = () => {
    const start = Date.now();
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/chat');
        const data = await res.json();
        const parsed = messagesSchema.parse(data);
        setMessages(parsed);
        const last = parsed[parsed.length - 1];
        if (last && last.role === 'assistant') {
          setLoading(false);
          cleanup();
        }
      } catch (err) {
        console.error('Polling error', err);
      }
      if (Date.now() - start > 60000) {
        setLoading(false);
        cleanup();
      }
    }, 2000);
  };

  const sendMessage = async (text: string) => {
    cleanup();
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString()
    };
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setLoading(true);
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
    } catch (err) {
      console.error('Failed to send message', err);
    }

    const updateAssistant = (content: string) =>
      setMessages(prev =>
        prev.map(m => (m.id === assistantMsg.id ? { ...m, content } : m))
      );

    if (typeof window !== 'undefined' && 'EventSource' in window) {
      try {
        const es = new EventSource('/api/chat/stream');
        eventRef.current = es;
        es.onmessage = ev => {
          if (ev.data === '[DONE]') {
            setLoading(false);
            cleanup();
          } else {
            assistantMsg.content += ev.data;
            updateAssistant(assistantMsg.content);
          }
        };
        es.onerror = () => {
          cleanup();
          startPolling();
        };
      } catch {
        startPolling();
      }
    } else {
      startPolling();
    }
  };

  const value: ChatContextValue = { messages, loading, sendMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}

