'use client';

import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChainlitBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    if (!isChatOpen) {
      setIsLoading(true);
    }
    setIsChatOpen(!isChatOpen);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isChatOpen && (
        <div className="mb-4 w-[350px] h-[500px] shadow-2xl animate-in slide-in-from-bottom-5 duration-300 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b1f] to-[#1b1b3a] rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-fuchsia-500 mb-3"></div>
                <p className="text-white text-sm font-medium">Loading AI Assistant...</p>
              </div>
            </div>
          )}
          <iframe
            src="https://muhammedsuhaib-giaiclinkedinposts.hf.space/"
            width="100%"
            height="100%"
            className="rounded-2xl border border-white/10 shadow-2xl"
            title="AI Assistant"
            onLoad={handleIframeLoad}
          />
        </div>
      )}
      <button
        onClick={toggleChat}
        title={isChatOpen ? 'Close Chat' : 'Open AI Assistant'}
        aria-label="Toggle Chat"
        className="bg-gradient-to-br from-fuchsia-500 via-violet-600 to-emerald-400 hover:from-fuchsia-400 hover:via-violet-500 hover:to-emerald-300 text-white p-4 rounded-full shadow-lg shadow-[#d431dad8] hover:shadow-[#8df4f7] transition-all active:scale-95"
      >
        {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChainlitBot;