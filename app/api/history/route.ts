import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    if (!email) return NextResponse.json([], { status: 200 });

    const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, email))
        .orderBy(desc(AIOutput.createdAt));

    return NextResponse.json(result);
}