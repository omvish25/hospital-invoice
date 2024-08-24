import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    try {
        // Connect to the database
        await connectToDatabase();

        // Extract the single input parameter from the request URL
        const data = searchParams.get('data');

        if (!data) {
            return NextResponse.json({ error: 'No search data provided' }, { status: 400 });
        }

        // Build the search query to match any of the possible fields
        const query = {
            $or: [
                { MrNo: data },
                { PatientName: { $regex: new RegExp(data, 'i') } }, // Case-insensitive search
                { MobileNo: data },
                { CompanyName: { $regex: new RegExp(data, 'i') } }, // Case-insensitive search
                { DoctorName: { $regex: new RegExp(data, 'i') } }   // Case-insensitive search
            ]
        };

        // Perform the search in the database
        const results = await IpdCase.find(query);

        // Return the search results
        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        console.error('Error searching IPD Case Paper records:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
