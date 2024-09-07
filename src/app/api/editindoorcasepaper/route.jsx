import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function PUT(request) {
    const { searchParams } = new URL(request.url);
    try {
        await connectToDatabase();

        // const id = searchParams.get('id');

        // if (!id) {
        //     return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
        // }

        // Parse the request body to get the fields that need to be updated
        const body = await request.json();
        console.log('Body:', body);
        const _id = body.id;
        console.log('ID:', _id);
        const updateFields = {};

  
        if (body.PatientName) updateFields.PatientName = body.PatientName;
        if (body.Age) updateFields.Age = body.Age;
        if (body.Sex) updateFields.Sex = body.Sex;
        if (body.MaritialStatus) updateFields.MaritialStatus = body.MaritialStatus;
        if (body.Address) updateFields.Address = body.Address;
        if (body.MobileNo) updateFields.MobileNo = body.MobileNo;
        if (body.PhoneNumber) updateFields.PhoneNumber = body.PhoneNumber;
        if (body.AdmissionDate) updateFields.AdmissionDate = body.AdmissionDate;
        if (body.IpNo) updateFields.IpNo = body.IpNo;
        if (body.DoctorName) updateFields.DoctorName = body.DoctorName;
        if (body.SecondDoctorName) updateFields.SecondDoctorName = body.SecondDoctorName;
        if (body.ThirdDoctorName) updateFields.ThirdDoctorName = body.ThirdDoctorName;
        if (body.RefDoctorName) updateFields.RefDoctorName = body.RefDoctorName;
        if (body.RelativeName) updateFields.RelativeName = body.RelativeName;
        if (body.PatientCategory) updateFields.PatientCategory = body.PatientCategory;
        if (body.isReimbursement) updateFields.isReimbursement = body.isReimbursement;
        if (body.MlcNo) updateFields.MlcNo = body.MlcNo;
        if (body.AdmissionTime) updateFields.AdmissionTime = body.AdmissionTime;
        if (body.DepartmentName) updateFields.DepartmentName = body.DepartmentName;
        if (body.CompanyName) updateFields.CompanyName = body.CompanyName;
        if (body.TariffName) updateFields.TariffName = body.TariffName;
        if (body.BedName) updateFields.BedName = body.BedName;
        if (body.RelationName) updateFields.RelationName = body.RelationName;
        if (body.RelationPhoneNoo) updateFields.RelationPhoneNoo = body.RelationPhoneNoo;
        if (body.RelationAddress) updateFields.RelationAddress = body.RelationAddress;
        if (body.AdvanceAmounts) updateFields.AdvanceAmounts = body.AdvanceAmounts;


        

        // Update the document in the database
        const updatedIpdCasePaper = await IpdCase.findByIdAndUpdate(_id, updateFields, { new: true });
        console.log('Updated:', updatedIpdCasePaper);

        if (!updatedIpdCasePaper) {
            return NextResponse.json({ error: 'IPD Case Paper record not found' }, { status: 404 });
        }

        // Return a success response with the updated IPD Case Paper record
        return NextResponse.json({ message: 'IPD Case Paper record updated successfully', IpdCase: updatedIpdCasePaper }, { status: 200 });
    } catch (error) {
        // Log any errors and return an error response
        console.error('Error updating IPD Case Paper record:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
