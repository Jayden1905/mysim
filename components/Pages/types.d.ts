import { User } from "@prisma/client";

type DashboardHomeProps = {
  userCount: number;
  team: User[];
};
