/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  extendDefaultRuntimeCaching: true,
  // workboxOptions: {
  //   runtimeCaching: true,
  // },
  fallbacks: {
    document: "/src/app/~offline/page.tsx",
  }
});
const nextConfig = {};

export default withPWA(
  nextConfig
);
