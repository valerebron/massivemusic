<template>
  <main class="page--container about">
    <section>
      <p>
        MassiveMusic is a <strong>bass music streaming</strong> site.
        The purpose is to <strong>explore</strong> and <strong>discover music</strong>.
      </p>
      <p>
        The concept is simple:
        <ol>
          <li>
            one big list of tracks
          </li>
          <li>
            you can search in it
          </li>
          <li>
            you can filter by style
          </li>
          <li>
            you can filter by artist
          </li>
          <li>
            or by uploader
          </li> 
          <li>
            finaly you can add to your favorite playlist
          </li>
        </ol>
      </p>
      <svgLogo/>
      <p>
        All tracks are stored in youtube so if you want to <router-link to="/add-tracks">add one</router-link>, just <router-link to="/signup">create an account</router-link> and click on <router-link to="/add-tracks">add track</router-link> in the left menu.
      </p>
      <p>
        Tips: for android phones, use <a href="https://firefox.en.uptodown.com/android/download/2954186">firefox daylight 83.1.0</a>,
        This version of firefox let you play music in the background even if the phone is in sleep mode.
      </p>
    </section>
  </main>
</template>

<script>
  import svgLogo from '@/assets/logo.svg'
  export default {
    name: 'about',
    components: {
      svgLogo,
    },
  }
</script>

<style lang="scss">
  .about {
    flex-direction: column;
    a {
      text-decoration: underline;
      &:nth-child(3n) {
        color: $color-1;
      }
      &:nth-child(3n+1) {
        color: $color-2;
      }
      &:nth-child(3n+2) {
        color: $color-3;
      }
    }
    svg {
      width: 100%;
      height: 20vw;
      padding: 20px;
      padding-bottom: 40px;
    }
  }
</style>