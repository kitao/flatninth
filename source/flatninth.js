/*
 * Copyright (c) 2009-2010 Takashi Kitao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @namespace Flatninth package.
 */
var b9 = {};

/**
 * Includes a script file.
 * @param {String} filename The name of a script file.
 */
b9.include = function(filename)
{
    var xhr = null;

    if (window.XMLHttpRequest)
    {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        try
        {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    xhr.open("GET",filename,false);
    xhr.send("");
    eval(xhr.responseText);
};

/**
 * @param {String} filename The name of a script file.
 * @returns {String} The name of the directory of a script.
 */
b9.getScriptDir = function(filename)
{
    var script = document.getElementsByTagName("script");

    for (var i in script)
    {
        var src = script[i].src;
        var dir_length = src.length - filename.length;

        if (src.substring(dir_length) == filename)
        {
            return src.substring(0, dir_length);
        }
    }

    return "";
};

/** @private */
b9._src_dir = b9.getScriptDir("flatninth.js") + "flatninth/";

b9.include(b9._src_dir + "debug.js");
b9.include(b9._src_dir + "id.js");
b9.include(b9._src_dir + "list.js");
b9.include(b9._src_dir + "tree.js");
//b9.include(b9._src_dir + "flatninth/idmap.js");
//b9.include(b9._src_dir + "flatninth/vector2.js");
