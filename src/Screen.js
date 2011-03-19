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
 * @param {number} width The width of a screen.
 * @param {number} height The height of a screen.
 */
b9.Screen = b9.createClass();

/**
 * @ignore
 */
b9.Screen.prototype.initialize = function(width, height) {
    this.scrFlag_ = b9.Screen.ScreenFlag.VISIBLE;
    this.x_ = 0;
    this.y_ = 0;
    this.width_ = width;
    this.height_ = height;
    this.clearColor_ = new b9.Color(255, 0, 0, 255);
    this.focalLength_ = 1000.0;
    this.nearClipDist_ = 10.0;
    this.farClipDist_ = 100000.0;
    this.innerScaleX_ = 1.0;
    this.innerScaleY_ = 1.0;
    this.camera_ = new b9.Matrix3D(b9.Matrix3D.UNIT);
    this.camera_.getTrans().setZ(this.focalLength_);

    this.cameraToScreen_ = new b9.Matrix3D();
};

/**
 * hoge
 */
b9.Screen.prototype.finalize = function() {
    // TODO
};


/**
 * Returns whether the specified screen flag is enabled.
 * @param {b9.Screen.ScreenFlag} scrFlag A screen flag.
 * @return {boolean} true the flag is enabled; false otherwise.
 */
b9.Screen.prototype.getScreenFlag = function(scrFlag) {
    return (this.scrFlag_ & scrFlag) ? true : false;
};

/**
 * Sets the specified screen flag.
 * @param {b9.Screen.ScreenFlag} scrFlag A screen flag.
 * @param {boolean} isEnabled Whether the flag is enabled.
 */
b9.Screen.prototype.setScreenFlag = function(scrFlag, isEnabled) {
    if (isEnabled) {
        this.scrFlag_ |= scrFlag;
    } else {
        this.scrFlag_ &= ~scrFlag;
    }
};

/**
 * Returns the left position in the canvas.
 * @return {number} The left position.
 */
b9.Screen.prototype.getX = function() {
    return this.x_;
};

/**
 * Returns the top position in the canvas.
 * @return {number} The top position.
 */
b9.Screen.prototype.getY = function() {
    return this.y_;
};

/**
 * Sets the position in the canvas.
 * @param {number} x A left position.
 * @param {number} y A top position.
 */
b9.Screen.prototype.setPos = function(x, y) {
    this.x_ = x;
    this.y_ = y;
};

/**
 * Returns the width of this screen.
 * @return {number} The width of this screen.
 */
b9.Screen.prototype.getWidth = function() {
    return this.width_;
};

/**
 * Returns the height of this screen.
 * @return {number} The height of this screen.
 */
b9.Screen.prototype.getHeight = function() {
    return this.height_;
};

/**
 * Sets the size of this screen.
 * @param {number} width The width of a screen.
 * @param {number} height The height of a screen.
 */
b9.Screen.prototype.setSize = function(width, height) {
    this.width_ = width;
    this.height_ = height;
};

/**
 * Returns the clear color of this screen.
 * @return {b9.Color} The clear color.
 */
b9.Screen.prototype.getClearColor = function() {
    return this.clearColor_;
};

/**
 * Returns the focal length of this screen.
 * @return {number} The focal length.
 */
b9.Screen.prototype.getFocalLength = function() {
    return this.focalLength_;
};

/**
 * Sets the focal length of this screen.
 * @param {number} focal_length A focal length.
 */
b9.Screen.prototype.setFocalLength = function(focal_length) {
    this.focalLength_ = focal_length;
};

/**
 * Returns the near clip distance of this screen.
 * @return {number} The near clip distance.
 */
b9.Screen.prototype.getNearClipDist = function() {
    return this.nearClipDist_;
};

/**
 * Returns the far clip distance of thie screen.
 * @return {number} The far clip distance.
 */
b9.Screen.prototype.getFarClipDist = function() {
    return this.farClipDist_;
};

/**
 * Sets the clip distances of this screen.
 * @param {number} near_clip_dist A near clip distance.
 * @param {number} far_clip_dist A far clip distance.
 */
b9.Screen.prototype.setClipDist = function(near_clip_dist, far_clip_dist) {
    this.nearClipDist_ = near_clip_dist;
    this.farClipDist_ = far_clip_dist;
};

/**
 *
 * @return {number}
 */
b9.Screen.prototype.getInnerScaleX = function() {
    return this.innerScaleY_;
};

/**
 *
 * @return {number}
 */
b9.Screen.prototype.getInnerScaleY = function() {
    return this.innerScaleY_;
};

/**
 *
 * @param {number} scaleX
 * @param {number} scaleY
 */
b9.Screen.prototype.setInnerScale = function(scaleX, scaleY) {
    this.innerScaleX_ = scaleX;
    this.innerScaleY_ = scaleY;
};

/**
 * Returns the camera matrix of this screen.
 * @return {b9.Matrix3D} The camera matrix.
 */
