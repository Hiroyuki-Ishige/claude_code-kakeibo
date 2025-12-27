# CLAUDE.md
 
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
 
## プロジェクト概要
 
**Money Tracker** - シンプルで継続できる家計簿アプリ
 
「3つの機能だけ。続けられる家計簿」をコンセプトに、支出記録、カテゴリ分け、ダッシュボード表示の必要最小限の機能で構成されています。
 
## 開発ロードマップと進捗管理
 
開発は`.claude/development_roadmap.md`のチェックリストに従って進めます。
 
### タスク管理方法
- 各フェーズの実装内容はチェックリスト形式で記載
- 完了したタスクは`[ ]`を`[x]`に変更して記録
- フェーズ1から順番に実装を進める
 
```markdown
# 実装前
- [ ] パッケージインストール（Supabase, Clerk, shadcn/ui）
 
# 実装後
- [x] パッケージインストール（Supabase, Clerk, shadcn/ui）
```
 
## 開発コマンド
 
```bash
npm run dev         # 開発サーバー起動（Turbopack使用）
npm run build       # プロダクションビルド
npm start           # プロダクションサーバー起動
npm run lint        # ESLint実行
npm run type-check  # TypeScript型チェック
npm install         # パッケージインストール
```
 
## 環境設定
 
### 必要な環境変数（.env.local）
 
以下は設定済みとする。
 
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
 
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
 
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
 
