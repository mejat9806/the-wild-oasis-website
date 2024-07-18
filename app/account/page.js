import React from "react";
import { auth } from "../_lib/auth";
export const metadata = {
  title: "account",
};

const Page = async () => {
  const session = await auth();
  const firstName = session.user.name.split(" ")[0];
  return (
    <div>
      <h1 className=" text-accent-400">Welcome ,{firstName}</h1>
    </div>
  );
};

export default Page;
