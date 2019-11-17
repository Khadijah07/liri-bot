console.log('this is loaded');

var twitterKeys = {
    consumer_key: 'bYShUWBbzAFxvzyfXsPVuCDBs ',
    consumer_secret: 'HhWyjb62QyVSmAkfEivQr2dDKwF3yiUlLGC3F282fQiqOdfnBV',
    access_token_key: '1196094220685205504-7zZvMi1xW4Fe7Yd3pP6r24y2VLOsdh ',
    access_token_secret: 'kT2hYjoIWVf9M0vwdukNx0y7S7dcHFuIDftRYROu3dKPk',
};

module.exports = twitterKeys;

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};