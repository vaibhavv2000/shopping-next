import generateTables from "@/lib/tables";
import {NextResponse} from "next/server";

export async function GET() { 
 try {
  await generateTables();
  return NextResponse.json({success: true},{status: 201});
 } catch (error) {
  return NextResponse.json(error,{status:500}); 
 };
};