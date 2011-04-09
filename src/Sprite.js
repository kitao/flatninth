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
    var shader = b9.Preset._defaultShader.spriteTextureRGBA;

    shader._setup();

    b9.Sprite._setupCommonBuffer(this.pivotType, shader);

    if (this._isNeedToUpdate) {
        this._isNeedToUpdate = false;

        this._texCoordGLBuf = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordGLBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.texCoordData, gl.DYNAMIC_DRAW);
    }

    gl.enableVertexAttribArray(shader._texcoord_loc);
    gl.vertexAttribPointer(shader._texcoord_loc, 2, gl.FLOAT, false, 0, 0);

    b9.Matrix3D.mulArrayAs4x4(world_to_screen.getArray(), this._world.getArray(), local_to_screen.getArray());
    gl.uniformMatrix4fv(shader._local_to_screen_loc, false, local_to_screen.getArray()); // TODO

    gl.uniform4f(shader._nodeColorLoc,
            finalColorArray[0], finalColorArray[1], finalColorArray[2], finalColorArray[3]); // TODO

    gl.uniform2f(shader._sprite_scale_loc, this.width, this.height);

    for (i = 0; i < texCount; i++) {
        tex = this.textureArray[i];

        if (tex) {
            tex._setup(shader);
        }
    }

    gl.drawArrays(gl.MODE_TRIANGLE_STRIP, 0, 4);

    // teardown
    gl.disableVertexAttribArray(shader._posLoc);
    gl.disableVertexAttribArray(shader._texcoord_loc);
};

b9.Sprite._sIsNeedToUpdate = true;
b9.Sprite._sPosGLBuf = null;
b9.Sprite._sPosArray = new Array(5 * 4);
b9.Sprite._sPosData = new Array(5 * 4 * 3);

b9.Sprite._setupCommonBuffer = function(pivot_type, shader) {
    var i;
    var gl = b9.gl;
    var posArray, posData;

    if (!b9.Sprite._sIsNeedToUpdate) {
        b9.Sprite._sIsNeedToUpdate = false;

        posArray = this._sPosArray;
        posData = this._sPosData;

        for (i = 0; i < 20; i++) {
            posArray[i] = new b9.Vector3D(posData, i * 3);
        }

        // b9.Sprite.PIVOT_CENTER
        posArray[0].set(-0.5, 0.5, 0.0);
        posArray[1].set(-0.5, -0.5, 0.0);
        posArray[2].set(0.5, 0.5, 0.0);
        posArray[3].set(0.5, -0.5, 0.0);

        // b9.Sprite.PIVOT_LEFT_TOP
        posArray[4].set(0.0, 0.0, 0.0);
        posArray[5].set(0.0, -1.0, 0.0);
        posArray[6].set(1.0, 0.0, 0.0);
        posArray[7].set(1.0, -1.0, 0.0);

        // b9.Sprite.PIVOT_RIGHT_TOP
        posArray[8].set(-1.0, 0.0, 0.0);
        posArray[9].set(-1.0, -1.0, 0.0);
        posArray[10].set(0.0, 0.0, 0.0);
        posArray[11].set(0.0, -1.0, 0.0);

        // b9.Sprite.PIVOT_LEFT_BOTTOM
        posArray[12].set(0.0, 1.0, 0.0);
        posArray[13].set(0.0, 0.0, 0.0);
        posArray[14].set(1.0, 1.0, 0.0);
        posArray[15].set(1.0, 0.0, 0.0);

        // b9.Sprite.PIVOT_RIGHT_BOTTOM
        posArray[16].set(-1.0, 1.0, 0.0);
        posArray[17].set(-1.0, 0.0, 0.0);
        posArray[18].set(0.0, 1.0, 0.0);
        posArray[19].set(0.0, 0.0, 0.0);

        this._sPosGLBuf = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._sPosGLBuf);
        gl.bufferData(gl.ARRAY_BUFFER, posData, gl.DYNAMIC_DRAW);
    }

    //gl.bindBuffer(gl.ARRAY_BUFFER, this._sPosGLBuf_array[pivot_type]);
    gl.enableVertexAttribArray(shader._posLoc);
    gl.vertexAttribPointer(shader._posLoc, 3, gl.FLOAT, false, 0, 0);
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
