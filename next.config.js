const withCSS = require('@zeit/next-css')

module.exports = {
    plugins: withCSS({
        cssLoaderOptions: {
            cssModules: true
        }
    }),
    publicRuntimeConfig: {
        API: 'http://localhost:3000/api',
        DOMAIN: 'http://localhost:3000',
        MONGO: 'mongodb+srv://BlogAdmin:M3RbhbOvsSJQeb5f@cluster0.cc1er.mongodb.net/blog_prj?retryWrites=true&w=majority '
    }
}