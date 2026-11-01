import main from "@/app/src/lib/mongooseConnection";
import UserModel from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    await main();

    const users = await UserModel.find().select("-password").lean();

    return NextResponse.json({
      success: true,
      message: "Feching all the users are successful!",
      users,
    });

  } catch (error) {
    console.error("USER FETCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest){
//     try{
//         const body = await request.body;
//     }catch(error){
//         console.error("Something went wrong!");
//         console.error("Message: ", error)
//     }
// }
