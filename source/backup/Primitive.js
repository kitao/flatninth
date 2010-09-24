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
b9.Primitive = b9.createClass(b9.Element);

/**
 * hoge
 * @param {Number} max_vert_num hoge
 * @param {b9.Element} [parent] hoge
 */
b9.Primitive.prototype.initialize = function(max_vert_num, parent) {
    this.initializeSuper(parent);
    this._elem_type = b9.Element.TYPE_PRIMITIVE;

    // TODO
};

/**
 * hoge
 */
b9.Primitive.prototype.finalize = function() {
    // TODO

    this.finalizeSuper();
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Primitive.prototype.getMaxVertNum = function() {
    // TODO
};

/**
 * hoge
 * @param {Number} max_vert_num hoge
 */
b9.Primitive.prototype.setMaxVertNum = function(max_vert_num) {
    // TODO
};

/**
 * hoge
 * @return {Number}
 */
b9.Primitive.prototype.getCurVertNum = function() {
    // TODO
};

/**
 * hoge
 * @param {Number} cur_vert_num hoge
 */
b9.Primitive.prototype.setCurVertNum = function(cur_vert_num) {
    // TODO
};

/**
 * hoge
 * @param {Number} vert_index hoge
 * @return {b9.Vector2D} hoge
 */
b9.Primitive.prototype.vertPos = function(vert_index) {
    // TODO
};

/**
 * hoge
 * @param {Number} vert_index hoge
 * @reutrn {b9.Color} hoge
 */
b9.Primitive.prototype.vertColor = function(vert_index) {
    // TODO
};

/**
 * hoge
 * @param {Number} vert_index hoge
 * @return {b9.Vector2D} hoge
 */
b9.Primitive.prototype.vertUV = function(vert_index) {
    // TODO
};

b9.Primitive.prototype._render = function(canvas_ctx) {
    // TODO
};

/**
 * @class hoge
 */
b9.Primitive.TexCoord = b9.createClass();

/**
 * hoge
 * @return {Number}
 */
b9.Primitive.TexCoord.prototype.u = 0.0;

/**
 * hoge
 * @return {Number}
 */
b9.Primitive.TexCoord.prototype.v = 0.0;

/**
 * hoge
 * @param {Number} u hoge
 * @param {Number} v hoge
 */
b9.Primitive.TexCoord.prototype.set = function(u, v) {
    this.u = u;
    this.v = v;
};
