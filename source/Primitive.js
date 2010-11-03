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
 * @class
 * @extends b9.Drawable
 */
b9.Primitive = b9.createClass(b9.Drawable);

/**
 *
 * @param {b9.PrimitiveBuffer} sprt_buf
 * @param {b9.Element} [parent]
 */
b9.Primitive.prototype.initialize = function(prim_buf, parent) {
    this.initializeSuper(parent);

    this._tex = null;
    this._shd = null;
    this._prim_buf = prim_buf;
    this._vert_offset = 0;
    this._vert_count = prim_buf.getVertexCount();
};

/**
 *
 */
b9.Primitive.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 *
 * @return {b9.PrimitiveBuffer}
 */
b9.Primitive.prototype.getPrimitiveBuffer = function() {
    return this._prim_buf;
};

/**
 *
 * @return {b9.Texture}
 */
b9.Primitive.prototype.getTexture = function() {
    return this._tex;
};

/**
 *
 * @param {b9.Texture} tex
 */
b9.Primitive.prototype.setTexture = function(tex) {
    this._tex = tex;
};

/**
 *
 * @return {b9.Shader}
 */
b9.Primitive.prototype.getShader = function() {
    return this._shd;
};

/**
 *
 * @param {b9.Shader} shd
 */
b9.Primitive.prototype.setShader = function(shd) {
    this._shd = shd;
};

b9.Primitive.prototype._render = function() {
    // TODO
};

/**
 * hoge
 * @return {Number}
 */
b9.Primitive.FLAG_XXXX = 0x00800000;
