const cryptojs = require('crypto-js')

const resolvers = {
  Mutation: {
    register: async (parent, { name, email, password }, ctx, info) => {
      const hashedPassword = await cryptojs.SHA1(password)
      const user = await ctx.prisma.createUser({
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      })
      return user
    },
  },
}
