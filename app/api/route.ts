import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch data from external API");
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


// old way writing code in route
// export default function handler(req: NextRequest, res: NextResponse) {
    //   res.status(200).json({ message: "Hello, world!" });
    // }

    
    // export function GET(req: NextRequest) {
    //     return NextResponse.json({ message: "Hello, world! API route section" }, { status: 200 });
    // }

