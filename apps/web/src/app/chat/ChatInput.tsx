'use client'

import { useState } from 'react';
import { Button } from '@ui/Button';
import { useChat } from '../providers/ChatProvider';

export default function ChatInput() {
  const { sendMessage, loading } = useChat();
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(text.trim());
    setText('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="border-t p-4 flex gap-2">
      <textarea
        className="flex-1 resize-none rounded-md border px-3 py-2 text-sm"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={loading}
      />
      <Button type="button" onClick={handleSend} disabled={loading || !text.trim()}>
        Send
      </Button>
    </div>
  );
}

