module.exports = {
  user(parent, args, context, info) {
    return context.prisma.track.findUnique({ where: { id: parent.id } }).User()
  },
  style(parent, args, context, info) {
    return context.prisma.track.findUnique({ where: { id: parent.id } }).Style()
  },
}
