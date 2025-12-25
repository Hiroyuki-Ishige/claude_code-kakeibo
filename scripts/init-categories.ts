/**
 * カテゴリテーブル初期化スクリプト
 *
 * 使用方法:
 * npm run init-categories
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// .env.localファイルを読み込む
config({ path: resolve(__dirname, '../.env.local') });

async function initCategories() {
  console.log('🚀 Starting category initialization...');

  // 環境変数が読み込まれた後に動的インポート
  const { supabaseAdmin } = await import('../src/lib/supabase');
  const { EXPENSE_CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS } = await import('../src/lib/constants');

  try {
    // 既存のカテゴリを確認
    const { data: existingCategories, error: fetchError } = await supabaseAdmin
      .from('categories')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching categories:', fetchError);
      throw fetchError;
    }

    console.log(`📊 Found ${existingCategories?.length || 0} existing categories`);

    // すべてのカテゴリを挿入または更新
    const categoriesToInsert = EXPENSE_CATEGORIES.map((category, index) => ({
      name: category,
      icon: CATEGORY_ICONS[category],
      color: CATEGORY_COLORS[category],
      display_order: index + 1,
    }));

    console.log('📝 Categories to insert:', categoriesToInsert);

    // upsertを使用して、既存のカテゴリは更新、新規のカテゴリは挿入
    const { data, error } = await supabaseAdmin
      .from('categories')
      .upsert(categoriesToInsert, {
        onConflict: 'name',
        ignoreDuplicates: false,
      })
      .select();

    if (error) {
      console.error('❌ Error upserting categories:', error);
      throw error;
    }

    console.log('✅ Categories initialized successfully!');
    console.log('📊 Total categories:', data?.length || 0);
    console.log('Categories:', data);

    // 最終確認
    const { data: finalCategories, error: finalError } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (finalError) {
      console.error('❌ Error fetching final categories:', finalError);
      throw finalError;
    }

    console.log('\n📋 Final category list:');
    finalCategories?.forEach((cat) => {
      console.log(`  ${cat.display_order}. ${cat.name} (${cat.icon}, ${cat.color})`);
    });

    console.log('\n✨ Category initialization completed!');
  } catch (error) {
    console.error('💥 Failed to initialize categories:', error);
    process.exit(1);
  }
}

// スクリプトを実行
initCategories();
