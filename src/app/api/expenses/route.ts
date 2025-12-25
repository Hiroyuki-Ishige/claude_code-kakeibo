import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { createExpenseSchema } from '@/lib/validations';
import { createExpenseForUser, getCategoryByName, getExpensesForUser, upsertUser } from '@/lib/supabase';

/**
 * POST /api/expenses
 * 支出を作成
 */
export async function POST(request: NextRequest) {
  try {
    // 認証チェック
    const { userId } = await auth();
    console.log('[API] User ID:', userId);

    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // リクエストボディをパース
    const body = await request.json();
    console.log('[API] Request body:', body);

    // バリデーション
    const validation = createExpenseSchema.safeParse(body);
    if (!validation.success) {
      console.error('[API] Validation error:', validation.error.issues);
      return NextResponse.json(
        { error: 'バリデーションエラー', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { amount, category, date, note } = validation.data;
    console.log('[API] Validated data:', { amount, category, date, note });

    // ユーザー情報を取得してusersテーブルに登録（存在しない場合）
    try {
      const user = await currentUser();
      console.log('[API] Current user:', user?.id, user?.emailAddresses[0]?.emailAddress);

      if (user) {
        const fullName = user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName || undefined;

        await upsertUser({
          id: userId,
          email: user.emailAddresses[0]?.emailAddress || '',
          name: fullName,
        });
        console.log('[API] User upserted successfully');
      }
    } catch (error) {
      console.error('[API] Error upserting user:', error);
      // ユーザー登録エラーは致命的ではないので続行
    }

    // カテゴリ名からカテゴリIDを取得
    let categoryData;
    try {
      console.log('[API] Looking up category:', category);
      categoryData = await getCategoryByName(category);
      console.log('[API] Category found:', categoryData);
    } catch (error) {
      console.error('[API] Category lookup error:', error);
      return NextResponse.json(
        {
          error: `カテゴリ「${category}」が見つかりません。データベースにカテゴリが登録されているか確認してください。`,
          details: error instanceof Error ? error.message : String(error)
        },
        { status: 400 }
      );
    }

    // 支出を作成
    console.log('[API] Creating expense for user:', userId);
    const expense = await createExpenseForUser(userId, {
      amount,
      category_id: categoryData.id,
      date,
      note,
    });
    console.log('[API] Expense created:', expense);

    return NextResponse.json({ data: expense }, { status: 201 });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      {
        error: '支出の作成に失敗しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/expenses
 * 支出一覧を取得
 */
export async function GET(request: NextRequest) {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // 支出一覧を取得
    const expenses = await getExpensesForUser(userId);

    return NextResponse.json({ data: expenses }, { status: 200 });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: '支出の取得に失敗しました' },
      { status: 500 }
    );
  }
}
