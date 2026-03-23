import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

export async function GET(req: Request){
    try{
        const { searchParams }  = new URL(req.url);
        const topic = searchParams.get("topic")?.toLowerCase();

        const notesRef = collection(db, "notes");
        const q = query(notesRef, where("topic", "==", topic), limit(5));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        return Response.json(results);
    }catch(err: any){
        console.error("Trouble finding note with requested topic", err);
        return Response.json({error: err.message}, {status: 500})
    }

}