import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function PUT(request) {
    try {
        await connectToDatabase();
        const ipdCasePapers = await IpdCase.find();
        const response = NextResponse.json({
            data: ipdCasePapers,
        }, { status: 200 });

        // Set cache-control headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    } catch (error) {
        console.error('Error fetching IPD Case Paper records:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
