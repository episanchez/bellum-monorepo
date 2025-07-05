/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true
  },
  images: {
    domains: [] // TODO ajoute tes domaines d’images distantes
  }
};
export default nextConfig;
