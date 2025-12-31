"use client";

import { Protect } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";

interface PlanProtectProps {
  children: React.ReactNode;
  requiredPlan?: string;
}

/**
 * プレミアム機能を保護するコンポーネント
 *
 * Clerkの`Protect`コンポーネントを使用してプラン別のアクセス制御を実装
 * プレミアムプランでない場合は、アップグレードを促すUIを表示
 */
export function PlanProtect({
  children,
  requiredPlan = 'premium'
}: PlanProtectProps) {
  return (
    <Protect
      plan={requiredPlan}
      fallback={
        <Card className="shadow-md border-2 border-gray-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <Lock className="h-5 w-5" />
              プレミアム機能
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              この機能はプレミアムプランでご利用いただけます。
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-blue-900 mb-2">
                プレミアムプランの特典
              </p>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• カテゴリ別の支出をグラフで表示</li>
                <li>• 週次・月次の詳細分析</li>
                <li>• 支出傾向の可視化</li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                月額 $10
              </p>
              <Button asChild size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-md">
                <Link href="/pricing">
                  プレミアムプランにアップグレード
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      }
    >
      {children}
    </Protect>
  );
}
