import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    try {
        // Connect to the database
        await connectToDatabase();

        // Extract the ID of the document to be deleted from the query parameters
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
        }

        // Delete the document from the database
        const deletedIpdCasePaper = await IpdCase.findByIdAndDelete(id);

        if (!deletedIpdCasePaper) {
            return NextResponse.json({ error: 'IPD Case Paper record not found' }, { status: 404 });
        }

        // Return a success response indicating the record was deleted
        return NextResponse.json({ message: 'IPD Case Paper record deleted successfully' }, { status: 200 });
    } catch (error) {
        // Log any errors and return an error response
        console.error('Error deleting IPD Case Paper record:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
