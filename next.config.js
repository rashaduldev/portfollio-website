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
        hostname: 'www.crowe.com', 
      },
      {
        protocol: 'https',
        hostname: 'onemarketmedia.com', 
      },
       {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};
