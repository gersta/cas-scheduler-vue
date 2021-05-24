const path = require('path');
const PrerenderPlugin = require('prerender-spa-plugin');

const productionPlugins = [
    new PrerenderPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/'],
        renderer: new PrerenderPlugin.PuppeteerRenderer({
            inject: {},
            renderAfterElementExists: '[data-view]'
        })
    })
]

module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "DHBW CAS Scheduler";
                return args;
            })
    },
    configureWebpack: {
        devtool: 'source-map',
        plugins: productionPlugins
    }
}