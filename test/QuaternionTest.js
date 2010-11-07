/*
 * Copyright (c) 2009-2010 Takashi Kitao
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

function testQuaternion() {
    /* initialize */
    /* getArray */
    /* getIndex */
    /* getX */
    /* getY */
    /* getZ */
    /* getW */
    var quat1 = new b9.Quaternion();

    var array = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
    var quat2 = new b9.Quaternion(array, 4);
    assertTrue(quat2.getX() === 5.0 && quat2.getY() === 6.0 && quat2.getZ() === 7.0 && quat2.getW() === 8.0);
    assertTrue(quat2.getArray() === array && quat2.getIndex() === 4);

    var quat3 = new b9.Quaternion(1.0, 2.0, 3.0, 4.0);
    assertTrue(quat3.getX() === 1.0 && quat3.getY() === 2.0 && quat3.getZ() === 3.0 && quat3.getW() === 4.0);

    var quat4 = new b9.Quaternion(quat2);
    assertTrue(quat4.getX() === 5.0 && quat4.getY() === 6.0 && quat4.getZ() === 7.0 && quat4.getW() === 8.0);

    /* setX */
    assertEquals(10.0, quat1.setX(10.0).getX());

    /* setY */
    assertEquals(20.0, quat1.setY(20.0).getY());

    /* setZ */
    assertEquals(30.0, quat1.setZ(30.0).getZ());

    /* setW */
    assertEquals(40.0, quat1.setW(40.0).getW());

    /* set */
    assertEquals_object(new b9.Quaternion(3.0, 4.0, 5.0, 6.0), quat1.set(3.0, 4.0, 5.0, 6.0));
    assertEquals_object(quat1, quat2.set(quat1));

    /* fromMatrix3D */
    assertEquals_object(new b9.Quaternion(0.0, 0.0, 0.0, 1.0), quat1.fromMatrix3D(b9.Matrix3D.UNIT));

    /* slerp */
    var ratio;
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        quat1.fromMatrix3D(new b9.Matrix3D(b9.Matrix3D.UNIT));
        quat2.fromMatrix3D((new b9.Matrix3D(b9.Matrix3D.UNIT)).rotateX_int(90));
        quat3.fromMatrix3D((new b9.Matrix3D(b9.Matrix3D.UNIT)).rotateX_float(90.0 * ratio));
        assertEquals_object(quat3, quat1.slerp(quat2, ratio));

        quat1.fromMatrix3D(new b9.Matrix3D(b9.Matrix3D.UNIT));
        quat2.fromMatrix3D((new b9.Matrix3D(b9.Matrix3D.UNIT)).rotateY_int(90));
        quat3.fromMatrix3D((new b9.Matrix3D(b9.Matrix3D.UNIT)).rotateY_float(90.0 * ratio));
        assertEquals_object(quat3, quat1.slerp(quat2, ratio));

        quat1.fromMatrix3D(new b9.Matrix3D(b9.Matrix3D.UNIT));
        quat2.fromMatrix3D((new b9.Matrix3D(b9.Matrix3D.UNIT)).rotateZ_int(90));
        quat3.fromMatrix3D((new b9.Matrix3D(b9.Matrix3D.UNIT)).rotateZ_float(90.0 * ratio));
        assertEquals_object(quat3, quat1.slerp(quat2, ratio));
    }

    /* equals */
    quat1.set(1.0, 2.0, 3.0, 4.0);
    quat2.set(quat1);
    assertTrue(quat1.equals(quat2));

    quat2.set(1.1, 2.0, 3.0, 4.0);
    assertFalse(quat1.equals(quat2));

    quat2.set(1.0, 2.1, 3.0, 4.0);
    assertFalse(quat1.equals(quat2));

    quat2.set(1.0, 2.0, 3.1, 4.0);
    assertFalse(quat1.equals(quat2));

    quat2.set(1.0, 2.0, 3.0, 4.1);
    assertFalse(quat1.equals(quat2));

    /* toString */
    assertEquals("(1, 2, 3, 4)", (new b9.Quaternion(1.0, 2.0, 3.0, 4.0)).toString());
}
