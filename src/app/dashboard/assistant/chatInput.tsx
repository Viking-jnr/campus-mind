'use client'
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { useRef, useState } from 'react'

const ChatInput = ({onSend}: {onSend: (message: string, file: { name: string; type: string; data: string } | null) => void}) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<{
        name: string;
        type: string;
        data: string;
    } | null >(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    const removeFile = () => setFile(null);

    const handleClick = () => {
        fileRef.current?.click();
    };
    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try{
        //Convert file to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result?.toString().split(',')[1];
            setFile({
                name: file.name,
                type: file.type,
                data: base64Data || ''
            });

        };
        reader.readAsDataURL(file);
    }catch(error){
        console.error("File reading error: ", error);
    }
    }
  return (
    <div className='flex flex-col'>
        {file && (
                <div className='flex items-center gap-3 p-2 mb-2'>
                    <div className="bg-background p-1.5 rounded text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="flex flex-col pr-2">
                        <span className="text-xs font-medium  max-w-37.5">
                            {file.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase">
                            {file.type.split('/')[1]}
                        </span>
                    </div>
                    <button onClick={removeFile} className='rounded-full hover:bg-destructive'>
                        <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        <div className='mt-4 flex flex-row items-center gap-2 bg-secondary rounded-xl p-4 shadow-sm pr-4'>
            <Button onClick={handleClick} variant="default" size="icon" className='shrink-0 hover:bg-blue-700'>
                <Paperclip size={20} />
                <input ref={fileRef} type='file' className='hidden' onChange={handleFileChange} />
            </Button>
            
            <textarea 
                value={text}
                rows={1}
                placeholder="Ask for notes, quizes, find study groups, or help..."
                className="flex-1 min-h-10 max-h-20 py-2 w-full resize-none bg-transparent outline-none text-sm text-secondary-foreground"
                onChange={(e) => {
                    setText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (text.trim()) {
                            onSend(text, file);
                            setText("");
                            setFile(null);
                            e.currentTarget.style.height = 'auto';
                        }
                    }
                }}
            />
            <Button onClick={() => {text.trim() ? (onSend(text, file), setText(''), setFile(null)): null}} size="icon" className='shrink-0 hover:bg-blue-700'>
            <Send size={18}  />
            </Button>
        </div>
    </div>
  )
}

export default ChatInput