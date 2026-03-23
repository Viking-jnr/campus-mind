'use client'
import { MarketplaceCard } from '@/app/components/MarketPlaceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react'

const page = () => {
    const [allNotes, setAllNotes] = useState<any[]>([]);
    const [myNotes, setMyNotes] = useState<any[]>([]);
    const [purchasedNotes, setPurchasedNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser?.displayName || "Unknown";
    console.log("Current User Name: ", currentUser);

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const querySnapshot = await getDocs(collection(db, 'notes'));
                const notesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllNotes(notesData);

                const myNotesQuery = query(collection(db, 'notes'), where("author", "==", currentUser));
                const myNotesData = (await getDocs(myNotesQuery)).docs.map(doc => ({id: doc.id, ...doc.data()}));
                setMyNotes(myNotesData);

            } catch (error) {
                console.error("Error fetching notes:", error);
            } finally {
                setLoading(false);

            }
        }
        fetchNotes();
    }, [currentUser]);

    if (loading) return <div className='flex h-screen items-center justify-center'><Loader2 className='animate-spin' /> </div>

  return (
    <div className='ml-10 py-10 px-4'>
        <h1 className='text-3xl font-bold mb-6'>Campus Mind MarketPlace</h1>

        <Tabs defaultValue='all' className=''>
            <TabsList className='grid w-full grid-cols-3 mb-8 max-w-100'>
                <TabsTrigger value='all'>All Notes</TabsTrigger>
                <TabsTrigger value='mine'>My Notes</TabsTrigger>
            </TabsList>
            <TabsContent value='all'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {allNotes.map((note) => (
                        <MarketplaceCard key={note.id} marketPlaceData={note} onBuy={() => console.log("Buying ",note.id)} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value='mine'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myNotes.length > 0 ? (
                myNotes.map((note) => (
                    <MarketplaceCard key={note.id} marketPlaceData={note} onBuy={() => {}} />
                        ))
                        ) : (
                        <p className="text-muted-foreground italic">You haven't uploaded any notes yet.</p>
                        )}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default page