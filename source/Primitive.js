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
 *
 *
 * @class
 * @extends b9.Drawable
 *
 * @param {b9.PrimitiveBuffer} prim_buf
 */
b9.Primitive = b9.createClass(b9.Drawable);

/**
 * @ignore
 */
b9.Primitive.prototype.initialize = function(prim_buf, prim_mode) {
    this.initializeSuper();

    this._prim_buf = prim_buf;
    this._prim_mode = prim_mode;
    this._tex = null;
    this._shd = null;
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
 * @param {b9.PrimitiveBuffer} prim_buf
 */
b9.Primitive.prototype.setPrimitiveBuffer = function(prim_buf) {
    this._prim_buf = prim_buf;
};

/**
 *
 * @return {Number}
 */
b9.Primitive.prototype.getPrimitiveMode = function() {
    return this._prim_mode;
};

/**
 *
 * @param {Number} prim_mode
 */
b9.Primitive.prototype.setPrimitiveMode = function(prim_mode) {
    this._prim_mode = prim_mode;
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
    var gl = b9.System.getGLContext();

    this._calcFinal();

    b9.System.log("prim render");

    gl.disable(gl.DEPTH_TEST);
    gl.enableVertexAttribArray(0);

    b9.System._shader._setup(); //gl.useProgram(program);
    this._prim_buf._setup();

    //gl.drawElements(gl.TRIANGLES, this._prim_buf._index_count, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(this._prim_mode, this._prim_buf._index_count, gl.UNSIGNED_SHORT, 0);
};

/**
 * hoge
 * @return {Number}
 */
b9.Primitive.FLAG_XXXX = 0x00800000;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_POINTS = 0;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_LINES = 1;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_LINE_LOOP = 2;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_LINE_STRIP = 3;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_TRIANGLES = 4;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_TRIANGLE_STRIP = 5;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_TRIANGLE_FAN = 6;
