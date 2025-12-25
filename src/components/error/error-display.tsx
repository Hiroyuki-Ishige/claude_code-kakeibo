'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorDisplayProps {
  error: Error | null;
  onReset?: () => void;
  title?: string;
  message?: string;
}

/**
 * エラー表示コンポーネント
 * エラーが発生した際に表示されるUI
 */
export function ErrorDisplay({
  error,
  onReset,
  title = 'エラーが発生しました',
  message,
}: ErrorDisplayProps) {
  const errorMessage = message || error?.message || '予期しないエラーが発生しました';

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center text-center">
          {/* エラーアイコン */}
          <div className="mb-4 rounded-full bg-red-100 p-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>

          {/* エラーメッセージ（Shadcn Alert使用） */}
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>

          {/* 開発環境でのエラー詳細 */}
          {process.env.NODE_ENV === 'development' && error?.stack && (
            <details className="mb-6 w-full rounded-md bg-gray-50 p-3 text-left">
              <summary className="cursor-pointer text-xs font-semibold text-gray-700">
                エラー詳細（開発環境のみ）
              </summary>
              <pre className="mt-2 overflow-auto text-xs text-gray-600">
                {error.stack}
              </pre>
            </details>
          )}

          {/* リセットボタン */}
          {onReset && (
            <Button
              onClick={onReset}
              variant="default"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              もう一度試す
            </Button>
          )}

          {/* ホームに戻るボタン */}
          {!onReset && (
            <Button
              onClick={() => window.location.href = '/'}
              variant="default"
            >
              ホームに戻る
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
