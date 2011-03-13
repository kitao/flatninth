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
 * @class
 *
 * @param {Number} filename_or_width
 * @param {Number} [height]
 * @param {Number} [format]
 */
b9.Texture = b9.createClass();

/**
 * @ignore
 */
b9.Texture.prototype.initialize = function(filename_or_width, height, format) {
    var that;

    this._is_loaded = false;
    this._buf_stat = new b9.BufferState();
    this._width = 0.0;
    this._height = 0.0;

    if (arguments.length === 1) {
        this._gltex = null;
        this._image = new Image();
        this._image.src = filename_or_width;

        that = this;

        this._image.onload = function() {
            that._is_loaded = true;
            that._width = that._image.width;
            that._height = that._image_height;
        };
    } else {
        // TODO
    }
};

/**
 *
 */
b9.Texture.prototype.finalize = function() {
    if (this._gltex) {
        // TODO
        this._gltex = null;
    }

    // TODO
};

/**
 *
 * @return {Boolean}
 */
b9.Texture.prototype.isLoaded = function() {
    return this._is_loaded;
};

/**
 *
 * @return {Number}
 */
b9.Texture.prototype.getWidth = function() {
    return this._width;
};

/**
 *
 * @return {Number}
 */
b9.Texture.prototype.getHeight = function() {
    return this._height;
};

/**
 *
 * @param {Number} left
 * @param {Number} top
 * @param {Number} width
 * @param {Number} height
 */
b9.Texture.prototype.updateTexture = function(left, top, width, height) {
    // TODO
};

b9.Texture.prototype._setup = function(shader) {
    var gl = b9.System._gl;

    if (this._is_loaded) {
        if (this._buf_stat.checkUpdate()) {
            this._gltex = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, this._gltex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

            this._buf_stat.finishUpdate();
        }

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._gltex);
        gl.uniform1i(shader._tex_loc_table[0], 0);
    }
};

/**
 *
 * @return {Number}
 */
b9.Texture.FORMAT_RGB = 0;

/**
 *
 * @return {Number}
 */
b9.Texture.FORMAT_RGBA = 1;

/**
 *
 * @return {Number}
 */
b9.Texture.FORMAT_ALPHA = 2;
