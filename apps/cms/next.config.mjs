/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@portfolio/database", "@portfolio/types", "lucide-react", "framer-motion"],
    experimental: {
        serverActions: {
            bodySizeLimit: "20mb",
        },
    },
};

export default nextConfig;
