/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{ hostname: 'encrypted-tbn0.gstatic.com' },
			{ hostname: 'lh3.googleusercontent.com' },
		],
	}
}

module.exports = nextConfig
