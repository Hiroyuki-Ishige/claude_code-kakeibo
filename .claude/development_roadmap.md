# 家計簿アプリ 開発ロードマップ

## 概要

このドキュメントは、家計簿アプリ「Money Tracker」の開発を効率的に進めるための実装順序とタスクリストを定義します。
各フェーズで品質を作り込みながら、最小限の工程で完成させます。

## 開発フェーズ

### フェーズ 1: 基盤とコア機能 ✅ 完了

完成度の高い基盤と認証・データベースを一気に構築します。

**現在の状態**: 環境構築、認証システム、データベース設計が完了。フェーズ 1 完了！

#### 実装内容

- [x] **環境構築**

  - パッケージインストール（Supabase, Clerk, shadcn/ui, react-hook-form, zod, lucide-react, date-fns）
  - 環境変数設定（.env.local）
  - Supabase クラウドプロジェクト作成
  - Clerk ダッシュボード設定

- [x] **認証システム**

  - ClerkProvider 設定（layout.tsx）
  - middleware.ts（認証保護）
  - サインイン/サインアップページ（/sign-in, /sign-up）
  - エラーハンドリング実装

- [x] **データベース設計**

  - [x] Supabase プロジェクトの初期化（npx supabase init）
  - [x] expenses テーブルマイグレーションファイル作成（supabase/migrations/）
    - id (UUID), user_id (TEXT), amount (NUMERIC), category (TEXT)
    - date (DATE), note (TEXT), created_at, updated_at
    - インデックス作成（user_id, date, category）
    - updated_at 自動更新トリガー
    - RLS 有効化
  - [x] カテゴリ定数ファイル（lib/constants.ts）
    - 9 つの固定カテゴリ定義
    - カテゴリアイコンマッピング
    - カテゴリカラーマッピング
  - [x] 型定義ファイル（lib/types.ts）
    - Expense, CreateExpenseInput, UpdateExpenseInput
    - DashboardSummary, AnalyticsSummary
    - ApiResponse, PaginatedResponse
  - [x] Supabase クライアント実装（lib/supabase.ts）
    - クライアントサイド用クライアント（anon key）
    - サーバーサイド用 admin クライアント（service role key）
    - CRUD 操作ヘルパー関数（get/create/update/delete）
  - [x] **マイグレーション適用**
    - [x] Supabase クラウドプロジェクト作成（kakeibo-claude-dev）
    - [x] Supabase ログイン（npx supabase login）
    - [x] プロジェクトリンク（npx supabase link --project-ref rbzteiosowoywlvethas）
    - [x] マイグレーション適用（npx supabase db push）
    - [x] 型定義生成（lib/database.types.ts）

- [x] **共通コンポーネント**
  - レイアウト（Header, Footer）
  - UI コンポーネント（Button, Card, Input, Label, Select）
  - ランディングページ実装
  - ダッシュボードページ骨組み作成
  - [x] エラーバウンダリーコンポーネント
    - React Error Boundary 実装（components/error/error-boundary.tsx）
    - エラー表示 UI（components/error/error-display.tsx）
    - エラーリセット機能
  - [x] ローディング状態コンポーネント
    - スケルトンローダー（components/ui/skeleton.tsx）
    - スピナーコンポーネント（components/ui/spinner.tsx）
    - ページローディング表示（components/ui/page-loading.tsx）

### フェーズ 2: 支出管理機能 🚧 進行中

品質を作り込んだ支出記録・管理機能を実装します。

#### 実装内容

- [x] **支出記録フォーム**

  - [x] 金額入力（バリデーション付き）
  - [x] カテゴリ選択（9 種類固定）
  - [x] 日付選択（デフォルト今日）
  - [x] フォームバリデーション（zod）
  - [x] 成功/エラートースト（sonner）
  - [x] リアルタイムフィードバック
  - [x] 日本語・英語対応

- [x] **API Routes**

  - [x] POST /api/expenses（作成）
  - [x] GET /api/expenses（一覧取得）
  - [x] PUT /api/expenses/[id]（更新）
  - [x] DELETE /api/expenses/[id]（削除）
  - [x] エラーハンドリング
  - [x] Clerk 認証チェック
  - [x] ユーザーレコード自動作成

- [x] **支出一覧・管理**
  - [x] 支出履歴表示（日付降順）
  - [x] 編集・削除機能
  - [x] 確認ダイアログ
  - [x] オプティミスティック UI
  - [x] 空状態の表示

### フェーズ 3: ダッシュボードと基本 UI（推定: 2 日）

使いやすいダッシュボードと洗練された UI を実装します。

#### 実装内容

- [x] **ダッシュボードページ（/dashboard）**

  - [x] 支出記録フォーム配置
  - [x] 今週・今月の合計表示
  - [x] 最近の支出履歴
  - [x] レスポンシブデザイン
  - [x] スケルトンローディング

- [ ] **公開ページ**
  - トップページ（機能説明、CTA）
  - 料金ページ（プラン比較表）
  - デザインシステム適用
  - アニメーション実装

### フェーズ 4: プレミアム機能（推定: 2-3 日）

Clerk Billing とグラフ機能を実装します。

#### 実装内容

- [ ] **Clerk Billing 設定**

  - Clerk ダッシュボードでプラン作成（スラグ: premium）
  - Stripe 連携
  - 料金ページに PricingTable 実装
  - has()関数での権限チェック

- [ ] **プレミアム分析機能**

  - Recharts セットアップ
  - 円グラフ（カテゴリ別割合）
  - 棒グラフ（カテゴリ別金額）
  - 期間切り替え（日次/週次/月次）
  - 前期間比較
  - Protect コンポーネントで保護

- [ ] **プレミアム UI**
  - グラデーション背景
  - スムーズなアニメーション
  - 高級感のあるデザイン

### フェーズ 5: デプロイ（推定: 1 日）

本番環境にデプロイします。

#### 実装内容

- [ ] **本番デプロイ**
  - Vercel プロジェクト作成
  - 環境変数設定
  - Supabase 本番環境設定
  - Clerk 本番環境設定
  - デプロイと動作確認

## 実装のポイント

### 品質の作り込み

各フェーズで以下を徹底します：

- エラーハンドリング実装
- ローディング状態の表示
- レスポンシブデザイン対応
- アクセシビリティ考慮
- デザインシステムの適用

### 効率的な開発

- 関連する機能をまとめて実装
- 共通コンポーネントの早期作成
- 型定義の徹底
- 再利用可能なコードの作成

## 注意事項

- **Clerk Billing**: プランのスラグは必ず「premium」に設定
- **デザインシステム**: `.claude/design_system.md`を厳守
- **型安全性**: TypeScript の型定義を徹底
- **git 管理**: 各フェーズ完了時にコミット
