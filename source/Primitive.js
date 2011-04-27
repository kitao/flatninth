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
 * Constructs a primitive.
 *
 * @class A derived class of the b9.Node class, which draws points, lines, and polygons.
 * @extends b9.Node
 *
 * @param {b9.primitiveMode} primMode A primitive mode.
 * @param {b9.PrimitiveBuffer} primBuf A primitive buffer this primitive refers to.
 * @param {Number} [uniCount] The number of the shader uniforms. If not specified, 0 is used.
 * @param {Number} [texCount] The number of the textures. This number is must be equal to or more than 1.
 * If not specified, 1 is used.
 */
b9.Primitive = b9.createClass(b9.Node);

/**
 * @ignore
 */
b9.Primitive.prototype.initialize = function(primMode, primBuf, uniCount, texCount) {
    var i;

    this.initializeSuper();

    /**
     * The shader of this primitive.
     * @return {b9.Shader}
     */
    this.shader = null;

    /**
     *
     */
    this.uniformCount = uniCount;

    /**
     *
     */
    this.textureCount = b9.Math.max(texCount, 1);

    /**
     * Returns the primitive buffer of this primitive.
     *
     */
    this.primitiveBuffer = primBuf;

    /**
     * Sets the element index of the primitive buffer, from which this primitive draws.
     * The element index must be less than the number of the primitive buffer elements.
     * @param {Number} elem_index The element index.
     * TODO
     */
    this.elementStartIndex = 0;

    /**
     * Returns the number of elements, which this primitive draws.
     * @retrun {Number} The number of vertices.
     * TODO
     */
    this.elementCount = primBuf.elementCount;

    /**
     * Returns the primitive mode of this primitive.
     * @return {b9.primitiveMode} The primitive mode.
     * TODO
     */
    this.primitiveMode = primMode;

    /**
     * The array of the textures.
     * @return {Array}
     */
    this.textures = new Array(texCount);

    for (i = 0; i < texCount; i++) {
        this.textures[i] = null;
    }
};

/**
 * Destructs this primitive.
 */
b9.Primitive.prototype.finalize = function() {
    this.finalizeSuper();
};

b9.Primitive.prototype._draw = function(worldToScreenArray) {
    var i;
    var tex;
    var gl = b9.System.gl;

    var shader = this.shader ||
        (this.textures[0] ? b9.System._builtinShader_textureRGBA : b9.System._builtinShader_noTexture); // TODO
    var primBuf = this.primitiveBuffer;
    var finalColor = this._finalColor;
    var texCount = this.textureCount;

    var localToScreenArray = [];
    var worldArray = [];

    this._world.toArray(worldArray);

    this._setup();

    shader._bind();
    primBuf._bind(shader._vertPosLoc, shader._vertColorLoc, shader._vertTexCoordLoc);

    b9.Matrix3D.mulArray(worldToScreenArray, worldArray, localToScreenArray);
    gl.uniformMatrix4fv(shader._localToScreenLoc, false, localToScreenArray); // TODO

    gl.uniform4f(shader._nodeColorLoc, finalColor.r, finalColor.g, finalColor.b, finalColor.a);

    for (i = 0; i < texCount; i++) {
        tex = this.textures[i];

        if (tex) {
            tex._bind(shader._texLocArray);
        } else {
//            gl.activeTexture(gl.TEXTURE0);
//            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }

    if (primBuf.elementData) {
        gl.drawElements(this.primitiveMode, primBuf.elementCount, gl.UNSIGNED_SHORT, 0);
    } else {
        gl.drawArrays(this.primitiveMode, 0, primBuf.vertexCount);
    }

    primBuf._unbind(shader._vertPosLoc, shader._vertColorLoc, shader._vertTexCoordLoc);
};

/**
 * @class
 */
b9.PrimitiveMode = {
    /**
     * @constant
     * @return {Number}
     */
    POINTS: 0,

    /**
     * @constant
     * @return {Number}
     */
    LINES: 1,

    /**
     *
     * @constant
     * @return {Number}
     */
    LINE_LOOP: 2,

    /**
     *
     * @constant
     * @return {Number}
     */
    LINE_STRIP: 3,

    /**
     *
     * @constant
     * @return {Number}
     */
    TRIANGLES: 4,

    /**
     *
     * @constant
     * @return {Number}
     */
    TRIANGLE_STRIP: 5,

    /**
     * @constant
     * @return {Number}
     */
    TRIANGLE_FAN: 6
};

b9.Primitive._mat1 = new b9.Matrix3D();
