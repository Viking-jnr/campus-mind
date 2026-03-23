import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { auth } from '@/lib/firebase'
import { UploadNote } from '@/lib/firebaseActions'
import { Loader2, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'

const UploadNoteModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const file = formData.get('noteFile') as File;
        
        //Convert file to Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Data = reader.result?.toString().split(',')[1];

            try{
                await UploadNote(base64Data!, file.name, {
                    title: formData.get('title') as string,
                    topic: formData.get('topic') as string,
                    priceHbar: parseFloat(formData.get('priceHbar') as string),
                    author: auth.currentUser?.displayName || 'Unknown',
                    description: formData.get('description') as string,
                });
                setOpen(false);
                alert("Note uploaded successfully!");
            }catch(error){
                console.error("Upload error: ", error);
                alert("Failed to upload note. Please try again.");
                }finally{
                    setIsLoading(false);
                }
            }
    }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='flex flex-row'>
            <Button variant='ghost'>
                <PlusCircle className='w-4 h-4 mr-2' />
                Add Note to MarketPlace
            </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-150'>
            <DialogHeader>
                <DialogTitle>MarketPlace Lisiting</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                    <label htmlFor='title'>Note Title</label>
                    <Input id='title' name='title' type='text' placeholder='e.g. Calculus Unit I' required/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor='topic'>Topic (for AI search)</label>
                    <Input id='topic' name='topic' type='text' placeholder='e.g. Calculus, Derivatives, Integrals' required />
                </div>
                <div className='grid gap-2'>
                    <label htmlFor='priceHbar'>Price (HBAR)</label>
                    <Input id='priceHbar' name='priceHbar' type='number' step='0.1' placeholder='5.0' required/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor='noteFile'>Upload PDF</label>
                    <Input id='noteFile' name='noteFile' type='file' accept='.pdf'  required />
                </div>
                <div className='grid gap-2'>
                    <label htmlFor='description'>Description (optional)</label>
                    <textarea id='description' name='description' rows={3} placeholder='Brief description of the note' className='p-2 border-solid border-2 rounded-lg focus:border-grey-100' />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Upload Note"}
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default UploadNoteModal