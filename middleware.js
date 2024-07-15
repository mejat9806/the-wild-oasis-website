// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

// export const config = {
//   matcher: ["/account"], //this will redirect to waht ever route nextResponse has above
// };

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"], //this will redirect to waht ever route nextResponse has above
};

// how this middleware auth work
//when the user hit the account page it will triger the callback in the authconfig object if authorized function returns true it will allow user to access the page else it will redirect to some other page if false
