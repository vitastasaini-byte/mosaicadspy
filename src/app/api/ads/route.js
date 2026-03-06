import { NextResponse } from 'next/server';
import { getDb } from '@/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');

    if (!brand) return NextResponse.json({ error: 'Brand is required' }, { status: 400 });

    try {
        const db = await getDb();
        const ads = await db.all('SELECT * FROM ads WHERE brand = ? ORDER BY start_date DESC', [brand]);
        return NextResponse.json({ ads });
    } catch (error) {
        console.error('Error fetching ads:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
