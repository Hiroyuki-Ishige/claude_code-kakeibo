import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">3つの機能だけ。</span>
                <span className="block text-blue-600">続けられる家計簿</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                複雑な機能は一切なし。支出の記録、カテゴリ分類、ダッシュボードの3つだけ。
                <br />
                シンプルだから、毎日続けられます。
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="text-lg">
                    無料で始める
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-lg">
                    料金プランを見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">3つの機能</h2>
              <p className="mt-4 text-lg text-gray-600">
                必要最小限の機能だけを厳選しました
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>1. 支出記録</CardTitle>
                  <CardDescription>
                    金額、カテゴリ、日付を入力するだけ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    シンプルなフォームで素早く記録。メモも追加できます。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>2. カテゴリ分類</CardTitle>
                  <CardDescription>
                    9つの固定カテゴリで自動分類
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    食費、日用品、交通費など、よく使う9つのカテゴリを用意。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>3. ダッシュボード</CardTitle>
                  <CardDescription>
                    今週・今月の合計を一目で確認
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    プレミアムプランなら詳細な分析グラフも見られます。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                今すぐ始めましょう
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                無料プランで全ての基本機能が使えます
              </p>
              <div className="mt-8">
                <Link href="/sign-up">
                  <Button size="lg" variant="secondary" className="text-lg">
                    無料アカウントを作成
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