# Billing Portal URL
NEXT_PUBLIC_BILLING_URL=https://accounts.your-domain.com/user
```
 
## プロジェクト構造
 
```
my-app/
├── src/
│   ├── app/                    # App Router
│   │   ├── (auth)/            # 認証関連ページ
│   │   ├── (dashboard)/       # ダッシュボード（認証必須）
│   │   ├── api/               # API Routes
│   │   └── layout.tsx         # ルートレイアウト
│   ├── components/            # 共通コンポーネント
│   ├── lib/                   # ユーティリティ、設定
│   └── types/                 # TypeScript型定義
├── .claude/                   # プロジェクトドキュメント
│   ├── requirements.md        # 要件定義書
│   ├── development_roadmap.md # 開発ロードマップ（進捗管理）
│   ├── design_system.md       # デザインシステム
│   ├── supabase_document.md   # Supabase実装ガイド
│   ├── clerk_document.md      # Clerk実装ガイド
│   └── clerk_supabase_integration_document.md
└── public/                    # 静的ファイル
```
 
## アーキテクチャ
 
### 技術スタック
- **フレームワーク**: Next.js 15 系 (App Router)
- **言語**: TypeScript（strictモード）
- **スタイリング**: Tailwind CSS v4 + shadcn/ui
- **認証**: Clerk（メール認証、課金管理）
- **データベース**: Supabase（PostgreSQL）
- **ホスティング**: Vercel
 
### 主要な実装方針
- **Supabase**: クラウド版を使用（Dockerは使用しない）
- **認証連携**: API Routes経由でSupabaseにアクセス（Service Roleキー使用）
- **課金**: Clerk Billingでプラン管理（スラグ: "premium"）
- **テスト**: MVP目的のためテストは書かない
- **品質管理**: タスク完了前に必ずlintと型チェックを実行
 
## 重要なドキュメント
 
### 要件定義
`.claude/requirements.md` - プロジェクトの詳細な要件定義
 
### 開発ロードマップ
`.claude/development_roadmap.md` - 5つのフェーズで構成される開発計画と進捗管理
 
### デザインシステム
`.claude/design_system.md` - UIコンポーネントのデザインガイドライン
 
### 実装ガイド
- `.claude/supabase_document.md` - Supabase実装方法（方法1を採用）
- `.claude/clerk_document.md` - Clerk認証・課金の実装
- `.claude/clerk_supabase_integration_document.md` - 認証連携の実装
 
## コーディング規約
 
### TypeScript
- パスエイリアス: `@/*` → `src/*`
- 型定義は`src/types/`に集約
- strictモードを維持
 
### コンポーネント
- 関数コンポーネントで統一
- shadcn/uiコンポーネントを優先使用
- デザインシステムに従ったスタイリング
 
### git管理
- 各フェーズ完了時にコミット
- 意味のある単位でコミットメッセージを記述
 
## 開発時の注意事項
 
- Clerk Billingのプランスラグは必ず「premium」に設定
- user_idフィールドはTEXT型（ClerkのID形式に対応）
- 環境変数は`.env.local`に正しく記載されている前提で進め、必要に応じ example ファイルを作成
  - `.env.local` を Claude Code が読み込むことは絶対に避ける
- デザインシステム（`.claude/design_system.md`）を厳守
 
## 開発の流れ

1. これから行うタスクを理解する
2. タスクに関する `.claude` 内のドキュメントの内容を理解する
3. 設計を行う
4. 実装を進める
5. **タスク完了前に必ず型チェックを実行** (`npm run type-check`)
6. 実装完了後、結果に関してユーザーに動作確認方法を伝える

### 品質チェック

タスク完了前に以下を必ず実行してください：

```bash
npm run type-check  # TypeScript型チェック
npm run lint        # ESLint
npm run build       # プロダクションビルド確認
```

## 実装ナレッジ・知見

### コンポーネント設計のベストプラクティス

#### 小さく再利用可能なコンポーネントに分割
- 単一責任の原則に従い、各コンポーネントは1つの役割だけを持つ
- 例: 支出一覧機能を以下のように分割
  - `ExpenseList` - 一覧表示とデータ取得
  - `ExpenseItem` - 個別アイテムの表示
  - `EditExpenseDialog` - 編集機能
  - `DeleteConfirmDialog` - 削除確認

#### コンポーネント間の状態管理
- **refreshTriggerパターン**: 親から子のデータ再取得をトリガー
  ```tsx
  // 親コンポーネント
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleSuccess = () => setRefreshTrigger(prev => prev + 1);

  // 子コンポーネント
  <ExpenseList refreshTrigger={refreshTrigger} />
  ```
- `useCallback`でメモ化して不要な再レンダリングを防止

### オプティミスティックUI

ユーザー体験向上のため、API呼び出し前にUIを更新：

```tsx
// 削除時に即座にUIから削除
const handleDelete = useCallback((id: string) => {
  setExpenses(prev => prev.filter(expense => expense.id !== id));
}, []);
```

メリット:
- 即座のフィードバックでUX向上
- ローディング時間を感じさせない
- 失敗時はエラーメッセージで通知

### 型安全性の確保

#### 型のエクスポート・インポート
- `constants.ts`で定義した型を`types.ts`で再エクスポート
  ```tsx
  // constants.ts
  export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

  // types.ts
  import { ExpenseCategory } from './constants';
  export type { ExpenseCategory };
  ```
- 型の一貫性を保つため、単一の情報源から型を取得

#### 型推論の活用
- `as const`アサーションで厳密な型を生成
- Record型でマッピングの型安全性を確保
  ```tsx
  const CATEGORY_ICON_MAP: Record<ExpenseCategory, LucideIcon> = { ... };
  ```

### エラーハンドリング

すべての状態を適切に処理：

1. **ローディング状態**: Spinnerコンポーネントで表示
2. **エラー状態**: エラーメッセージと再試行ボタン
3. **空状態**: 分かりやすいプレースホルダー
4. **成功状態**: toastで通知

```tsx
if (isLoading) return <Spinner />;
if (error) return <ErrorDisplay error={error} onRetry={fetchData} />;
if (data.length === 0) return <EmptyState />;
return <DataList data={data} />;
```

### shadcn/uiの使用

#### コンポーネントのインストール
```bash
npx shadcn@latest add dialog
npx shadcn@latest add alert-dialog
```

#### dialogとalert-dialogの使い分け
- **Dialog**: 編集フォームなど複雑なコンテンツ
- **AlertDialog**: 削除確認など単純な確認ダイアログ

### デザインシステムの適用

`design_system.md`に従って一貫したスタイリングを適用：

#### カードコンポーネント
```tsx
className="bg-white border border-gray-300 rounded-2xl p-5 shadow-md
           hover:shadow-lg hover:border-gray-400 transition-all duration-200"
```

#### ボタンの種類
- プライマリ: `bg-blue-600 text-white hover:bg-blue-700 shadow-md`
- 危険: `bg-red-600 text-white hover:bg-red-700 shadow-md`
- アウトライン: `variant="outline"`

#### アクセシビリティ
- `aria-label`でスクリーンリーダー対応
- `aria-invalid`でフォームエラー通知
- `role="alert"`でエラーメッセージ通知

### 日付フォーマット

date-fnsを使用した日本語日付表示：

```tsx
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

format(new Date(date), 'yyyy年M月d日(E)', { locale: ja })
// 出力例: 2024年12月27日(金)
```

### APIとの連携

#### フォームからAPI呼び出し
1. react-hook-formでフォーム管理
2. zodでバリデーション
3. fetch APIでリクエスト
4. エラーハンドリングとトースト通知

```tsx
const onSubmit = async (data) => {
  try {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    toast.success('保存しました');
    onSuccess?.();
  } catch (error) {
    toast.error(error.message);
  }
};
```

### パフォーマンス最適化

- `useCallback`でコールバック関数をメモ化
- `useMemo`で計算結果をメモ化（必要な場合のみ）
- 不要な再レンダリングを防ぐためのkeyプロパティ設定

### 期間選択機能の実装パターン

#### オフセットベースの期間計算
週や月の期間を柔軟に扱うため、オフセット（offset）パラメータを使用：

```tsx
// date-utils.ts
export function filterWeekExpenses(expenses: Expense[], offset: number = 0): Expense[] {
  const now = addWeeks(new Date(), offset);  // オフセット分だけ週をずらす
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  return expenses.filter((expense) => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: weekStart, end: weekEnd });
  });
}

export function formatWeekPeriod(offset: number = 0): string {
  const now = addWeeks(new Date(), offset);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  return `${format(weekStart, 'M/d', { locale: ja })} - ${format(weekEnd, 'M/d', { locale: ja })}`;
}
```

メリット:
- offset = 0: 今週/今月
- offset = -1: 先週/先月
- offset = 1: 来週/来月
- 統一的なAPIで期間を扱える

#### useMemoを使った派生状態の管理

状態とオフセットから計算される値は`useMemo`でメモ化：

```tsx
const [expenses, setExpenses] = useState<Expense[]>([]);
const [weekOffset, setWeekOffset] = useState(0);

// expensesまたはweekOffsetが変わったときのみ再計算
const weekTotal = useMemo(
  () => calculateWeekTotal(expenses, weekOffset),
  [expenses, weekOffset]
);
```

注意点:
- `useState`で`weekTotal`を管理すると、offsetが変わったときに手動で更新が必要
- `useMemo`を使えば依存配列の変更時に自動的に再計算される
- 不要な再計算を防ぎパフォーマンスが向上

### UIコンポーネントの配置とレイアウト

#### lucide-reactアイコンの選択

用途に応じて適切なアイコンを選択：

| アイコン | 用途 | 特徴 |
|---------|------|------|
| `ChevronLeft/Right` | ページネーション | シンプルで洗練された山括弧 |
| `ArrowLeft/Right` | 期間移動、戻る/進む | 太くて視認性が高い |
| `ChevronsLeft/Right` | 大きな移動 | 二重山括弧で動きを強調 |
| `MoveLeft/Right` | 項目の移動 | 移動操作を明示 |

今回の期間選択では`ArrowLeft/Right`を採用：
- 太くてクリックしやすい
- 「前の週/次の週」への移動を直感的に表現

#### Flexboxを使った要素の並び順制御

要素の順序を柔軟に変更できるFlexboxレイアウト：

```tsx
// パターン1: タイトル、ボタンを両端配置
<div className="flex items-center justify-between">
  <div>タイトル</div>
  <div>ボタン</div>
</div>

// パターン2: すべて横一列に配置
<div className="flex items-center gap-2">
  <Calendar />
  <ArrowLeft />
  <CardTitle>今週の支出</CardTitle>
  <ArrowRight />
</div>
```

ポイント:
- `gap-2`で要素間のスペーシングを統一
- `items-center`で垂直方向の中央揃え
- JSXの順序を変えるだけでレイアウト変更可能

#### ボタンとアイコンのサイズ調整

Tailwind CSSのサイズクラスで柔軟にサイズ変更：

```tsx
<Button
  variant="ghost"
  size="icon"
  className="h-48 w-48"  // ボタンサイズ: 192px × 192px
>
  <ArrowLeft className="h-24 w-24" />  // アイコンサイズ: 96px × 96px
</Button>
```

サイズの目安:
- `h-8 w-8` (32px): 通常のアイコンボタン
- `h-12 w-12` (48px): やや大きめ
- `h-24 w-24` (96px): 大きめ
- `h-48 w-48` (192px): 非常に大きい（タッチデバイス向け）

### トラブルシューティング

#### 型エラー
- `ExpenseCategory`が見つからない → constants.tsとtypes.tsで正しくエクスポート・インポート
- インデックスアクセスで型エラー → Record型で型安全性を確保

#### ビルドエラー
- `npm run type-check`で型チェック
- `npm run build`でビルドエラーを確認
- エラーメッセージをよく読んで原因を特定

#### ホットリロードが効かない場合

コード変更が反映されない場合の対処法：

1. **開発サーバーの再起動**
   ```bash
   # Ctrl+C で停止
   npm run dev
   ```

2. **ブラウザのハードリフレッシュ**
   - Mac: `Cmd + Shift + R`
   - Windows/Linux: `Ctrl + Shift + R`

3. **Tailwind CSSの変更が反映されない場合**
   ```bash
   # .nextフォルダを削除して再ビルド
   rm -rf .next
   npm run dev
   ```

4. **それでも解決しない場合**
   ```bash
   # node_modulesとロックファイルを削除して再インストール
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

原因:
- Next.jsのTurbopackキャッシュが古い
- Tailwind CSSのクラス変更がキャッシュに反映されていない
- ファイルウォッチャーが正しく動作していない
