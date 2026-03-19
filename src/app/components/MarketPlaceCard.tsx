'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ShieldCheck } from 'lucide-react';

interface MarketplaceItemProps {
  title: string;
  author: string;
  priceHbar: number;
  description: string;
  onBuy: () => void;
}

export const MarketplaceCard = ({ title, author, priceHbar, description, onBuy }: MarketplaceItemProps) => {
  return (
    <Card className="w-full max-w-md border-2 border-primary/20 hover:border-primary/50 transition-all shadow-lg bg-linear-to-br from-white to-slate-50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Verified Note
          </Badge>
          <span className="text-xl font-bold text-primary">{priceHbar} HBAR</span>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <p className="text-xs text-muted-foreground">Uploaded by: {author}</p>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-slate-600 line-clamp-2">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button onClick={onBuy} className="w-full gap-2 bg-primary hover:bg-primary/90">
          <ShoppingCart className="w-4 h-4" />
          Buy with HashPack
        </Button>
        <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
          <ShieldCheck className="w-3 h-3" />
          Secured by Hedera Hashgraph
        </div>
      </CardFooter>
    </Card>
  );
};