import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import React from 'react'

const UserChatBubble = ({ content }: { content: string }) => {
  return (
    <div className='flex gap-3 flex-row'>
      <div className="bg-blue-500 text-white rounded-lg p-3 rounded-tr-none">
        {content}
      </div>
      <Avatar className='h-8 w-8'>
        <AvatarFallback>
            <User size={18} />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserChatBubble