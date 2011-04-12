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
 * Constructs a primitive buffer.
 *
 * @class Manages vertices and elements referenced by primitives.
 * Vertices contain the information for drawing such as a position, a color, and texture coordinates.
 * Elements are the reference to vertices, with which a vertex can be used multiple times in a single drawing.
 *
 * @param {Number} vertCount The number of the vertices.
 * @param {Number} [elemCount] The number of the elements.
 * If not specified or zero, each vertex gets drawn in number order once.
 * @param {Number} [attCount] The number of the shader attributes.
 */
b9.PrimitiveBuffer = b9.createClass();

/**
 * @ignore
 */
b9.PrimitiveBuffer.prototype.initialize = function(vertCount, elemCount, attCount) {
    var i;
    var colorData;

    var posDataCount = vertCount * 3;
    var colorDataCount = vertCount * 4;
    var texCoordDataCount = vertCount * 2;

    /**
     * The number of the vertices. This property is read-only.
     * @return {Number}
     */
    this.vertexCount = vertCount;

    /**
     * The number of the elements. This property is read-only.
     * @return {Number}
     */
    this.elementCount = elemCount || 0;

    /**
     * The number of the shader attributes. This property is read-only.
     * @return {Number}
     */
    this.attributeCount = attCount || 0;

    /**
     * The array of the positions. Each vertex has three coordinates.
     * @return {Float32Array}
     */
    this.posData = new Float32Array(posDataCount);

    /**
     * The array of the colors. Each vertex has four components.
     * @return {Uint8Array}
     */
    colorData = this.colorData = new Uint8Array(colorDataCount);

    for (i = 0; i < colorDataCount; i++) {
        colorData[i] = 255;
    }

    /**
     * The array of the texture coordinates. Each vertex has two coordinates.
     * @return {Float32Array}
     */
    this.texCoordData = new Float32Array(texCoordDataCount);

    // TODO: initialize attributes

    /**
     * The array of the elements. Each element has one vertex index.
     * @return {Uint16Array}
     */
    this.elementData = (elemCount > 0) ? new Uint16Array(elemCount) : null;

    this._isNeedToUpdate = true;
    this._glPosBuf = null;
    this._glColorBuf = null;
    this._glTexCoordBuf = null;
    this._glElemBuf = null;
};

/**
 * Destructs this primitive buffer.
 */
b9.PrimitiveBuffer.prototype.finalize = function() {
    var gl = b9.gl;

    if (this._glPosBuf) {
        gl.deleteBuffer(this._glPosBuf);
        this._glPosBuf = null;
    }

    if (this._glColorBuf) {
        gl.deleteBuffer(this._glColorBuf);
        this._glColorBuf = null;
    }

    if (this._glTexCoordBuf) {
        gl.deleteBuffer(this._glTexCoordBuf);
        this._glTexCoordBuf = null;
    }

    // TODO: delete attribute buffers

    if (this._glElemBuf) {
        gl.deleteBuffer(this._glElemBuf);
        this._glElemBuf = null;
    }
};

/**
 * Returns the position of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {b9.Vector3D} pos The destination of the position.
 */
b9.PrimitiveBuffer.prototype.getPos = function(vertIndex, pos) {
    var index = vertIndex * 3;
    var posData = this.posData;

    pos.x = posData[index];
    pos.y = posData[index + 1];
    pos.z = posData[index + 2];
};

/**
 * Sets the position of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {b9.Vector3D} pos A position.
 */
b9.PrimitiveBuffer.prototype.setPos = function(vertIndex, pos) {
    var index = vertIndex * 3;
    var posData = this.posData;

    posData[index] = pos.x;
    posData[index + 1] = pos.y;
    posData[index + 2] = pos.z;
};

/**
 * Returns the color of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @return {b9.Color} The color of the vertex.
 */
b9.PrimitiveBuffer.prototype.getColor = function(vertIndex) {
    var index = vertIndex * 4;
    var colorData = this.colorData;

    color.r = colorData[index];
    color.g = colorData[index + 1];
    color.b = colorData[index + 2];
    color.a = colorData[index + 3];
};

/**
 * Sets the color of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {b9.Color} color A color.
 */
b9.PrimitiveBuffer.prototype.setColor = function(vertIndex, color) {
    var index = vertIndex * 4;
    var colorData = this.colorData;

    colorData[index] = color.r;
    colorData[index + 1] = color.g;
    colorData[index + 2] = color.b;
    colorData[index + 3] = color.a;
};

/**
 * Sets the UV texture coordinates of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {Number} u A U texture coordinate.
 * @param {Number} v A V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.setTexCoord = function(vertIndex, u, v) {
    var index = vertIndex * 2;
    var texCoordData = this.texCoordData;

    texCoordData[vertIndex * 2] = u;
    texCoordData[vertIndex * 2 + 1] = v;
};

/**
 * TODO
 * @param {Number} vertIndex A vertex index.
 * @param {Number} left
 * @param {Number} top
 * @param {Number} width
 * @param {Number} height
 */
b9.PrimitiveBuffer.prototype.setRectanglePos = function(vertIndex, left, top, width, height) {
    var posData = this.posData;

    posData[vertIndex] = posData[vertIndex + 3] = left;
    posData[vertIndex + 1] = posData[vertIndex + 7] = top;
    posData[vertIndex + 6] = posData[vertIndex + 9] = left + width;
    posData[vertIndex + 4] = posData[vertIndex + 10] = top - height;
    posData[vertIndex + 2] = posData[vertIndex + 5] = posData[vertIndex + 8] = posData[vertIndex + 11] = 0.0;
};

/**
 * TODO
 * @param {Number} vertIndex A vertex index.
 * @param {b9.Color} color
 */
b9.PrimitiveBuffer.prototype.setRectangleColor = function(vertIndex, color) {
    var colorData = this.colorData;

    colorData[vertIndex] = colorData[vertIndex + 4] =
        colorData[vertIndex + 8] = colorData[vertIndex + 12] = color.r;

    colorData[vertIndex + 1] = colorData[vertIndex + 5] =
        colorData[vertIndex + 9] = colorData[vertIndex + 13] = color.g;

    colorData[vertIndex + 2] = colorData[vertIndex + 6] =
        colorData[vertIndex + 10] = colorData[vertIndex + 14] = color.b;

    colorData[vertIndex + 3] = colorData[vertIndex + 7] =
        colorData[vertIndex + 11] = colorData[vertIndex + 15] = color.a;
};

/**
 * TODO
 * @param {Number} vertIndex A vertex index.
 * @param {Number} u1
 * @param {Number} v1
 * @param {Number} u2
 * @param {Number} v2
 */
b9.PrimitiveBuffer.prototype.setRectangleTexCoord = function(vertIndex, u1, v1, u2, v2) {
    var texCoordData = this.texCoordData;

    texCoordData[vertIndex] = texCoordData[vertIndex + 2] = u1;
    texCoordData[vertIndex + 1] = texCoordData[vertIndex + 5] = v1;
    texCoordData[vertIndex + 4] = texCoordData[vertIndex + 6] = u2;
    texCoordData[vertIndex + 3] = texCoordData[vertIndex + 7] = v2;
};

/**
 * Updates only the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {Number} [vertCount]
 */
b9.PrimitiveBuffer.prototype.updateVertex = function(vertIndex, vertCount) {
    // TODO
};

/**
 * Updates only the specified element.
 * @param {Number} elemIndex An element index.
 * @param {Number} [elemCount]
 */
b9.PrimitiveBuffer.prototype.updateElement = function(elemIndex, elemCount) {
    // TODO
};

/**
 * Updates all of the vertices and the elements.
 */
b9.PrimitiveBuffer.prototype.updateAll = function() {
    this._isNeedToUpdate = true;
};

b9.PrimitiveBuffer.prototype._bind = function(vertPosLoc, vertColorLoc, vertTexCoordLoc) {
    var gl = b9.gl;

    if (this._isNeedToUpdate) {
b9.Debug.trace("update primitive buffer");
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

        if (this.elementData) {
            this._glElemBuf = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glElemBuf);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.elementData, gl.DYNAMIC_DRAW);
        }
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

    if (this.elementData) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glElemBuf);
    }
};

b9.PrimitiveBuffer.prototype._unbind = function(vertPosLoc, vertColorLoc, vertTexCoordLoc) {
    var gl = b9.gl;

    gl.disableVertexAttribArray(vertPosLoc);
    gl.disableVertexAttribArray(vertColorLoc);
    gl.disableVertexAttribArray(vertTexCoordLoc);
};
