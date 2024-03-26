import { getUsers } from "@/lib/actions";
import { type User } from "@prisma/client";
import { UpdateUserButton } from "../Buttons/buttons";

export async function AboutPage() {
  const users = await getUsers();

  return (
    <>
      <div className="mb-2">
        {users?.map((user: User) => (
          <div key={user.id}>
            {user.name} is a {user.role}
          </div>
        ))}
      </div>
      <UpdateUserButton />
    </>
  );
}
