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
 * @class An ID based on a string.
 * @param {String} [seed] A seed of an ID. When not specified, generate the unique ID automatically.
 */
b9.System = {};

/**
 * @param {String} str
 * @return {Number}
 */
b9.System.toID = function(str) {
    b9.System._n1 = 0;
    b9.System._n2 = str.length;

    for (b9.System._n3 = 0; b9.System._n3 <  b9.System._n2; b9.System._n3++) {
        b9.System._n1 = b9.System._n1 * 37 + str.charCodeAt(b9.System._n3);
    }

    return -b9.System._n1;
};

/**
 *
 * @return {Number}
 */
b9.System.generateID = function() {
    b9.System._cur_id++;
    return b9.System._cur_id;
};

/** @private */
b9.System._cur_id = 0;

/** @private */
b9.System._n1 = 0;

/** @private */
b9.System._n2 = 0;

/** @private */
b9.System._n3 = 0;
