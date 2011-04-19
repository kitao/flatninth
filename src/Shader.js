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
 * Constructs a shader.
 *
 * @class A programmable shader, consists of a vertex shader and a fragment shader,
 * which decides how the Primitive should be drawn.
 *
 * @param {String} vertCode A vertex shader code.
 * @param {String} fragCode A fragment shader code.
 * @param {Number} uniCount The number of the uniforms.
 * @param {Number} attCount The number of the attributes.
 * @param {Number} texCount The number of the textures.
 */
b9.Shader = b9.createClass();

/**
 * @ignore
 */
b9.Shader.prototype.initialize = function(vertCode, fragCode, uniCount, attCount, texCount) {
    var gl = b9.gl;

    /**
     * The number of the uniforms. This property is read-only.
     * @return {Number}
     */
    this.uniformCount = uniCount;

    /**
     * The number of the attributes. This property is read-only.
     * @return {Number}
     */
    this.attributeCount = attCount;

    /**
     * The number of the textures. This propery is read-only.
     * @return {Number}
     */
    this.textureCount = texCount;

    this._glProg = gl.createProgram();
    this._vertCode = vertCode;
    this._fragCode = fragCode;
    this._isNeedToUpdate = true;
    this._localToScreenLoc = 0;
    this._nodeColorLoc = 0;
    this._sprtScaleLoc = 0;
    this._vertPosLoc = 0;
    this._vertColorLoc = 0;
    this._vertTexCoordLoc = 0;
    this._uniLocArray = (uniCount > 0) ? [] : null;
    this._attLocArray = (attCount > 0) ? [] : null;
    this._texLocArray = (texCount > 0) ? [] : null;
};

/**
 * Destructs this shader.
 */
b9.Shader.prototype.finalize = function() {
    var gl;

    if (this._glProg) {
        gl = b9.gl;

        gl.deleteProgram(this._glProg);
        this._glProg = null;
    }
};

b9.Shader.prototype._bind = function() {
    var i;
    var glVertShd, glFragShd;
    var gl = b9.gl;

    if (this._isNeedToUpdate) {
        this._isNeedToUpdate = false;
b9.Debug.trace("update shader");

        glVertShd = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(glVertShd, this._vertCode);
        gl.compileShader(glVertShd);

        if (!gl.getShaderParameter(glVertShd, gl.COMPILE_STATUS)) {
            b9.System.error("vertex shader compile error\n\n" + gl.getShaderInfoLog(glVertShd));
        }

        glFragShd = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(glFragShd, this._fragCode);
        gl.compileShader(glFragShd);

        if (!gl.getShaderParameter(glFragShd, gl.COMPILE_STATUS)) {
            b9.System.error("fragment shader compile error\n\n" + gl.getShaderInfoLog(glFragShd));
        }

        gl.attachShader(this._glProg, glVertShd);
        gl.attachShader(this._glProg, glFragShd);
        gl.linkProgram(this._glProg);

        if (!gl.getProgramParameter(this._glProg, gl.LINK_STATUS)) {
            b9.System.error("shader link error");
        }

        gl.deleteShader(glVertShd);
        gl.deleteShader(glFragShd);

        this._localToScreenLoc = gl.getUniformLocation(this._glProg, "b9_localToScreen");
b9.Debug.trace("b9_localToScreen=" + this._localToScreenLoc);
        this._nodeColorLoc = gl.getUniformLocation(this._glProg, "b9_nodeColor");
b9.Debug.trace("b9_nodeColor=" + this._nodeColorLoc);
        this._sprtScaleLoc = gl.getUniformLocation(this._glProg, "b9_spriteScale");
b9.Debug.trace("b9_spriteScale=" + this._sprtScaleLoc);

        this._vertPosLoc = gl.getAttribLocation(this._glProg, "b9_vertexPos");
b9.Debug.trace("b9_vertexPos=" + this._vertPosLoc);
        this._vertColorLoc = gl.getAttribLocation(this._glProg, "b9_vertexColor");
b9.Debug.trace("b9_vertexColor=" + this._vertColorLoc);
        this._vertTexCoordLoc = gl.getAttribLocation(this._glProg, "b9_vertexTexCoord");
b9.Debug.trace("b9_vertexTexCoord=" + this._vertTexCoordLoc);

        if (this.uniformCount > 0) {
            for (i = 0; i < this.uniformCount; i++) {
                this._uniLocArray[i] = gl.getUniformLocation(this._glProg, "b9_uniform_" + ("0" + i).substr(-2));
            }
        }

        if (this.attributeCount > 0) {
            for (i = 0; i < this.attributeCount; i++) {
                this._attLocArray[i] = gl.getAttribLocation(this._glProg, "b9_attrib_" + ("0" + i).substr(-2));
            }
        }

        if (this.textureCount > 0) {
            for (i = 0; i < this.textureCount; i++) {
                this._texLocArray[i] = gl.getUniformLocation(this._glProg, "b9_texture_" + ("0" + i).substr(-2));
b9.Debug.trace("b9_texture_" + i + "=" + this._texLocArray[i]);
            }
        }
    }

    gl.useProgram(this._glProg);
};
