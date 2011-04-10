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
 * Constructs a point sprite.
 *
 * @class A derived class of the b9.Node class, which draws TODO.
 * @extends b9.Node
 *
 * @param {Number} [uniCount] The number of the shader uniforms. If not specified, 0 is used.
 * @param {Number} [texCount] The number of the textures. This number is must be equal to or more than 1.
 * If not specified, 1 is used.
 */
b9.Sprite = b9.createClass(b9.Node);

/**
 * @ignore
 */
b9.Sprite.prototype.initialize = function(uniCount, texCount) {
    var i;

    this.initializeSuper();

    this._isNeedToUpdate = true;

    /**
     * The shader of this sprite. If null is specified, the default shader is used.
     * @return {b9.Shader}
     */
    this.shader = null;

    /**
     * The number of the shader uniforms. This property is read-only.
     * @return {Number}
     */
    this.uniformCount = uniCount;

    /**
     * The number of the textures. This property is read-only.
     * @return {Number}
     */
    this.textureCount = b9.Math.max(texCount, 1);

    /**
     *
     */
    this.pivotType = b9.Sprite.PIVOT_CENTER;

    /**
     *
     */
    this.width = b9.Sprite._DEFAULT_SPRITE_SIZE;

    /**
     *
     */
    this.height = b9.Sprite._DEFAULT_SPRITE_SIZE;

    /**
     *
     */
    this.color = new b9.Color(255, 255, 255, 255);

    /**
     *
     * @return {Array}
     */
    this.textureArray = new Array(texCount);

    for (i = 0; i < texCount; i++) {
        this.textureArray[i] = null;
    }

    /**
     *
     */
    this.texCoordData = new Float32Array(4 * 2);

    this._texCoordGLBuf = null;

    for (i = 0; i < 4; i++) {
//        this._posArray[i] = new b9.Vector3D(this._pos_data, i * 3);
    }

    this.setTexCoord(0.0, 0.0, 1.0, 1.0);
};

/**
 * Destructs this sprite.
 */
b9.Sprite.prototype.finalize = function() {
    // TODO

    this.finalizeSuper();
};

/**
 *
 * @param {Number} u1
 * @param {Number} v1
 * @param {Number} u2
 * @param {Number} v2
 */
b9.Sprite.setTexCoord = function(u1, v1, u2, v2) {
    this.texCoordData[0] = u1;
    this.texCoordData[1] = v1;

    this.texCoordData[2] = u1;
    this.texCoordData[3] = v2;

    this.texCoordData[4] = u2;
    this.texCoordData[5] = v1;

    this.texCoordData[6] = u2;
    this.texCoordData[7] = v2;
};

b9.Sprite.prototype._draw = function(world_to_screen) {
    var shader = this.shader ||
        (this.texture[0] ? b9.Preset._defaultShader.spriteTextureRGBA :
         b9.Preset._defaultShader.spriteNoTexture); // TODO

    var localToScreenArray = [];
    var worldArray = [];

    this._world.toArray(worldArray);

    shader._setup();

    b9.Sprite._bindCommonBuffer(shader);

    if (this._isNeedToUpdate) {
        this._isNeedToUpdate = false;

        this._glTexCoordBuf = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._glTexCoordBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.texCoordData, gl.DYNAMIC_DRAW);
    }

    gl.enableVertexAttribArray(shader._vertTexCoordLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._glTexCoordBuf);
    gl.vertexAttribPointer(shader._vertTexCoordLoc, 2, gl.FLOAT, false, 0, 0);

    b9.Matrix3D.mulArray(worldToScreenArray, worldArray, localToScreenArray);
    gl.uniformMatrix4fv(shader._localToScreenLoc, false, localToScreenArray); // TODO

    gl.uniform4f(shader._nodeColorLoc, finalColor.r, finalColor.g, finalColor.b, finalColor.a);
    gl.uniform2f(shader._sprtScaleLoc, this.width, this.height);

    for (i = 0; i < texCount; i++) {
        tex = this.textureArray[i];

        if (tex) {
            tex._setup(shader);
        } else {
            // TODO
        }
    }

    gl.drawArrays(gl.MODE_TRIANGLE_STRIP, this.pivotType * 12, 4);

    // teardown
    gl.disableVertexAttribArray(shader._vertPosLoc);
    gl.disableVertexAttribArray(shader._vertTexCoordLoc);
};

b9.Sprite._sIsNeedToUpdate = true;
b9.Sprite._sGLPosBuf = null;

b9.Sprite._bindCommonBuffer = function(vertPosLoc) {
    var posData;
    var setPosData;

    var gl = b9.gl;

    if (!this._sIsNeedToUpdate) {
        this._sIsNeedToUpdate = false;

        posData = new Float32Array(12 * 5);

        setPosData = function(index, offsetX, offsetY) {
            posData[index + 0] = -0.5 + offsetX;
            posData[index + 1] = 0.5 + offsetY;
            posData[index + 2] = 0.0;

            posData[index + 3] = -0.5 + offsetX;
            posData[index + 4] = -0.5 + offsetY;
            posData[index + 5] = 0.0;

            posData[index + 6] = 0.5 + offsetX;
            posData[index + 7] = 0.5 + offsetY;
            posData[index + 8] = 0.0;

            posData[index + 9] = 0.5 + offsetX;
            posData[index + 10] = -0.5 + offsetY;
            posData[index + 11] = 0.0;
        };

        // b9.Sprite.PIVOT_CENTER
        setPosData(0, 0.0, 0.0);

        // b9.Sprite.PIVOT_LEFT_TOP
        setPosData(12, 0.5, -0.5);

        // b9.Sprite.PIVOT_RIGHT_TOP
        setPosData(24, -0.5, -0.5);

        // b9.Sprite.PIVOT_LEFT_BOTTOM
        setPosData(36, 0.5, 0.5);

        // b9.Sprite.PIVOT_RIGHT_BOTTOM
        setPosData(48, -0.5, 0.5);

        this._sGLPosBuf = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._sGLPosBuf);
        gl.bufferData(gl.ARRAY_BUFFER, posData, gl.DYNAMIC_DRAW);
    }

    gl.enableVertexAttribArray(vertPosLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._sGLPosBuf);
    gl.vertexAttribPointer(vertPosLoc, 3, gl.FLOAT, false, 0, 0);
};

/**
 * @class
 */
b9.SpritePivot = {
    /**
     *
     * @constant
     * @return {Number}
     */
    CENTER: 0,

    /**
     *
     * @constant
     * @return {Number}
     */
    LEFT_TOP: 1,

    /**
     *
     * @constant
     * @return {Number}
     */
    RIGHT_TOP: 2,

    /**
     *
     * @constant
     * @return {Number}
     */
    LEFT_BOTTOM: 3,

    /**
     *
     * @constant
     * @return {Number}
     */
    RIGHT_BOTTOM: 4
};

b9.Sprite._DEFAULT_SPRITE_SIZE = 16.0;
