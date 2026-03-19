import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Logo from '../../assets/CampusMind.png'
import Image from 'next/image'

const AssistantChatBubble = () => {
  return (
    <div className='flex flex-row bg-background'>
        <Avatar className='h-8 w-8'>
            <AvatarFallback>
                <Image src={Logo} alt="CampusMind Logo" className='bg-grey-200 h-8 w-8 rounded-full' />
            </AvatarFallback>
        </Avatar>
    </div>
  )
}

export default AssistantChatBubble