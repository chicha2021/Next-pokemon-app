/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['raw.githubusercontent.com'] //Permitiendo que use imagenes de este dominio
  }
}

module.exports = nextConfig
