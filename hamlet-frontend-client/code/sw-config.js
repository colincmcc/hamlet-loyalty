module.exports = {
  staticFileGlobs: [
    "build/**/*.js",
    "build/**/*.css",
    "build/index.html",
    "build/favicon.ico",
    "build/manifest.json"
  ],
  navigateFallback: "/index.html",
  // something like this should allow everything but files ending with `.zip`
  navigateFallbackWhitelist: [
    /^(?!.*[.]zip$)|(?!.* graphql.*) | (?!.* wp-admin.*).*$/
  ],
  cacheId: "the-cache-machine"
};