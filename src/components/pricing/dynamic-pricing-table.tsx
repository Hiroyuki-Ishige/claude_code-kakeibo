'use client';

import dynamic from 'next/dynamic';

// Clerk の PricingTable を動的インポート
// パフォーマンス最適化のため SSR を無効化
const PricingTable = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.PricingTable),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg"></div>
      </div>
    ),
  }
);

export function DynamicPricingTable() {
  return <PricingTable />;
}
