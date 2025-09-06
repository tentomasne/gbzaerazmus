const { withSecurityTxt } = require('@tentomasne/nextjs-security-txt');

const securityTxtConfig = {
  contact: 'mailto:gbza@davidik.eu',
  expires: '2025-12-31T23:59:59Z',
  preferredLanguages: ['en', 'sk', "cs", "fr"]
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = withSecurityTxt(securityTxtConfig)({
  ...nextConfig,
});