process.argv.splice(2, 0, 'new');
await import('./blog-cli.js');
