import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export async function GET(request,{ params }) {
    try{
      const { id } = params; //get value of object
      const userId = id
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
      });
  
        return new Response(JSON.stringify(user))

} catch (error){
    // Handle any internal server errors
    return new Response('Internal Server Error', { status: 500 });
}   

}

export async function PUT(request,{ params }) {
    try{
        const {planName, dob, height ,weight, weekly} = await request.json()
        const { id } = params; //get value of object
        const userId = id
        const updateUser = await prisma.user.update({
        where: { id: userId},
            data:{
                planName,
                dob,
                height: parseFloat(height),
                weight: parseFloat(weight),
                weekly: parseFloat(weekly)
            }
        });
        return new Response(JSON.stringify(updateUser))
} catch (error){
    // Handle any internal server errors
    return new Response('Internal Server Error', { status: 500 });
}   

}

export async function DELETE(request,{ params }) {
    
    try{
        const { id } = params; //get value of object
        const userId = id
        const updateUser = await prisma.user.update({
            where: { id: userId},
            data:{
                planName: null,
                dob: null,
                height: null,
                weight: null,
                weekly: null
            }
        });

        return new Response(JSON.stringify(updateUser))
    } catch (error){
        // Handle any internal server errors
        return new Response('Internal Server Error', { status: 500 });
    }   

}
