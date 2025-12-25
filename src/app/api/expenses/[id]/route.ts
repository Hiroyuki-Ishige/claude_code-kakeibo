import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { updateExpenseSchema } from '@/lib/validations';
import { updateExpenseForUser, deleteExpenseForUser, getCategoryByName } from '@/lib/supabase';

/**
 * PUT /api/expenses/[id]
 * 支出を更新
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 認証チェック
    const { userId } = await auth();
    console.log('[API PUT] User ID:', userId);

    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // パラメータを取得
    const { id } = await params;
    console.log('[API PUT] Expense ID:', id);

    // リクエストボディをパース
    const body = await request.json();
    console.log('[API PUT] Request body:', body);

    // バリデーション
    const validation = updateExpenseSchema.safeParse(body);
    if (!validation.success) {
      console.error('[API PUT] Validation error:', validation.error.issues);
      return NextResponse.json(
        { error: 'バリデーションエラー', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { amount, category, date, note } = validation.data;
    console.log('[API PUT] Validated data:', { amount, category, date, note });

    // 更新データを構築
    const updates: {
      amount?: number;
      category_id?: string;
      date?: string;
      note?: string;
    } = {};

    if (amount !== undefined) {
      updates.amount = amount;
    }

    if (category !== undefined) {
      // カテゴリ名からカテゴリIDを取得
      try {
        console.log('[API PUT] Looking up category:', category);
        const categoryData = await getCategoryByName(category);
        updates.category_id = categoryData.id;
        console.log('[API PUT] Category found:', categoryData);
      } catch (error) {
        console.error('[API PUT] Category lookup error:', error);
        return NextResponse.json(
          {
            error: `カテゴリ「${category}」が見つかりません。データベースにカテゴリが登録されているか確認してください。`,
            details: error instanceof Error ? error.message : String(error)
          },
          { status: 400 }
        );
      }
    }

    if (date !== undefined) {
      updates.date = date;
    }

    if (note !== undefined) {
      updates.note = note;
    }

    // 更新するフィールドがない場合
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: '更新するフィールドが指定されていません' },
        { status: 400 }
      );
    }

    // 支出を更新
    console.log('[API PUT] Updating expense:', id, updates);
    const expense = await updateExpenseForUser(userId, id, updates);
    console.log('[API PUT] Expense updated:', expense);

    return NextResponse.json({ data: expense }, { status: 200 });
  } catch (error) {
    console.error('[API PUT] Unexpected error:', error);
    return NextResponse.json(
      {
        error: '支出の更新に失敗しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/expenses/[id]
 * 支出を削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 認証チェック
    const { userId } = await auth();
    console.log('[API DELETE] User ID:', userId);

    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // パラメータを取得
    const { id } = await params;
    console.log('[API DELETE] Expense ID:', id);

    // 支出を削除
    console.log('[API DELETE] Deleting expense:', id);
    await deleteExpenseForUser(userId, id);
    console.log('[API DELETE] Expense deleted successfully');

    return NextResponse.json(
      { message: '支出を削除しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API DELETE] Unexpected error:', error);
    return NextResponse.json(
      {
        error: '支出の削除に失敗しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
