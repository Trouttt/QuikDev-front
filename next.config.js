/*PWA const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production']*/
/*
/**
@type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig,
*/
module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true
  }
}

/*
module.exports = withPWA({
  pwa:{
    dest:'public',
    disable: !isProd
  }
})
*/
