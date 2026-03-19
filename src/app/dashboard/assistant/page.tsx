'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Logo from '../../assets/CampusMind.png'
import Image from 'next/image';
import { Paperclip, Send, User, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import ChatInput from './chatInput';
import { mockNotesData, mockQuizMessage } from '@/app/utils/MockData';
import QuizCard from '@/app/components/QuizCard';

const Assistant = () => {
  interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    mode: 'notes' | 'quiz' | 'group' | 'assignment' | 'assistant' | 'user';
    quizData?: any;
    fileData?:any;
    metadata?: any;
  }
  const scrollRef = useRef<HTMLDivElement>(null);
  let startMessage: Message = {
    id: Date.now(),
    role: 'assistant',
    content: "Hello! I'm your Campus Assistant. How can I help you today?",
    mode: 'assistant',
    quizData: null,
  }
  const [messages, setMessages] = useState([startMessage]);

  const [isLoading, setIsLoading] = useState(false);
  const [agentType, setAgentType] = useState('assistant');

  const handleSend = async (input: string, file: { name: string; type: string; data: string } | null) => {

    const userMessage:Message = { id: Date.now(), role: 'user', content: input, mode: 'user', quizData: null, fileData: file };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
   {/* 
    if (input.toLowerCase().includes("notes") || input.toLowerCase().includes("summary")) {
      setMessages((prev) => [...prev, mockNotesData]);
      setIsLoading(false);
      return;
    }else if (input.toLowerCase().includes("quiz") || input.toLowerCase().includes("question") || input.toLowerCase().includes("test") || input.toLowerCase().includes("questions")) {
      setMessages((prev) => [...prev, mockQuizMessage]);
      setIsLoading(false);
      return;
    }else if (input.toLowerCase().includes("group") || input.toLowerCase().includes("partner")) {
      setAgentType("group");
      return;
    }else if (input.toLowerCase().includes("assignment") || input.toLowerCase().includes("study")) {
      setAgentType("assignment");
    }*/}

    try{
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          agent: 'assistant',
        }),
      });

      const data = await response.json();
      const rawText = data.text;

      let messageMode: Message['mode'] = 'assistant';
      let quizData = null;
      let displayedContent = rawText;

      if (rawText.includes('[QUIZ_MODE]')) {
        try {
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch){
            const parsed = JSON.parse(jsonMatch[0]);

            if (parsed && parsed.questions && Array.isArray(parsed.questions)){
              const quizTitle = parsed.quizTitle || "Quiz";
              displayedContent = quizTitle;
              quizData = parsed.questions;
              messageMode = 'quiz';
            }
            
          }
        }catch(e){
          console.error("Failed to parse quiz JSON: ", e);
          displayedContent = "Sorry, I had trouble generating the quiz. Please try again.";
          messageMode = 'assistant';
        }
      }
      const assistantMessage: Message = {
        role: 'assistant',
        content: displayedContent,
        id: Date.now() + 1,
        mode: messageMode,
        quizData: quizData,

      }
      setMessages((prev) => [...prev, assistantMessage]);
    }catch(error){
      console.error("Chat Error: ", error)
    }finally{
      setIsLoading(false);
    }


  }
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    
    const isOutOfView = scrollHeight - scrollTop - clientHeight > 100
    setShowScrollButton(isOutOfView)
  }

  

  const TypeWriter = memo(({content}: {content: string}) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;
      const viewport = scrollContainer.querySelector('[data-radix-scroll-area-viewport]');
      if (!viewport) return;

      let i = 0;
      const timer = setInterval(() => {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth'
        });
        setDisplayedText(content.slice(0, i));
        i++;
        if (i > content.length){
          clearInterval(timer);
        }
        
      }, 5)
      return () => clearInterval(timer);
    }, [content]);
    
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {displayedText}
      </ReactMarkdown>
    )
  });

  const handleQuizCompletion = (score: number, total: number) => {
    const feedbackPrompt = `I completed the quiz with a score of ${score} out of ${total}. Can you give me a quick summary of what I should study more based on this? `;
    {/*handleSend(feedbackPrompt);*/}
  }

  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    if (savedMessages) {
      console.log("Loaded messages from localStorage: ", savedMessages);
      try {
        setMessages(JSON.parse(savedMessages));
      }catch(e){
        console.error("Failed to parse saved messages: ", e);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0){
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <div className={`relative flex flex-col h-[calc(100vh-(--spacing(16)))] max-w-4xl mx-auto w-full p-4 bg-black/10 rounded-lg`}>
      <ScrollArea ref={scrollRef} onScrollCapture={handleScroll} className='flex-1 pr-4 border rounded-lg max-h-[85%]'>
        <div className='space-y-4 p-6 w-full'>
          {messages.map((message, index) => (
            <div key={message.id} className={`flex gap-3 w-full ${message.role === 'user' ? "flex-row-reverse": "flex-row"} `}>
              <Avatar className='h-8 w-8'>
                {message.role === 'assistant' ? (
                  <AvatarFallback>
                    <Image src={Logo} alt="CampusMind Logo" className='bg-grey-200 h-8 w-8 rounded-full' />
                  </AvatarFallback>
                ): (
                  <AvatarFallback><User size={18} /> </AvatarFallback>
                ) }
              </Avatar>
              <div className={`animate-message-fade  ${message.role === 'assistant' ? 'w-[90%]' : 'max-w-[90%]'} rounded-lg p-3 text-sm shadow-sm whitespace-pre-wrap ${
                message.role === 'assistant' ? 'bg-background text-foreground rounded-tl-none prose prose-sm dark:prose-invert' : 'bg-blue-500 text-white rounded-tr-none'
              }`}>
                {message.role === "user" ? (
                message.content
              ) : (
                index === messages.length - 1 ? (
                  <div className='flex gap-4 flex-col w-full'>
                    <TypeWriter content={message.content} />
                      { message.mode === 'quiz' && message.quizData && (
                    <QuizCard questions={message.quizData} onComplete={handleQuizCompletion} />
                    )}
                  </div>
                  
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                )
              )}
                

              </div>
              
                
            </div>
          ))}
        </div>
        <div id='scroll-anchor' className='w-full h-px' />
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

      <div> 
       <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}

export default Assistant