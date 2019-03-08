/**
 * Created by ichetandhembre on 28/3/14.
 */

'use strict';

/**
 * @param filename
 * @returns file extension
 */
var getExtension = function(filename) {
    var files = filename.split('.');
    if(files.length == 1) {
        return '';

    }
    return files[files.length-1];
};

exports.getExtension = getExtension;

