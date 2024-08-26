import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDatabase from '../../lib/utils';
import { Users } from '../../lib/models';

export async function POST(request) {
    try {
        await connectToDatabase();

        const { username, email, password, img, phone, address } = await request.json();

        if (!username || !email || !password) {
            return new NextResponse(JSON.stringify({ error: 'Username, email, and password are required' }), { status: 400 });
        }

        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return new NextResponse(JSON.stringify({ error: 'Username or email already exists' }), { status: 409 });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
            img,
            phone,
            address,
            isAdmin: false, 
            isActive: true,
        });
        await newUser.save();

        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            img: newUser.img,
            isAdmin: newUser.isAdmin,
            isActive: newUser.isActive,
            phone: newUser.phone,
            address: newUser.address,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };

        return new NextResponse(
            JSON.stringify({ message: 'User registered successfully', user: userResponse }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error registering user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
