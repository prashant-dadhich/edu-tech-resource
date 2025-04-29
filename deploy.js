import ghpages from 'gh-pages';

// Deploy the dist directory to gh-pages branch
ghpages.publish('dist', {
  branch: 'gh-pages',
  message: 'Auto-generated deployment to GitHub Pages'
}, (err) => {
  if (err) {
    console.error('Deployment error:', err);
  } else {
    console.log('Successfully deployed to GitHub Pages!');
  }
});