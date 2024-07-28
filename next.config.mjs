/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/(signin|signup)",
        destination: "/",
        has: [
          {
            type: "cookie",
            key: "session"
          }
        ],
        permanent: false
      }
    ];
  }
};

export default nextConfig;
