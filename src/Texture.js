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
 * @param {b9.Texture.Format} [format] The format of a texture.
 */
b9.Texture = b9.createClass();

/**
 * @ignore
 */
b9.Texture.prototype.initialize = function(fileNameOrWidth, height, format) {
    var that;

    /**
     *
     * @type {Boolean}
     */
    this.isLoaded = false;

    /**
     *
     * @type {Number}
     */
    this.width = 0.0;

    /**
     *
     * @type {Number}
     */
    this.height = 0.0;

    this.glBufStat_ = new b9.GLBufferState();

    if (arguments.length === 1) {
        this.glTex_ = null;
        this.image_ = new Image();
        this.image_.src = fileNameOrWidth;

        that = this;

        /** @ignore */
        this.image_.onload = function() {
            that.isLoaded = true;
            that.width = that.image_.width;
            that.height = that.image_.height;
        };
    } else {
        // TODO
    }
};

/**
 *
 */
b9.Texture.prototype.finalize = function() {
    if (this.glTex_) {
        // TODO
        this.glTex_ = null;
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

b9.Texture.prototype._setup = function(shader) {
    var gl = b9.System._gl;

    if (this.isLoaded) {
        if (this.glBufStat_.checkUpdate()) {
            this.glTex_ = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, this.glTex_);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image_);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

            this.glBufStat_.finishUpdate();
        }

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.glTex_);
        gl.uniform1i(shader._tex_loc_array[0], 0);
    }
};

/**
 *
 * @enum
 */
b9.Texture.Format = {
    /**
     *
     * @const
     * @type {Number}
     */
    RGB: 0,

    /**
     *
     * @const
     * @type {Number}
     */
    RGBA: 1,

    /**
     *
     * @const
     * @type {Number}
     */
    ALPHA: 2
};
