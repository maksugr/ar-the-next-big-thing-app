module.exports = [
    {
        name: 'main',
        path: 'build/static/js/main.*.js',
        limit: '700 ms'
    },
    {
        name: 'chunks',
        path: ['build/static/js/*.js', '!build/static/js/main.*.js'],
        limit: '2.5 s'
    }
];
