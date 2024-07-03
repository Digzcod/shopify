import createClientServer from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = createClientServer();
  const { gender, username, fullName, email, password } = await req.json();
  const { data, error } = await supabase.auth.signUp({ email, password });

  const user = data?.user;

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json(
      { message: "User creation failed" },
      { status: 500 }
    );
  }

  try {
    await supabase
      .from("users")
      .insert([{ id: user.id, full_name: fullName, username, gender, email }]);
  } catch (insertError: any) {
    return NextResponse.json({ message: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User successfully created", data });
}
