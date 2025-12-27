'use client';

import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';

export default function PricingPage() {
  const { t } = useLanguage();

  const freePlanFeatures = [
    { text: '支出記録（無制限）', highlight: false },
    { text: '9種類のカテゴリ分け', highlight: false },
    { text: '週次・月次の合計金額表示', highlight: false },
    { text: '支出履歴の閲覧', highlight: false },
    { text: '支出の編集・削除', highlight: false },
  ];

  const premiumPlanFeatures = [
    { text: '無料プランの全機能', highlight: false },
    { text: '期間選択（日次・週次・月次）', highlight: true },
    { text: '過去データとの比較機能', highlight: true },
    { text: 'カテゴリ別グラフ（円・棒グラフ）', highlight: true },
    { text: '支出トレンドの可視化', highlight: true },
    { text: 'プレミアムUI・アニメーション', highlight: true },
    { text: '優先サポート', highlight: true },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                シンプルな料金プラン
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
                あなたに合ったプランを選んで、家計管理を始めましょう
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* 無料プラン */}
              <Card className="bg-white border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-8 border-b border-gray-200">
                  <CardTitle className="text-2xl font-bold text-gray-900">無料プラン</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    基本的な家計管理機能
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600 ml-2 text-lg">/ 月</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-4">含まれる機能</p>
                    <ul className="space-y-3">
                      {freePlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-gray-700">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/sign-up" className="block">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-2 border-gray-400 text-gray-900 hover:bg-gray-100 hover:border-gray-500 transition-all duration-300 text-lg py-6 rounded-xl"
                    >
                      無料で始める
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* プレミアムプラン */}
              <Card className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* バッジ */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span className="font-semibold text-sm">おすすめ</span>
                  </div>
                </div>

                <CardHeader className="p-8 border-b border-gray-300">
                  <CardTitle className="text-2xl font-bold text-gray-900">プレミアムプラン</CardTitle>
                  <CardDescription className="text-gray-700 mt-2">
                    高度な分析機能で詳細な家計管理
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">$10</span>
                    <span className="text-gray-600 ml-2 text-lg">/ 月</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-4">含まれる機能</p>
                    <ul className="space-y-3">
                      {premiumPlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-blue-600' : 'text-green-600'}`} aria-hidden="true" />
                          <span className={`${feature.highlight ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                            {feature.text}
                            {feature.highlight && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Premium</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/sign-up" className="block">
                    <Button
                      size="lg"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-6 rounded-xl"
                    >
                      プレミアムで始める
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">よくある質問</h2>
            </div>
            <div className="space-y-6">
              <Card className="border border-gray-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    プランはいつでも変更できますか？
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    はい、いつでもプランの変更が可能です。無料プランからプレミアムプランへのアップグレード、またはプレミアムプランから無料プランへのダウングレードが可能です。
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    支払い方法は何がありますか？
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    クレジットカード（Visa、Mastercard、American Express）での支払いが可能です。安全な決済システムを使用しています。
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    データは安全に保管されますか？
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    はい、すべてのデータは暗号化され、安全なクラウドサーバーに保存されます。あなたのプライバシーとセキュリティを最優先に考えています。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              今すぐ始めましょう
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              シンプルで続けられる家計管理を体験してください
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-6 rounded-xl transform hover:scale-105"
                >
                  無料で始める
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
