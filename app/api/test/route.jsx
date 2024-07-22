import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export  async function GET() {
    const users = await prisma.user.findMany()
    return Response.json(users)
}

export async function POST(request){
    const {email, heigth} = await request.json()
    const newUser = await prisma.user.create({
        data:{
            email,
            heigth
        }
    })
    return Response.json(newUser)
}