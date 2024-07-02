"use server";
import createClientServer from "@/utils/supabase/server";

export async function signUpAction(gender: string, username: string, fullName: string, email: string, password: string) {
  const supabase = createClientServer();
  const { data, error } = await supabase.auth.signUp({ email, password });


  console.log(data)
  const user = data?.user;
  
  if (error) {
    return { message: error.message, status: 401 };
  }

  if (!user) {
    return { message: "User creation failed", status: 500 };
  }

  try {
    // Insert user data into your Supabase database
    const { error: dbError } = await supabase.from('users').insert([
      { id: user.id, full_name: fullName, username, gender, email }
    ]);

    if (dbError) {
      return { message: dbError.message, status: 500 };
    }
  } catch (insertError: any) {
    return { message: insertError.message, status: 500 };
  }

  return { message: "User successfully created", status: 200, data };
}
