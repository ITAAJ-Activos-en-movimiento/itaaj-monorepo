/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: 'static.fotocasa.es'}, {hostname: 'res.cloudinary.com'}, {hostname: 'corehub-dev.s3.us-east-2.amazonaws.com'}],
      },
}

module.exports = nextConfig
