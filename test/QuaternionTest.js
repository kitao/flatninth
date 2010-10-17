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
    var quat1 = new b9.Quaternion();
    assertTrue(quat1.x === 0.0 && quat1.y === 0.0 && quat1.z === 0.0 && quat1.w === 0.0);

    var quat2 = new b9.Quaternion(1.0, 2.0, 3.0, 4.0);
    assertTrue(quat2.x === 1.0 && quat2.y === 2.0 && quat2.z === 3.0 && quat2.w === 4.0);

    var quat3 = new b9.Quaternion(quat2);
    assertTrue(quat3.x === 1.0 && quat3.y === 2.0 && quat3.z === 3.0 && quat3.w === 4.0);

    /* set */
    assertEquals_Quaternion(new b9.Quaternion(3.0, 4.0, 5.0, 6.0), quat1.set(3.0, 4.0, 5.0, 6.0));
    assertEquals_Quaternion(quat1, quat2.set(quat1));

    /* fromMatrix */
    assertEquals_Quaternion(new b9.Quaternion(0.0, 0.0, 0.0, 1.0), quat1.fromMatrix(b9.Matrix.UNIT));

    /* slerp */
    var ratio;
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        quat1.fromMatrix(new b9.Matrix(b9.Matrix.UNIT));
        quat2.fromMatrix((new b9.Matrix(b9.Matrix.UNIT)).rotateX_int(90));
        quat3.fromMatrix((new b9.Matrix(b9.Matrix.UNIT)).rotateX_float(90.0 * ratio));
        assertEquals_Quaternion(quat3, quat1.slerp(quat2, ratio));

        quat1.fromMatrix(new b9.Matrix(b9.Matrix.UNIT));
        quat2.fromMatrix((new b9.Matrix(b9.Matrix.UNIT)).rotateY_int(90));
        quat3.fromMatrix((new b9.Matrix(b9.Matrix.UNIT)).rotateY_float(90.0 * ratio));
        assertEquals_Quaternion(quat3, quat1.slerp(quat2, ratio));

        quat1.fromMatrix(new b9.Matrix(b9.Matrix.UNIT));
        quat2.fromMatrix((new b9.Matrix(b9.Matrix.UNIT)).rotateZ_int(90));
        quat3.fromMatrix((new b9.Matrix(b9.Matrix.UNIT)).rotateZ_float(90.0 * ratio));
        assertEquals_Quaternion(quat3, quat1.slerp(quat2, ratio));
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
