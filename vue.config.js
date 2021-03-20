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
    configureWebpack: {
        devtool: 'source-map',
        plugins: productionPlugins
    }
}