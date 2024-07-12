Static side generation is use to generate static side

it is good for most hosting provider

output: "export", // this is cannot be used with SSG // add this to our nextConfig then we can use it on any provider exept the Image

export const generateStaticParams = async () => {
const cabins = await getCabins();
const ids = cabins.map((cabin) => ({
cabinId: String(cabin.id), //this is need to be the same as the dynamic route name the [cabinId] folder
}));
return ids;

//this is use to create a static params to make our page not dynamic and become static .only when we have pre determined amount of dynamic route like here 8 .if can change better use dynamic generate route
};
