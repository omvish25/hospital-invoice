import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function GET(request) {
    try {
        await connectToDatabase();
        const ipdCasePapers = await IpdCase.find()
        return NextResponse.json({
            data: ipdCasePapers,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching IPD Case Paper records:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
