import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chat } from './Chat';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Chat with AI
      </Button>

      <Chat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}