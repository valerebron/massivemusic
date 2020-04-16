module.exports = {
  user(parent, args, context, info) {
    return context.prisma.track({ id: parent.id }).user()
  },
  style(parent, args, context, info) {
    return context.prisma.track({ id: parent.id }).style()
  },
}