b9.Screen.prototype.getCamera = function() {
    return this.camera_;
};

/**
 *
 * @param {b9.Node} rootNode
 */
b9.Screen.prototype.draw = function(rootNode) {
    var node;
    var gl = b9.System.getGLContext();
    var camera = this.camera_;
    var clearFlag = 0;
    var sortList = null;

    var worldToCamera = b9.Screen.mat1_;
    var worldToScreen = b9.Screen.mat2_;

    this.updateCameraToScreen_(); // TODO

    worldToCamera.set(b9.Matrix3D.UNIT).toLocal(camera);
    b9.Matrix3D.mulArrayAs4x4(
            this.cameraToScreen_.getArray(), worldToCamera.getArray(), worldToScreen.getArray());

    // gl.viewport(x, y, w, h);

    if (this.getScreenFlag(b9.Screen.ScreenFlag.CLEAR_COLOR)) {
        gl.clearColor(
                this.clearColor_.getR() / 255.0,
                this.clearColor_.getG() / 255.0,
                this.clearColor_.getB() / 255.0,
                this.clearColor_.getA() / 255.0);
        clearFlag = gl.COLOR_BUFFER_BIT;
    }

    if (this.getScreenFlag(b9.Screen.ScreenFlag.CLEAR_DEPTH)) {
        clearFlag |= gl.DEPTH_BUFFER_BIT;
    }

    if (clearFlag) {
        gl.clear(clearFlag);
    }

    for (node = rootNode; node; node = node.getNextAsList()) {
        if (node.getNodeFlag(b9.Node.FLAG_VISIBLE)) {
            if (node.getNodeFlag(b9.Node.FLAG_Z_SORT)) {
                node.sortValue_ =
                    b9.Screen.vec1_.set(node._world.getTrans()).sub(camera.getTrans()).dot(camera.getZAxis());

                node.sortNext_ = sortList;
                sortList = node;
            } else {
                node.draw_(worldToScreen);
            }
        } else {
            node = node.getLastDescendant();
        }
    }

    if (sortList) {
        sortList = b9.Screen.sortList_(sortList, null, null);

        for (node = sortList; node; node = node.sortNext_) {
            node.draw_(worldToScreen);
        }
    }
};

/**
 *
 */
b9.Screen.prototype.dump = function() {
    // TODO
};

b9.Screen.prototype.updateCameraToScreen_ = function() {
    var cameraToScreenArray = this.cameraToScreen_.getArray();
    var invSub = 1.0 / (this.farClipDist_ - this.nearClipDist_);

    cameraToScreenArray[0] = this.focalLength_ * 2.0 / this.width_;
    cameraToScreenArray[4] = 0.0;
    cameraToScreenArray[8] = 0.0;
    cameraToScreenArray[12] = 0.0;

    cameraToScreenArray[1] = 0.0;
    cameraToScreenArray[5] = this.focalLength_ * 2.0 / this.height_;
    cameraToScreenArray[9] = 0.0;
    cameraToScreenArray[13] = 0.0;

    cameraToScreenArray[2] = 0.0;
    cameraToScreenArray[6] = 0.0;
    cameraToScreenArray[10] = (this.farClipDist_ + this.nearClipDist_) * invSub;
    cameraToScreenArray[14] = 2.0 * this.farClipDist_ * this.nearClipDist_ * invSub;

    cameraToScreenArray[3] = 0.0;
    cameraToScreenArray[7] = 0.0;
    cameraToScreenArray[11] = -1.0;
    cameraToScreenArray[15] = 0.0;
};

b9.Screen.sortList_ = function(sortList, start, end) {
    var node, next;
    var center = sortList;
    var centerSortValue = center.sort_value;
    var left = null;
    var leftEnd = null;
    var right = null;
    var rightEnd = null;

    sortList = sortList.sortNext_;

    for (node = sortList; node != end; node = next) {
        next = node.sortNext_;

        if (node.sort_value <= centerSortValue) {
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
            start.sortNext_ = left;
        }

        leftEnd.sortNext_ = center;
        sortList = b9.Screen.sortList_(left, start, center);
    } else {
        if (start) {
            start.sortNext_ = center;
        }

        sortList = center;
    }

    if (right) {
        center.sortNext_ = right;
        rightEnd.sortNext_ = end;
        b9.Screen.sortList_(right, center, end);
    } else {
        center.sortNext_ = end;
    }

    return sortList;
};

/**
 * The flags which specify how to draw a screen.
 * @enum {number}
 */
b9.Screen.ScreenFlag = {
    /**
     * TODO
     */
    VISIBLE: 0x8000,

    /**
     * TODO
     */
    CLEAR_COLOR: 0x4000,

    /**
     * TODO
     */
    CLEAR_DEPTH: 0x2000
};

b9.Screen.vec1_ = new b9.Vector3D();
b9.Screen.mat1_ = new b9.Matrix3D();
b9.Screen.mat2_ = new b9.Matrix3D();
