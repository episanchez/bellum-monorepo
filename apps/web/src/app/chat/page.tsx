import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatProvider } from '../providers/ChatProvider';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

export default function ChatPage() {
  const session = cookies().get('session');
  if (!session?.value) {
    redirect('/login');
  }

  return (
    <ChatProvider>
      <main className="flex flex-col h-screen">
        <ChatWindow />
        <ChatInput />
      </main>
    </ChatProvider>
  );
}

