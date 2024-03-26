import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { email, role } = await request.json();

  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      role: role,
    },
  });

  return NextResponse.json(user);
}
