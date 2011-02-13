/*
 * Copyright (c) 2009-2011 Takashi Kitao
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
 *
 * @param {Number} rect_count
 */
b9.SpriteBuffer = b9.createClass();

/**
 * @ignore
 */
b9.SpriteBuffer.prototype.initialize = function(rect_count) {
    var i, j;
    var gl = b9.System.getGLContext();

    this._rect_count = rect_count;
    this._vert_count = rect_count * 4;

    this._pos_array = new Array(rect_count);
    this._pos_data = new Float32Array(vert_count * 3);
    this._pos_glbuf = gl.createBuffer();

    this._color_array = new Array(rect_count);
    this._color_data = new Uint8Array(vert_count * 4);
    this._color_glbuf = gl.createBuffer();

    this._size_data = new Float32Array((vert_count * 2);

    this._texcoord_data = new Float32Array(vert_count * 2);
    this._texcoord_glbuf = gl.createBuffer();

    for (i = 0; i < rect_count; i++) {
        this._pos_array[i] = new b9.Vector3D(this._pos_data, i * 3);
        this._pos_array[i].set(b9.Vector3D.ZERO);

        this._color_array[i] = new b9.Color(this._color_data, i * 4);
        this._color_array[i].set(255, 255, 255);

        for (j = 0; j < 8; j++) {
            this._texcoord_data[i * 2 + j] = 0.0;
        }
    }

    this._is_uploaded = false;
};

/**
 *
 */
b9.SpriteBuffer.prototype.finalize = function() {
    var gl = b9.System.getGLContext();

    gl.deleteBuffer(this._pos_glbuf);
    gl.deleteBuffer(this._color_glbuf);
    gl.deleteBuffer(this._texcoord_glbuf);
};

/**
 *
 * @return {Number}
 */
b9.SpriteBuffer.prototype.getRectangleCount = function() {
    return this._rect_count;
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 */
b9.SpriteBuffer.prototype.getPos = function(rect_index) {
    return this._pos_array[vert_index];
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 */
b9.SpriteBuffer.prototype.getWidth = function(rect_index) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 */
b9.SpriteBuffer.prototype.getHeight = function(rect_index) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 * @param {Number} width
 * @param {Number} height
 */
b9.SpriteBuffer.prototype.setSize = function(rect_index, width, height) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 */
b9.SpriteBuffer.prototype.getColor = function(rect_index) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 * @return {Number}
 */
b9.SpriteBuffer.prototype.getTexCoordU1 = function(rect_index) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 * @return {Number}
 */
b9.SpriteBuffer.prototype.getTexCoordV1 = function(rect_index) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 * @return {Number}
 */
b9.SpriteBuffer.prototype.getTexCoordU2 = function(rect_index) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 * @return {Number}
 */
b9.SpriteBuffer.prototype.getTexCoordV2 = function(rect_index) {
};

/**
 *
 * @param {Number} rect_index A rectangle index.
 * @param {Number} u1
 * @param {Number} v1
 * @param {Number} u2
 * @param {Number} v2
 */
b9.SpriteBuffer.prototype.setTexCoord = function(rect_index, u1, v1, u2, v2) {
};

/**
 *
 */
b9.PrimitiveBuffer.prototype.update = function() {
    this._is_uploaded = false;
};

b9.SpriteBuffer.prototype._setup = function() {
    // TODO
};

b9.SpriteBuffer.prototype._teardown = function() {
    // TODO
};
