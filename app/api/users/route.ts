import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!isAdmin(session)) {
    return new NextResponse(
      JSON.stringify({ success: false, messsage: "Authentication failed" }),
      {
        status: 401,
        headers: { "content-type": "application/json" },
      },
    );
  }

  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}
