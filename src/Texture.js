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
 * @param {Number} fileNameOrWidth A file name of a width.
 * @param {Number} [height] A height.
 * @param {b9.TextureFormat} [format] The format of a texture.
 */
b9.Texture = b9.createClass();

/**
 * @ignore
 */
b9.Texture.prototype.initialize = function(fileNameOrWidth, height, format) {
    var that;

    /**
     * This property is read-only.
     * @return {Boolean}
     */
    this.isLoaded = false;

    /**
     *
     * @return {Number}
     */
    this.width = 0.0;

    /**
     *
     * @return {Number}
     */
    this.height = 0.0;

    this._isNeedToUpdate = true;

    if (arguments.length === 1) {
        this._glTex = null;
        this._image = new Image();
        this._image.src = fileNameOrWidth;

        that = this;

        /** @ignore */
        this._image.onload = function() {
            that.isLoaded = true;
            that.width = that._image.width;
            that.height = that._image.height;
        };
    } else {
        // TODO
    }
};

/**
 *
 */
b9.Texture.prototype.finalize = function() {
    if (this._glTex) {
        // TODO
        this._glTex = null;
    }

    // TODO
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

b9.Texture.prototype._bind = function(shader) {
    var gl;

    if (this.isLoaded) {
        gl = b9.gl;

        if (this._isNeedToUpdate) {
b9.Debug.trace("update texture");
            this._isNeedToUpdate = false;

            this._glTex = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, this._glTex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.uniform1i(shader._texLocArray[0], 0);
    }
};

/**
 * @class
 */
b9.TextureFormat = {
    /**
     *
     * @constant
     * @return {Number}
     */
    RGB: 0,

    /**
     *
     * @constant
     * @return {Number}
     */
    RGBA: 1,

    /**
     *
     * @constant
     * @return {Number}
     */
    ALPHA: 2
};
