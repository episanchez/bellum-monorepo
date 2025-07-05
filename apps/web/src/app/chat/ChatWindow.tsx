'use client'

import { useChat } from '../providers/ChatProvider';
import { useEffect, useRef } from 'react';

export default function ChatWindow() {
  const { messages } = useChat();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight });
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`max-w-prose rounded-lg px-3 py-2 whitespace-pre-wrap ${m.role === 'user' ? 'bg-primary text-white ml-auto' : 'bg-gray-200 text-gray-900 mr-auto'}`}
        >
          {m.content}
        </div>
      ))}
    </div>
  );
}

