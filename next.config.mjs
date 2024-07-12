/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utpfanljpwysyommcppy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabins/**",
      },
    ],
  },
  // output: "export", // this is cannot be used with SSG
};

export default nextConfig;
