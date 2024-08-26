import { NextRequest, NextResponse } from 'next/server';
import { Ipd } from '../../lib/models';
import connectToDatabase from '../../lib/utils';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    try {
        await connectToDatabase();
        const limit = 15; 
        const skip = (page - 1) * limit;
        const ipdBills = await Ipd.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
        const totalRecords = await Ipd.countDocuments();
        return NextResponse.json({
            ipdBills,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords,
        });
    } catch (error) {
        console.error('Error fetching IPD records:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
