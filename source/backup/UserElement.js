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
 * @class hoge
 * @extends b9.Element
 */
b9.UserElement = b9.createClass(b9.Element);

/**
 * hoge
 * @param {Function} render_func hoge
 * @param {b9.Element} [parent] hoge
 */
b9.UserElement.prototype.initialize = function(render_func, parent) {
    this.initializeSuper(parent);
    this._elem_type = b9.Element.TYPE_USER;

    this._render_func = render_func;
};

/**
 * hoge
 */
b9.UserElement.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 * hoge
 * @return {Function} hoge
 */
b9.UserElement.prototype.getRenderFunc = function() {
    return this._render_func;
};

/**
 * hoge
 * @param {Function} hoge
 */
b9.UserElement.prototype.setRenderFunc = function(render_func) {
    this._render_func = render_func;
};

b9.UserElement.prototype._render = function(canvas) {
    this._calcFinal();

    if (this._render_func) {
        this._render_func(canvas, world, final_filter_color);
    }
};
