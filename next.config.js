/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "femtechit.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "alanmajchrowicz.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-montecasino.pressidium.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.fluwel.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.esa.int",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "imaging.nikon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cbeyondata.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-goldreefcity.pressidium.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};
