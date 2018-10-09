var path = require( 'path' );
var webpack = require( 'webpack' );
//var commonChunks = new webpack.optimize.CommonsChunkPlugin( 'common' );
var rootPath = path.resolve( __dirname, './' );
var dest = path.resolve( rootPath, '../aries-components/build/components/' );
var jsDest = path.resolve(dest, 'script/hotelinfo');
var globEntries = require( './globEntries' );
var entryFiles = globEntries('src/*/components/*/*.js');
var provide = new webpack.ProvidePlugin({
    shared: 'shared'
});

console.log('Entry Files:');
console.log(entryFiles);
console.log('Entry Files End');


module.exports = {
    context: path.resolve( rootPath ),
    plugins: [
        provide
//        commonChunks
    ],
    resolve: {
        modules: [
            path.resolve( rootPath, 'src' ),
            path.resolve( rootPath, 'node_modules' )
        ],
        alias: {
            'ajax': path.resolve( rootPath, '../core/src' ) + '/ajax.js'
        }
    },
	externals: {
        shared: 'shared',
        utils: 'shared.utils',
        constants: 'shared.constants',
        cookies: 'shared.cookies'
	},
    devtool: 'source-map',
    entry: entryFiles,
    output: {
        path: path.normalize(jsDest),
        filename: '[name]/[name].js',
        publicPath: path.join( '../', '/' )
    }
};