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
 * Constructs a screen.
 *
 * @class A rendering target of scene graph nodes. Each screen has a camera and manages its parameters.
 *
 * @param {Number} width A width.
 * @param {Number} height A height.
 */
b9.Screen = b9.createClass();

/**
 * @ignore
 */
b9.Screen.prototype.initialize = function(width, height) {
    /**
     * @return {b9.ScreenFlag}
     */
    this.screenFlag = b9.ScreenFlag.VISIBLE;

    /**
     * The left position in the canvas.
     * @return {Number}
     */
    this.x = 0;

    /**
     * The top position in the canvas.
     * @return {Number}
     */
    this.y = 0;

    /**
     * The width of this screen.
     * @return {Number}
     */
    this.width = width;

    /**
     * The height of this screen.
     * @return {Number}
     */
    this.height = height;

    /**
     * The clear color of this screen.
     * @return {b9.Color}
     */
    this.clearColor = new b9.Color(255, 0, 0, 255);

    /**
     * The focal length of this screen.
     * @return {Number}
     */
    this.focalLength = 1000.0;

    /**
     * The near clip distance of this screen.
     * @return {Number}
     */
    this.nearClipDist = 10.0;

    /**
     * The far clip distance of thie screen.
     * @return {Number}
     */
    this.farClipDist = 100000.0;

    /**
     *
     * @return {Number}
     */
    this.innerScaleX = 1.0;

    /**
     *
     * @return {Number}
     */
    this.innerScaleY = 1.0;

    /**
     * The camera matrix of this screen.
     * @return {b9.Matrix3D}
     */
    this.camera = new b9.Matrix3D(b9.Matrix3D.UNIT);
    this.camera.trans.z = this.focalLength;

    this._cameraToScreenArray = [];
};

/**
 *
 */
b9.Screen.prototype.finalize = function() {
    // TODO
};

/**
 *
 * @param {b9.Node} rootNode
 */
b9.Screen.prototype.render = function(rootNode) {
    var node;
    var gl = b9.gl;
    var ScreenFlag = b9.ScreenFlag;
    var NodeFlag = b9.NodeFlag;

    var camera = this.camera;
    var clearFlag = 0;
    var sortList = null;

    var worldToCamera = b9.Screen._mat1;

    var worldToCameraArray = [];
    var worldToScreenArray = [];

    this._updateCameraToScreen(); // TODO

    worldToCamera.set(b9.Matrix3D.UNIT).toLocal(camera);
    worldToCamera.toArray(worldToCameraArray);

    b9.Matrix3D.mulArray(this._cameraToScreenArray, worldToCameraArray, worldToScreenArray);

    // gl.viewport(x, y, w, h);

    if (this.screenFlag & ScreenFlag.CLEAR_COLOR) {
        gl.clearColor(
                this.clearColor.r / 255.0,
                this.clearColor.g / 255.0,
                this.clearColor.b / 255.0,
                this.clearColor.a / 255.0);
        clearFlag = gl.COLOR_BUFFER_BIT;
    }

    if (this.screenFlag & ScreenFlag.CLEAR_DEPTH) {
        clearFlag |= gl.DEPTH_BUFFER_BIT;
    }

    if (clearFlag) {
        gl.clear(clearFlag);
    }

    for (node = rootNode; node; node = node.nextAsList) {
        if (node.nodeFlag & NodeFlag.VISIBLE) {
/*TODO            if (node.nodeFlag & NodeFlag.Z_SORT) {
                node._sortValue = b9.Screen._vec1.set(node._world.trans).sub(camera.trans).dot(camera.zAxis);

                node._sortNext = sortList;
                sortList = node;
            } else {*/
                node._draw(worldToScreenArray);
//            }
        } else {
            node = node.getLastDescendant();
        }
    }

    if (sortList) {
        sortList = b9.Screen._sortList(sortList, null, null);

        for (node = sortList; node; node = node._sortNext) {
            node._draw(worldToScreenArray);
        }
    }
};

/**
 *
 */
b9.Screen.prototype.dump = function() {
    // TODO
};

b9.Screen.prototype._updateCameraToScreen = function() {
    var array = this._cameraToScreenArray;
    var invSub = 1.0 / (this.farClipDist - this.nearClipDist);

    array[0] = this.focalLength * 2.0 / this.width;
    array[4] = 0.0;
    array[8] = 0.0;
    array[12] = 0.0;

    array[1] = 0.0;
    array[5] = this.focalLength * 2.0 / this.height;
    array[9] = 0.0;
    array[13] = 0.0;

    array[2] = 0.0;
    array[6] = 0.0;
    array[10] = (this.farClipDist + this.nearClipDist) * invSub;
    array[14] = 2.0 * this.farClipDist * this.nearClipDist * invSub;

    array[3] = 0.0;
    array[7] = 0.0;
    array[11] = -1.0;
    array[15] = 0.0;
};

b9.Screen._sortList = function(sortList, start, end) {
    var node, next;
    var center = sortList;
    var centerSortValue = center._sortValue;
    var left = null;
    var leftEnd = null;
    var right = null;
    var rightEnd = null;

    sortList = sortList._sortNext;

    for (node = sortList; node != end; node = next) {
        next = node._sortNext;

        if (node._sortValue <= centerSortValue) {
            if (!left) {
                leftEnd = node;
            }

            node.sortList = left;
            left = node;
        } else {
            if (!right) {
                rightEnd = node;
            }

            node.sortList = right;
            right = node;
        }
    }

    if (left) {
        if (start) {
            start._sortNext = left;
        }

        leftEnd._sortNext = center;
        sortList = b9.Screen._sortList(left, start, center);
    } else {
        if (start) {
            start._sortNext = center;
        }

        sortList = center;
    }

    if (right) {
        center._sortNext = right;
        rightEnd._sortNext = end;
        b9.Screen._sortList(right, center, end);
    } else {
        center._sortNext = end;
    }

    return sortList;
};

/**
 * @class The flags which specify how to draw a screen.
 */
b9.ScreenFlag = {
    /**
     * TODO
     * @constant
     * @return {Number}
     */
    VISIBLE: 0x8000,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    CLEAR_COLOR: 0x4000,

    /**
     * TODO
     * @constant
     * @return {Number}
     */
    CLEAR_DEPTH: 0x2000
};

b9.Screen._vec1 = new b9.Vector3D();
b9.Screen._mat1 = new b9.Matrix3D();
