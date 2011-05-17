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
 * @class Draws scene graph nodes. Each screen has a camera and manages its parameters.
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
     * The attribute flags of this screen.
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
     * The far clip distance of this screen.
     * @return {Number}
     */
    this.farClipDist = 100000.0;

    /**
     * TODO
     * @return {Number}
     */
    this.drawScaleX = 1.0;

    /**
     * TODO
     * @return {Number}
     */
    this.drawScaleY = 1.0;

    /**
     * The camera matrix of this screen.
     * @return {b9.Matrix3D}
     */
    this.camera = new b9.Matrix3D(b9.Matrix3D.UNIT);
    this.camera.trans.z = this.focalLength;

    this._cameraToScreenArray = [];
};

/**
 * Destructs this screen.
 */
b9.Screen.prototype.finalize = function() {
    // TODO
};

/**
 * Draws this screen to the canvas.
 * @param {b9.Node} rootNode The root node of the nodes to be drawn.
 */
b9.Screen.prototype.draw = function(rootNode) {
    var node1, node2;
    var tail, end;

    var gl = b9.System.gl;
    var ScreenFlag = b9.ScreenFlag;
    var NodeFlag = b9.NodeFlag;
    var vec1 = b9.Screen._vec1;

    var camera = this.camera;
    var worldToCamera = b9.Screen._mat1;
    var worldToCameraArray = b9.Screen._array1;
    var worldToScreenArray = b9.Screen._array2;

    var clearFlag = 0;
    var sortList = null;

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

        gl.colorMask(true, true, true, true);
    } else {
        gl.colorMask(false, false, false, false);
    }

    if (this.screenFlag & ScreenFlag.CLEAR_DEPTH) {
        clearFlag |= gl.DEPTH_BUFFER_BIT;

        gl.depthMask(true);
    } else {
        gl.depthMask(false);
    }

    if (clearFlag) {
        gl.clear(clearFlag);
    }

    for (node1 = rootNode; node1; node1 = node1.nextAsList) {
        if (node1.nodeFlag & NodeFlag.VISIBLE) {
            node1._calcWorldAndFinalColor();
        } else {
            node1 = node1.getTail();
        }
    }

    for (node1 = rootNode; node1; node1 = node1.nextAsList) {
        if (node1.nodeFlag & NodeFlag.VISIBLE) {
            if (node1.nodeFlag & NodeFlag.Z_SORT) {
                tail = node1.getTail();
                end = tail.nextAsList;

                for (node2 = node1; node2 !== end; node2 = node2.nextAsList) {
                    if (node2.nodeFlag & NodeFlag.Z_SORT) {
                        node2._sortValue = vec1.set(node2._world.trans).sub(camera.trans).dot(camera.zAxis);
                        node2._sortNext = sortList;
                        sortList = node2;
                    }
                }

                node1 = tail;
            } else {
                node1._draw(worldToScreenArray);
            }
        } else {
            node1 = node1.getTail();
        }
    }

    if (sortList) {
        sortList = b9.Screen._sortNode(sortList, null, null);

        for (node1 = sortList; node1; node1 = node1._sortNext) {
            node1._draw(worldToScreenArray);

            end = node1.getTail().nextAsList;

            for (node2 = node1.nextAsList; node2 !== end; node2 = node2.nextAsList)
            {
                if (node2.nodeFlag & NodeFlag.Z_SORT) {
                    node2 = node2.getTail();
                } else {
                    node2._draw(worldToScreenArray);
                }
            }
        }
    }
};

/**
 * TODO
 */
b9.Screen.prototype.dump = function() {
    // TODO
};

b9.Screen.prototype._updateCameraToScreen = function() {
    var c2s = this._cameraToScreenArray;
    var invSub = 1.0 / (this.farClipDist - this.nearClipDist);

    c2s[0] = this.focalLength * 2.0 / this.width;
    c2s[4] = 0.0;
    c2s[8] = 0.0;
    c2s[12] = 0.0;

    c2s[1] = 0.0;
    c2s[5] = this.focalLength * 2.0 / this.height;
    c2s[9] = 0.0;
    c2s[13] = 0.0;

    c2s[2] = 0.0;
    c2s[6] = 0.0;
    c2s[10] = (this.farClipDist + this.nearClipDist) * invSub;
    c2s[14] = 2.0 * this.farClipDist * this.nearClipDist * invSub;

    c2s[3] = 0.0;
    c2s[7] = 0.0;
    c2s[11] = -1.0;
    c2s[15] = 0.0;
};

b9.Screen._sortNode = function(sortList, prevSortList, nextSortList) {
    var node, next;

    var center = sortList;
    var centerSortValue = center._sortValue;

    var leftList = null;
    var rightList = null;

    sortList = sortList._sortNext;

    for (node = sortList; node !== nextSortList; node = next) {
        next = node._sortNext;

        if (node._sortValue <= centerSortValue) {
            node._sortNext = leftList || center;
            leftList = node;
        } else {
            node._sortNext = rightList || nextSortList;
            rightList = node;
        }
    }

    if (leftList) {
        if (prevSortList) {
            prevSortList._sortNext = leftList;
        }

        sortList = b9.Screen._sortNode(leftList, prevSortList, center);
    } else {
        if (prevSortList) {
            prevSortList._sortNext = center;
        }

        sortList = center;
    }

    if (rightList) {
        center._sortNext = rightList;

        b9.Screen._sortNode(rightList, center, nextSortList);
    } else {
        center._sortNext = nextSortList;
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
b9.Screen._array1 = [];
b9.Screen._array2 = [];
