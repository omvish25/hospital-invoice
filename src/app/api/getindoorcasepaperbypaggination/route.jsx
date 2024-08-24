import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    try {
        // Connect to the database
        await connectToDatabase();

        // Extract pagination parameters from the request URL
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;

        // Calculate the number of documents to skip based on the page and limit
        const skip = (page - 1) * limit;

        // Get the total count of documents
        const totalDocuments = await IpdCase.countDocuments();

        // Retrieve the paginated data
        const ipdCasePapers = await IpdCase.find()
            .skip(skip)
            .limit(limit);

        // Return the paginated data along with pagination info
        return NextResponse.json({
            data: ipdCasePapers,
            pagination: {
                totalDocuments,
                totalPages: Math.ceil(totalDocuments / limit),
                currentPage: page,
                pageSize: limit
            }
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching paginated IPD Case Paper records:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
