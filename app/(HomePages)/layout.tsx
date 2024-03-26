import { ReactNode } from "react";
import "../globals.css";
import Wrapper from "@/components/Layout/wrapper";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Nav } from "@/components/NavMenu/navBar";

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Nav session={session} />
      <Wrapper>
        <div className="relative top-28">{children}</div>
      </Wrapper>
    </div>
  );
}
