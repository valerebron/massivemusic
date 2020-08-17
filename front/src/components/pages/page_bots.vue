<template>
  <section>
    <div>
      <address v-for="user in users" :key="user.id" class="user-list">
        <!-- <router-link :to="'/user/'+user.id+'/profile'"> -->
          <figure class="user-list__figure">
            <img class="user-list__avatar" :src="'/avatars/'+user.id+'-100px.png'" />
            <figcaption class="user-list__captions">
              {{ user.id }}
              <h2>{{ user.name }}</h2>
              <h4>added {{ Date.parse(user.createdAt) | moment('from', 'now') }}</h4>
              <h5>
                <input type="text" :value="user.email">
                <input type="text" :value="convertEmail(user.email)">
              </h5>
              <button @click="up(user.id, convertEmail(user.email))">translate</button>
            </figcaption>
          </figure>
        <!-- </router-link> -->
      </address>
    </div>
  </section>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    name: 'users',
    data: function() {
      return {
        users: {}
      }
    },
    methods: {
      unserialize(data) {
        var utf8Overhead = function (str) {
          var s = str.length
          for (var i = str.length - 1; i >= 0; i--) {
            var code = str.charCodeAt(i)
            if (code > 0x7f && code <= 0x7ff) {
              s++
            } else if (code > 0x7ff && code <= 0xffff) {
              s += 2
            }
            // trail surrogate
            if (code >= 0xDC00 && code <= 0xDFFF) {
              i--
            }
          }
          return s - 1
        }
        var readUntil = function (data, offset, stopchr) {
          var i = 2
          var buf = []
          var chr = data.slice(offset, offset + 1)

          while (chr !== stopchr) {
            if ((i + offset) > data.length) {
              throw Error('Invalid')
            }
            buf.push(chr)
            chr = data.slice(offset + (i - 1), offset + i)
            i += 1
          }
          return [buf.length, buf.join('')]
        }
        var readChrs = function (data, offset, length) {
          var i, chr, buf

          buf = []
          for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i)
            buf.push(chr)
            length -= utf8Overhead(chr)
          }
          return [buf.length, buf.join('')]
        }
        function _unserialize (data, offset) {
          var dtype
          var dataoffset
          var keyandchrs
          var keys
          var contig
          var length
          var array
          var obj
          var readdata
          var readData
          var ccount
          var stringlength
          var i
          var key
          var kprops
          var kchrs
          var vprops
          var vchrs
          var value
          var chrs = 0
          var typeconvert = function (x) {
            return x
          }

          if (!offset) {
            offset = 0
          }
          dtype = (data.slice(offset, offset + 1))

          dataoffset = offset + 2

          switch (dtype) {
            case 'i':
              typeconvert = function (x) {
                return parseInt(x, 10)
              }
              readData = readUntil(data, dataoffset, ';')
              chrs = readData[0]
              readdata = readData[1]
              dataoffset += chrs + 1
              break
            case 'b':
              typeconvert = function (x) {
                const value = parseInt(x, 10)

                switch (value) {
                  case 0:
                    return false
                  case 1:
                    return true
                  default:
                    throw SyntaxError('Invalid boolean value')
                }
              }
              readData = readUntil(data, dataoffset, ';')
              chrs = readData[0]
              readdata = readData[1]
              dataoffset += chrs + 1
              break
            case 'd':
              typeconvert = function (x) {
                return parseFloat(x)
              }
              readData = readUntil(data, dataoffset, ';')
              chrs = readData[0]
              readdata = readData[1]
              dataoffset += chrs + 1
              break
            case 'n':
              readdata = null
              break
            case 's':
              ccount = readUntil(data, dataoffset, ':')
              chrs = ccount[0]
              stringlength = ccount[1]
              dataoffset += chrs + 2

              readData = readChrs(data, dataoffset + 1, parseInt(stringlength, 10))
              chrs = readData[0]
              readdata = readData[1]
              dataoffset += chrs + 2
              if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
                throw SyntaxError('String length mismatch')
              }
              break
            case 'a':
              readdata = {}

              keyandchrs = readUntil(data, dataoffset, ':')
              chrs = keyandchrs[0]
              keys = keyandchrs[1]
              dataoffset += chrs + 2

              length = parseInt(keys, 10)
              contig = true

              for (i = 0; i < length; i++) {
                kprops = _unserialize(data, dataoffset)
                kchrs = kprops[1]
                key = kprops[2]
                dataoffset += kchrs

                vprops = _unserialize(data, dataoffset)
                vchrs = vprops[1]
                value = vprops[2]
                dataoffset += vchrs

                if (key !== i) {
                  contig = false
                }

                readdata[key] = value
              }

              if (contig) {
                array = new Array(length)
                for (i = 0; i < length; i++) {
                  array[i] = readdata[i]
                }
                readdata = array
              }

              dataoffset += 1
              break
            case 'O': {
              // O:<class name length>:"class name":<prop count>:{<props and values>}
              // O:8:"stdClass":2:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"baz";}
              readData = readUntil(data, dataoffset, ':') // read class name length
              dataoffset += readData[0] + 1
              readData = readUntil(data, dataoffset, ':')

              if (readData[1] !== '"stdClass"') {
                throw Error('Unsupported object type: ' + readData[1])
              }

              dataoffset += readData[0] + 1 // skip ":"
              readData = readUntil(data, dataoffset, ':')
              keys = parseInt(readData[1], 10)

              dataoffset += readData[0] + 2 // skip ":{"
              obj = {}

              for (i = 0; i < keys; i++) {
                readData = _unserialize(data, dataoffset)
                key = readData[2]
                dataoffset += readData[1]

                readData = _unserialize(data, dataoffset)
                dataoffset += readData[1]
                obj[key] = readData[2]
              }

              dataoffset += 1 // skip "}"
              readdata = obj
              break
            }
            default:
              throw SyntaxError('Unknown / Unhandled data type(s): ' + dtype)
          }
          return [dtype, dataoffset - offset, typeconvert(readdata)]
        }

        try {
          if (typeof data !== 'string') {
            return false
          }

          return _unserialize(data, 0)[2]
        } catch (err) {
          console.error(err)
          return false
        }
      },
      up(id, email) {
        window.apollo.mutate({
          variables: { id: id, email: email },
          mutation: gql`
            mutation($id: Int, $email: String) {
              editUser(id: $id, email: $email) {
                id
                email
              }
            }
          `,
        }).then((res) => {
          console.log(res)
        })
      },
      convertEmail(email) {
        let unserialized = this.unserialize(email)
        let newObject = { style: unserialized.genre, enableTracks: unserialized.activateTrackByDefault, timestamp: Date.now() }
        return JSON.stringify(newObject)
      }
    },
    mounted: function() {
      window.apollo.query({
        variables: { role: 'ROBOT' },
        query: gql`
          query($role: String) {
            users(role: $role) {
              id
              name
              role
              email
              createdAt
              updatedAt
            }
          }
        `,
      }).then((res) => {
        this.users = res.data.users.reverse()
        res.data.users.map(user => {
          this.up(user.id, this.convertEmail(user.email))
        })
      }).catch(() => {
        console.log('%c●', 'color: red', 'user error')
      })
    },
  }
</script>

<style lang="scss" scoped>
  .user-list {
    float: left;
    border-radius: 26px;
    margin: 10px;
    &:hover {
      background-color: $color-selection;
    }
    &__figure {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    &__captions {
      padding-left: 18px;
    }
    &__avatar {
      width: 100px;
      height: 100px;
    }
  }
</style>