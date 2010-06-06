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

/** @private */
b9.ViewManager._initialize = function() {
    /** @private */
    b9.ViewManager._view_tree = new b9.Tree(null);
};

/** @private */
b9.ViewManager._finalize = function() {
    b9.release(this._view_tree);
    this._view_tree = null;
};

/**
 *
 * @return {b9.View}
 */
b9.ViewManager.getFirstView = function() {
    var child = b9.ViewManager._view_tree.getFirstChild();
    return child ? child.getSelf() : null;
};

/**
 *
 * @return {b9.View}
 */
b9.ViewManager.getLastView = function() {
    var child = b9.ViewManager._view_tree.getLastChilde();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @param {b9.View} view hoge
 */
b9.ViewManager.addViewFirst = function(view) {
    b9.ViewManager._view_tree.addChildFirst(view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 */
b9.ViewManager.addViewLast = function(view) {
    b9.ViewManager._view_tree.addChildLast(view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 * @param {b9.View} next_view hoge
 */
b9.ViewManager.addViewBefore = function(view, next_view) {
    b9.ViewManager._view_tree.addChildBefore(view._tree, next_view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 * @param {b9.View} prev_view hoge
 */
b9.ViewManager.addViewAfter = function(view, prev_view) {
    b9.ViewManager._view_tree.addChildAfter(view._tree, prev_view._tree);
};

/**
 * hoge
 * @param {b9.View} view hoge
 */
b9.ViewManager.removeView = function(view) {
    b9.ViewManager._view_tree.removeChild(view._tree);
};

/** @private */
b9.ViewManager._render = function() {
    // TODO
};
