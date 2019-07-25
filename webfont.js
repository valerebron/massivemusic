const webfontsGenerator = require('webfonts-generator');

webfontsGenerator({
  files: [
    'src/assets/icons/next.svg',
  ],
  dest: 'icons/',
}, function(error) {
  if (error) {
    console.log('Fail!', error);
  } else {
    console.log('Done!');
  }
})