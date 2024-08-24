import { NextRequest, NextResponse } from 'next/server';
import { Ipd } from "../../lib/models";
import connectToDatabase from '../../lib/utils';
import { ObjectId } from 'mongodb'; 

export async function DELETE(request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get('_id');

        if (!_id) {
            return NextResponse.json({ error: '_id is required' }, { status: 400 });
        }

        if (!ObjectId.isValid(_id)) {
            return NextResponse.json({ error: 'Invalid _id format' }, { status: 400 });
        }

        const deletedIpd = await Ipd.findByIdAndDelete(_id);

        if (!deletedIpd) {
            return NextResponse.json({ error: 'IPD record not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'IPD record deleted successfully', ipd: deletedIpd }, { status: 200 });
    } catch (error) {
        console.error('Error deleting IPD record:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
