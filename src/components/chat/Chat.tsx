import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Chat({ isOpen, onClose }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 w-[400px] h-[600px] bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl shadow-xl flex flex-col overflow-hidden z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-green-500" />
              <span className="font-medium">Privacy Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === 'assistant' ? 'text-gray-300' : 'text-white'
                }`}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-6 h-6 text-green-500 mt-1" />
                ) : (
                  <User className="w-6 h-6 text-blue-500 mt-1" />
                )}
                <div className="flex-1 prose prose-invert prose-sm">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-800 flex items-end gap-2"
          >
            <TextareaAutosize
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about privacy, security, or app features..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 resize-none max-h-32 min-h-[38px]"
              maxRows={5}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-green-500 hover:bg-green-600"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}