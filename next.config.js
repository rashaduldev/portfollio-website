// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.digitalstrike.com',
      },
      {
        protocol: 'https',
        hostname: 'www.crowe.com', // 👈 Include any additional domains you use
      },
      {
        protocol: 'https',
        hostname: 'onemarketmedia.com', // 👈 Add this for the onemarketmedia.com domain
      },
    ],
  },
};
