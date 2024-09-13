import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function DELETE() {
 cookies().delete("shopping-user");
 return NextResponse.json({success: true},{status: 200});
};