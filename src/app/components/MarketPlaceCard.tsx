'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface MarketplaceItem {
  id: number;
  title: string;
  author: string;
  priceHbar: number;
  description: string;
  fileURL: string;
}

interface MarketplaceItemProps {
  marketPlaceData: MarketplaceItem;
  onBuy: () => void;
}

export const MarketplaceCard: React.FC<MarketplaceItemProps> = ({ marketPlaceData, onBuy }) => {
const [showMore, setShowMore] = useState(false);
const toggleShowMore = () => setShowMore((prev) => !prev);
  return (
    <Card className="w-full max-w-md border-2 border-primary/20 hover:border-primary/50 transition-all shadow-lg bg-linear-to-br from-white to-slate-200">
      <CardHeader className="pb-1">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Verified Note
          </Badge>
          <span className="text-lg font-bold text-green-700">{marketPlaceData.priceHbar} HBAR</span>
          
        </div>
        <CardTitle className="text-lg text-black mt-2">{marketPlaceData.title}</CardTitle>
        <p className="text-xs text-muted-foreground">Uploaded by: {marketPlaceData.author}</p>
      </CardHeader>
      
      <CardContent>
        <p className={`text-sm text-slate-600 ${showMore ? '' : 'line-clamp-2'}`}>
          {marketPlaceData.description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button onClick={onBuy} className="cursor: ponter w-full gap-2 bg-primary hover:bg-primary/60">
          <ShoppingCart className="w-4 h-4" />
          Buy with HashPack
        </Button>
        <div className="flex items-center justify-center gap-1 text-[10px] text-grey-500">
          <ShieldCheck className="w-3 h-3" />
          Secured by Hedera Hashgraph
        </div>
      </CardFooter>
    </Card>
  );
};