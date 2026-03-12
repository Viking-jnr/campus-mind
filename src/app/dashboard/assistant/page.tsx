'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/CampusMind.png'
import Image from 'next/image';
import { Paperclip, Send, User, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Assistant = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {role: 'assistant', content: "Hello! I'm your Campus Assistant. How can I help you today?"}
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try{
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          agent: 'assistant'
        }),
      });

      const rawText = await response.text();
      console.log("Raw API Response: ", rawText);

      const data = await JSON.parse(rawText);
      if (data.text){
        setMessages((prev) => [...prev, {role: 'assistant', content: data.text }]);
      }
    }catch(error){
      console.error("Chat Error: ", error)
    }finally{
      setIsLoading(false);
    }

    const newMessages = [...messages, {role: 'user', content: input}]
    setMessages(newMessages)

  }
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' })
      }
    }
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    
    const isOutOfView = scrollHeight - scrollTop - clientHeight > 100
    setShowScrollButton(isOutOfView)
  }

  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom();
    }
  }, [messages])
  return (
    <div className={`dark relative flex flex-col h-[calc(100vh-(--spacing(16)))] max-w-4xl mx-auto w-full p-4 bg-black/10 rounded-lg`}>
      <ScrollArea ref={scrollRef} onScrollCapture={handleScroll} className='flex-1 pr-4 border rounded-lg max-h-[85%]'>
        <div className='space-y-4 p-6'>
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === 'user' ? "flex-row-reverse": "flex-row"} `}>
              <Avatar className='h-8 w-8'>
                {message.role === 'assistant' ? (
                  <AvatarFallback>
                    <Image src={Logo} alt="CampusMind Logo" className='bg-grey-200 h-8 w-8 rounded-full' />
                  </AvatarFallback>
                ): (
                  <AvatarFallback><User size={18} /> </AvatarFallback>
                ) }
              </Avatar>
              <div className={`max-w-[80%] rounded-lg p-3 text-sm shadow-sm whitespace-pre-wrap ${
                message.role === 'assistant' ? 'bg-gray-100 text-slate-800 rounded-tl-none' : 'bg-blue-500 text-white rounded-tr-none'
              }`}>
                {message.content}

              </div>
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="flex gap-3 animate-in fade-in duration-500">
            <Avatar className='h-8 w-8 shrink-0'>
              <AvatarFallback>
                <Image src={Logo} alt="CampusMind Logo" className='bg-grey-200 h-8 w-8 rounded-full' />
              </AvatarFallback>
            </Avatar>
            <div className="bg-secondary rounded-lg p-3 rounded-tl-none flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
            </div>
          </div>
        ) }
      </ScrollArea>
      {showScrollButton && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-24 right-10 rounded-full shadow-lg animate-in fade-in zoom-in duration-200 bg-white"
          onClick={scrollToBottom}
        >
          <ArrowDown size={18} className="text-white animate-bounce" />
        </Button>
      )}

      <div className='mt-4 flex items-center gap-2 bg-secondary rounded-xl p-4 shadow-sm pr-4'>
        <Button variant="ghost" size="icon" className='shrink-0'>
          <Paperclip size={20}/>
        </Button>
        <textarea
        rows={1}
        placeholder="Ask for notes, quizes, find study groups, or help..."
        className="flex-1 min-h-10 max-h-20 py-2 resize-none bg-transparent outline-none text-sm text-secondary-foreground"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          e.target.style.height = 'inherit';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
              setInput("");
            }
          }}
        
        />
        <Button onClick={handleSend} size="icon" className='shrink-0 hover:bg-blue-700'>
          <Send size={18}  />
        </Button>
      </div>
    </div>
  )
}

export default Assistant