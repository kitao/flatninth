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
 * Constructs a node.
 *
 * @class A node of a scene graph.
 * @extends b9.LinkedTree
 */
b9.Node = b9.createClass(b9.LinkedTree);

/**
 * @ignore
 */
b9.Node.prototype.initialize = function() {
    this.initializeSuper();

    /**
     *
     * @return {b9.NodeFlag}
     */
    this.nodeFlag =
        b9.NodeFlag.VISIBLE |
        b9.NodeFlag.DEPTH_TEST |
        b9.NodeFlag.WRITE_RGB |
        b9.NodeFlag.WRITE_DEPTH |
        b9.NodeFlag.BILINEAR;

    /**
     * The local matrix of this node.
     * @return {b9.Matrix3D}
     */
    this.local = new b9.Matrix3D(b9.Matrix3D.UNIT);

    /**
     * The color of this node, which applies to the children of this node and the objects managed by this node.
     * @return {b9.Color}
     */
    this.color = new b9.Color(255, 255, 255, 255);

    /**
     *
     * @return {b9.BlendMode}
     */
    this.blendMode = b9.BlendMode.OFF;

    this._world = new b9.Matrix3D();
    this._finalColor = new b9.Color();
    this._sortValue = 0.0;
    this._sortNext = null;
};

/**
 * Destructs this node. If this node has the parent, this node gets unlinked from it.
 * And all of the children of this node get unlinked.
 */
b9.Node.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 * Sets the blend mode and the flags of this node.
 * @param {b9.BlendMode} blendMode A blend mode. The node flags are also set based on the blend mode as the following:
 * <ul>
 * <li>BlendMode.OFF -> NodeFlag.Z_SORT: off, NodeFlag.WRITE_DEPTH: on</li>
 * <li>BlendMode.HALF -> NodeFlag.Z_SORT: on, NodeFlag.WRITE_DEPTH: off</li>
 * <li>BlendMode.ADD -> NodeFlag.Z_SORT: on, NodeFlag.WRITE_DEPTH: off</li>
 * <li>BlendMode.DEST_ALPHA -> NodeFlag.Z_SORT: off, NodeFlag.WRITE_DEPTH: on</li>
 * </ul>
 */
b9.Node.prototype.setBlendModeWithFlags = function(blendMode) {
    var NodeFlag = b9.NodeFlag;
    var BlendMode = b9.BlendMode;

    this.blendMode = blendMode;

    if (blendMode === BlendMode.OFF || blendMode === BlendMode.DEST_ALPHA) {
        this.nodeFlag &= ~NodeFlag.Z_SORT;
        this.nodeFlag |= NodeFlag.WRITE_DEPTH;
    } else {
        this.nodeFlag |= NodeFlag.Z_SORT;
        this.nodeFlag &= ~NodeFlag.WRITE_DEPTH;
    }
};

b9.Node.prototype._calcFinal = function() {
    var parent = this.parent;

    this._world.set(this.local);
    this._finalColor.set(this.color);

    if (parent) {
        this._world.toGlobal(parent.local);
        this._finalColor.mul(parent._finalColor);
    }
};

b9.Node.prototype._setup = function() {
    var gl = b9.System.gl;
    var NodeFlag = b9.NodeFlag;
    var BlendMode = b9.BlendMode;

    var nodeFlag = this.nodeFlag;
    var writeRGB = (nodeFlag & NodeFlag.WRITE_RGB) ? true : false;
    var blendMode = this.blendMode;

    this._calcFinal();

    gl.depthFunc((nodeFlag & NodeFlag.DEPTH_TEST) ? gl.GEQUAL : gl.ALWAYS);
    gl.colorMask(writeRGB, writeRGB, writeRGB, (nodeFlag & NodeFlag.WRITE_ALPHA) ? true : false);
    gl.depthMask((nodeFlag & NodeFlag.WRITE_DEPTH) ? true : false);

    if (nodeFlag & NodeFlag.CULL_FACE) {
        gl.enable(gl.CULL_FACE);
    } else {
        gl.disable(gl.CULL_FACE);
    }

    switch (blendMode) {
        case BlendMode.HALF:
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            break;

        case BlendMode.ADD:
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            break;

        case BlendMode.DEST_ALPHA:
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.DST_ALPHA, gl.ONE_MINUS_DST_ALPHA);
            break;

        default: // BlendMode.OFF
            gl.disable(gl.BLEND);
            break;
    }
};

b9.Node.prototype._draw = function() {
    this._calcFinal();
};

/**
 * @class The flags which specify how to draw a node.
 */
b9.NodeFlag = {
    /**
     * TODO
     */
    VISIBLE: 0x8000,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    Z_SORT: 0x4000,

    /**
     * TODO
     */
    DEPTH_TEST: 0x2000,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    WRITE_RGB: 0x1000,

    /**
     * TODO
     */
    WRITE_ALPHA: 0x0800,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    WRITE_DEPTH: 0x0400,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    CULL_FACE: 0x0200,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    BILLBOARD: 0x0100,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    BILINEAR: 0x0080
};

/**
 * @class
 */
b9.BlendMode = {
    /**
     *
     * @constant
     * @return {Number}
     */
    OFF: 0,

    /**
     *
     * @constant
     * @return {Number}
     */
    HALF: 1,

    /**
     *
     * @constant
     * @return {Number}
     */
    ADD: 2,

    /**
     *
     * @constant
     * @return {Number}
     */
    DEST_ALPHA: 3
};
