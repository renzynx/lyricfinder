/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl:
    process.env.NODE_ENV === "production" ? "https://lyricfinder.xyz" : null,
  generateRobotsTxt: true, // (optional)
  // ...other options
};
