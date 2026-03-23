// app/wallet/page.tsx
'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowUpRight, ArrowDownLeft, History, ExternalLink } from "lucide-react";

export default function WalletPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.00");

  // Mock data
  const transactions = [
    { id: 1, type: 'purchase', amount: -5, note: 'Data Structures Notes', date: 'Mar 20' },
    { id: 2, type: 'sale', amount: 12.5, note: 'Software Engineering L1', date: 'Mar 19' },
    { id: 3, type: 'purchase', amount: -3, note: 'Calculus II Notes', date: 'Mar 18' },
  ];

  return (
    <div className="container ml-20 py-10 px-3 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hedera Wallet</h1>
        {!isConnected ? (
          <Button onClick={() => setIsConnected(true)} className="gap-2 bg-black text-white">
            <Wallet className="w-4 h-4" /> Connect HashPack
          </Button>
        ) : (
          <Badge variant="outline" className="px-3 py-1 text-sm font-mono">
            {accountId || "0.0.4829103"}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Balance Card */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm font-medium">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{balance} <span className="text-2xl text-slate-400">HBAR</span></div>
            <p className="text-slate-400 text-sm">≈ ${(parseFloat(balance) * 0.08).toFixed(2)} USD</p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-sm">Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+45.0 HBAR</div>
            <p className="text-xs text-muted-foreground mt-1">Total from sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" /> Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${tx.type === 'sale' ? 'bg-emerald-100' : 'bg-orange-700'}`}>
                    {tx.type === 'sale' ? <ArrowDownLeft className="w-4 h-4 text-emerald-600" /> : <ArrowUpRight className="w-4 h-4 text-orange-600" />}
                  </div>
                  <div>
                    <div className="font-medium">{tx.note}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === 'sale' ? 'text-primary' : 'text-red-500'}`}>
                  {tx.type === 'sale' ? '+' : ''}{tx.amount} 
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}