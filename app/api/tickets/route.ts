import { NextRequest, NextResponse } from "next/server";



// export default function handler(req: NextRequest, res: NextResponse) {
//   res.status(200).json({ message: "Hello, world!" });
// }

export function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello, world! Stephen" }, { status: 200 });
}
