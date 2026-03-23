import { db } from "@/lib/firebase";
import { HederaClient } from "@/lib/hederaClient";
import { AccountId, Hbar, TransferTransaction } from "@hashgraph/sdk";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
    try{
    const { to: recipientId, amount, memo, noteId, buyerId } = await req.json();
    const receiverId = AccountId.fromString(process.env.AGENT_VAULT_ID!);

    const transaction = await new TransferTransaction()
        ._addHbarTransfer(process.env.HEDERA_ACCOUNT_ID!, new Hbar(-amount), true)
        ._addHbarTransfer(receiverId, new Hbar(amount), true)
        .setTransactionMemo(memo || "Payment from Campus Mind")
        .execute(HederaClient);

    const receipt = await transaction.getReceipt(HederaClient);
    const transferId = transaction.transactionId.toString();
    const hashScan = `https://hashscan.io/testnet/transaction/${transferId}`;

    if (receipt.status.toString() === "SUCCESS"){
        const noteRef = doc(db, "notes", noteId);
        await updateDoc(noteRef, {
            authorizedUserd: arrayUnion(buyerId)
        });
    }

    return Response.json({ status: receipt.status.toString(), txId:transferId, hashScan:hashScan, unlocked: true });
    }catch(err: any){
        console.error("Error processing payment:", err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}