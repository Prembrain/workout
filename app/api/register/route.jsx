import bcrypt from 'bcrypt'
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request){ //receive from frontend data(register/page.jsx)
    const body = await request.json();//json --> javaScript
    const { name, email, password, heigth} = body;

    if(!name || !email || !password) { //check condition
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const exist = await prisma.user.findUnique({//check email is unique or not unique from database
        where: {
            email
        }
    });

    if(exist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10); //generate hashedpassword

    const user = await prisma.user.create({ //create new user
        data: {
            name,
            email,
            hashedPassword,
            heigth
        }
    });

    return NextResponse.json(user)
}