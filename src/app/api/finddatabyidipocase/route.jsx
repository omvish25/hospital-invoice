import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('slug');
    console.log('ID:', id);

    if (!id) {
        return NextResponse.json({ error: 'ID (slug) is required' }, { status: 400 });
    }

    try {
        // Connect to the database
        await connectToDatabase();

        // Find the IPD Case Paper by ID
        const ipdCasePaper = await IpdCase.findById(id);

        // Check if the record is found
        if (!ipdCasePaper) {
            return NextResponse.json({ error: 'IPD Case Paper not found' }, { status: 404 });
        }

        // Return the found record
        return NextResponse.json(ipdCasePaper, { status: 200 });
    } catch (error) {
        console.error('Error fetching IPD Case Paper by ID:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
