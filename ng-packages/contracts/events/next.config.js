module.exports = {
  async rewrites() {
    return [
      {
        source: '/metadata/:eventId/*',
        destination: '/metadata/:eventId.json', // Matched parameters can be used in the destination
      },
    ]
  },
}
