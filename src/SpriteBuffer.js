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
 * Constructs a sprite buffer.
 *
 * @class Manages parameters referenced by sprites.
 * Parameters contain the information for drawing such as a position, a size, a color, and texture coordinates.
 *
 * @param {Number} rectCount The number of the rectangles.
 * @param {Number} [attCount] The number of the shader attributes.
 */
b9.SpriteBuffer = b9.createClass();

/**
 * @ignore
 */
b9.SpriteBuffer.prototype.initialize = function(rectCount, attCount) {
    var i;
    var colorData;

    var sizeDataCount = rectCount * 2;
    var colorDataCount = rectCount * 4;
    var texCoordDataCount = rectCount * 8;

    /**
     * The number of the rectanbles. This property is read-only.
     * @return {Number}
     */
    this.rectangleCount = rectCount;

    /**
     * The number of the shader attributes. This property is read-only.
     * @return {Number}
     */
    this.attributeCount = attCount || 0;

    /**
     * The array of the size. Each unit has two values.
     * @return {Float32Array}
     */
    this.sizeData = new Float32Array(sizeDataCount);

    /**
     * The array of the colors. Each unit has four components.
     * @return {Uint8Array}
     */
    colorData = this.colorData = new Uint8Array(colorDataCount);

    for (i = 0; i < colorDataCount; i++) {
        colorData[i] = 255;
    }

    /**
     * The array of the texture coordinates. Each unit has eight coordinates.
     * @return {Float32Array}
     */
    this.texCoordData = new Float32Array(texCoordDataCount);

    // TODO: initialize attributes

    this._isNeedToUpdate = true;
    this._glColorBuf = null;
    this._glTexCoordBuf = null;
};

/**
 * Destructs this sprite buffer.
 */
b9.SpriteBuffer.prototype.finalize = function() {
    var gl = b9.gl;

    if (this._glColorBuf) {
        gl.deleteBuffer(this._glColorBuf);
        this._glColorBuf = null;
    }

    if (this._glTexCoordBuf) {
        gl.deleteBuffer(this._glTexCoordBuf);
        this._glTexCoordBuf = null;
    }

    // TODO: delete attribute buffers
};

/**
 *
 */
b9.SpriteBuffer.prototype.setSize = function(rectIndex, width, height) {
};

/**
 * Returns the color of the specified unit.
 * @param {Number} rectIndex A rectangle index.
 * @return {b9.Color} The color of the unit.
 */
b9.SpriteBuffer.prototype.getColor = function(rectIndex) {
    var index = rectIndex * 4;
    var colorData = this.colorData;

    color.r = colorData[index];
    color.g = colorData[index + 1];
    color.b = colorData[index + 2];
    color.a = colorData[index + 3];
};

/**
 * Sets the color of the specified unit.
 * @param {Number} rectIndex A rectangle index.
 * @param {b9.Color} color A color.
 */
b9.SpriteBuffer.prototype.setColor = function(rectIndex, color) {
    var index = rectIndex * 4;
    var colorData = this.colorData;

    colorData[index] = color.r;
    colorData[index + 1] = color.g;
    colorData[index + 2] = color.b;
    colorData[index + 3] = color.a;
};

b9.SpriteBuffer.prototype.getTex

/**
 * Sets the UV texture coordinates of the specified unit.
 * @param {Number} rectIndex A rectangle index.
 * @param {Number} u A U texture coordinate.
 * @param {Number} v A V texture coordinate.
 */
b9.SpriteBuffer.prototype.setTexCoord = function(rectIndex, u1, v1, u2, v2) {
    var index = rectIndex * 8;
    var texCoordData = this.texCoordData;

    texCoordData[rectIndex * 2] = u;
    texCoordData[rectIndex * 2 + 1] = v;
};

/**
 *
 * @param {Number} rectIndex A rectangle index.
 */
b9.SpriteBuffer.prototype.updateRectangle = function(rectIndex) {
    // TODO
};

/**
 *
 */
b9.SpriteBuffer.prototype.updateAll = function() {
    this._isNeedToUpdate = true;
};

/**
 * @private
 */
b9.SpriteBuffer.prototype._bind = function(vertPosLoc, vertColorLoc, vertTexCoordLoc) {
    var gl = b9.gl;

    if (this._isNeedToUpdate) {
b9.Debug.trace("update sprite buffer");
        this._isNeedToUpdate = false;

        this._glPosBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._glPosBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.posData, gl.DYNAMIC_DRAW);

        this._glColorBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._glColorBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.colorData, gl.DYNAMIC_DRAW);

        this._glTexCoordBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._glTexCoordBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.texCoordData, gl.DYNAMIC_DRAW);
    }

    gl.enableVertexAttribArray(vertPosLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._glPosBuf);
    gl.vertexAttribPointer(vertPosLoc, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vertColorLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._glColorBuf);
    gl.vertexAttribPointer(vertColorLoc, 4, gl.UNSIGNED_BYTE, false, 0, 0);

    gl.enableVertexAttribArray(vertTexCoordLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._glTexCoordBuf);
    gl.vertexAttribPointer(vertTexCoordLoc, 2, gl.FLOAT, false, 0, 0);
};

/**
 * @private
 */
b9.SpriteBuffer.prototype._unbind = function(vertPosLoc, vertColorLoc, vertTexCoordLoc) {
    var gl = b9.gl;

    gl.disableVertexAttribArray(vertPosLoc);
    gl.disableVertexAttribArray(vertColorLoc);
    gl.disableVertexAttribArray(vertTexCoordLoc);
};

