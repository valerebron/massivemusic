module.exports = {
  tracks(parent, args, context, info) {
    return context.prisma.user({ id: parent.id }).tracks()
  },
}
