/**
 * Created by ichetandhembre on 28/3/14.
 */

var fs_extension = require('../');
var test = require('tap').test;

test('file extension provided', function(t) {
    t.equal(fs_extension.getExtension('demo.txt'), 'txt', 'file extension should be txt');
    t.equal(fs_extension.getExtension('demo.png'), 'png', 'file extension should be png');
    t.equal(fs_extension.getExtension('demo.mp3'), 'mp3', 'file extension should be mp3');
    t.equal(fs_extension.getExtension('demo'), '', 'no file extension');
    t.equal(fs_extension.getExtension('demo.'), '', 'no file extension');
    t.end();
});
