"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

/**
 * プレミアムプランへのアップグレードを促すバナーコンポーネント
 *
 * プレミアムプランに加入していないユーザーにのみ表示される
 */
export function UpgradeBanner() {
  const { has, isLoaded } = useAuth();

  // 認証情報が読み込まれるまで何も表示しない
  if (!isLoaded) {
    return null;
  }

  // has関数が利用できない場合は何も表示しない
  if (!has) {
    return null;
  }

  // プレミアムプランに加入している場合は何も表示しない
  if (has({ plan: 'premium' })) {
    return null;
  }

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 shadow-lg">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              プレミアムプランで詳細な分析を
            </h3>
            <p className="text-sm text-blue-100">
              カテゴリ別グラフ、期間比較など高度な機能が使えます
            </p>
          </div>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
        >
          <Link href="/pricing">
            プレミアムへアップグレード
          </Link>
        </Button>
      </div>
    </div>
  );
}
