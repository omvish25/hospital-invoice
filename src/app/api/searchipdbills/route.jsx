import { NextRequest, NextResponse } from 'next/server';
import { Ipd } from "../../lib/models";
import connectToDatabase from '../../lib/utils';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    try {
        await connectToDatabase();
        if (!search) {
            return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
        }
        const searchCriteria = {
            $or: [
                { BillNo: new RegExp(search, 'i') },
                { MrNo: new RegExp(search, 'i') },
                { PatientName: new RegExp(search, 'i') },
                { DoctorName: new RegExp(search, 'i') }
            ]
        };
        const results = await Ipd.find(searchCriteria).limit(10);
        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        console.error('Error searching IPD records:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
