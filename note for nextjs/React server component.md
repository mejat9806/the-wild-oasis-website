react server components (RSC)

100% client side (react)
pros - very interactive ,components based
cons - required lots of JS,client side data water fall

100% server side (PHP)

pros - easy and fast fetch all data,close to data source
cons -no components

what is react server component RSC

- a new full stack ach for React apps
- introduces the server as an intergral part of component trees :server component
- we write frontend code nect to backend code in anatural way that "feel" like regular react
- server component
  -- server component are that component that are only rendered on the server side
  -- server component has no interactivity like state so no JS
  -- we can build the back end with react
  -- server component is a Defaults component in RSC like next
  -- to use client we use "use client"
  -- you can use client component inside of the server component
  -- thing like th sidebar,header , footer and layout can be a server component or any component that will fetch the data and dont change
  -- client component usually component that required JS like onclick or react hook
  -- server component can be re render with the navigation change

the GOOD and BAD of RSC

the GOOD
-- we can create entire full-stack apps with react components alone
-- one single code base for front end and backend
-- server component have more direct and secure access to the data source
-- no client-server water fall because all data fetch is in the server
-- no JS
the BAD
-- make react more complex
-- more thing to learn
-- context Api or any react hook dont work on server component
-- can be only be used in framework
