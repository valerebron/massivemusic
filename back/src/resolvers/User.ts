module.exports = {
  tracks(parent, args, context, info) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).Track()
  },
}
