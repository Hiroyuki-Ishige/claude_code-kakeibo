# Database Setup Guide

このディレクトリには、Supabaseデータベースのセットアップスクリプトが含まれています。

## セットアップ手順

### 1. Supabaseプロジェクトにアクセス

https://supabase.com/dashboard でプロジェクトを開きます。

### 2. SQL Editorを開く

左サイドバーから「SQL Editor」を選択します。

### 3. スクリプトを実行

1. `setup-database.sql` ファイルの内容をコピー
2. SQL Editorに貼り付け
3. 「Run」ボタンをクリックして実行

### 4. 実行結果を確認

以下のテーブルとインデックスが作成されていることを確認してください:

- **テーブル**: `expenses`
- **インデックス**:
  - `idx_expenses_user_id`
  - `idx_expenses_date`
  - `idx_expenses_category`
  - `idx_expenses_created_at`
- **RLSポリシー**: 有効化済み
- **トリガー**: `update_expenses_updated_at`

### 5. テーブル構造の確認

左サイドバーの「Table Editor」で `expenses` テーブルを確認できます。

## スキーマ情報

### expenses テーブル

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | UUID | PRIMARY KEY | 自動生成されるID |
| user_id | TEXT | NOT NULL | ClerkユーザーID |
| amount | NUMERIC | NOT NULL, > 0 | 支出金額 |
| category | TEXT | NOT NULL | カテゴリ（9種類の固定値） |
| date | DATE | NOT NULL | 支出日 |
| note | TEXT | NULL | メモ（任意） |
| created_at | TIMESTAMP | DEFAULT NOW() | 作成日時 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 更新日時 |

### カテゴリの固定値

- 食費
- 日用品
- 交通費
- 娯楽
- 衣服・美容
- 医療・健康
- 住居費
- 通信費
- その他

## トラブルシューティング

### エラーが発生した場合

1. 既存のテーブルがある場合は、スクリプト内の `IF NOT EXISTS` により自動的にスキップされます
2. RLSポリシーの重複エラーが出る場合は、既存のポリシーを削除するコマンドが含まれています
3. 権限エラーが発生する場合は、Supabaseプロジェクトの所有者権限があることを確認してください

### テーブルを再作成したい場合

```sql
-- 既存のテーブルを削除（注意: データも削除されます）
DROP TABLE IF EXISTS expenses CASCADE;

-- その後、setup-database.sql を再実行
```

## 注意事項

- **本番環境**: 本番環境でもこのスクリプトを実行してください
- **RLS設定**: Service Role Keyを使用するため、RLSポリシーはバックアップとして機能します
- **バックアップ**: 本番環境では定期的なバックアップを推奨します
