module.exports = {
  tracks(parent, args, context, info) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).Track()
  },
}
