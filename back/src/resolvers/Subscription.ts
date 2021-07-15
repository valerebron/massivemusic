module.exports = {
  adminCountUpdated: {
    subscribe: (parent, args, context, info) => context.pubsub.asyncIterator(['ADMIN_COUNT_UPDATED']),
  },
}
