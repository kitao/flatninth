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
 */
b9.System = {};

/**
 * hoge
 * @param {String} msg hoge
 */
b9.System.trace = function(msg) {
    // TODO
};

/**
 * hoge
 * @param {String} msg hoge
 */
b9.System.error = function(msg) {
    throw new Error(msg);
};

/**
 * @param {String} str hoge
 * @return {Number} hoge
 */
b9.System.toID = function(str) {
    var id = 0;
    var len = str.length;

    for (var i = 0; i < len; i++) {
        id = id * 37 - str.charCodeAt(i);
    }

    return id;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.System.generateID = function() {
    b9.System._cur_id++;
    return b9.System._cur_id;
};

/**
 * hoge
 * @param {b9.View} view hoge
 */
b9.System.addViewFirst = function(view) {
    b9.System._view_tree.addChildFirst(view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 */
b9.System.addViewLast = function(view) {
    b9.System._view_tree.addChildLast(view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 * @param {b9.View} next_view hoge
 */
b9.System.addViewBefore = function(view, next_view) {
    b9.System._view_tree.addChildBefore(view._tree, next_view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 * @param {b9.View} prev_view hoge
 */
b9.System.addViewAfter = function(view, prev_view) {
    b9.System._view_tree.addChildAfter(view._tree, prev_view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 */
b9.System.removeView = function(view) {
    b9.System._view_tree.removeChild(view._tree);
};

/** @private */
b9.System._cur_id = 0;

/** @private */
b9.System._view_tree = new b9.Tree(null);
