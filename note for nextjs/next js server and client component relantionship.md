server and client component relationship
Next JS always defaults to server component

if we want to use client component add " use client "

we can send server component as a children of client component if we first import it in the parrent component and pass it to client component as children

if we import a server component in client component it will be a client component // anything under the client component will be a client component

because it is based on instance of a component not the code
