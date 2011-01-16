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

function testMatrix2D() {
    /* initialize */
    var mat1 = new b9.Matrix2D();
    assertTrue(
            b9.Vector2D.ZERO.equals(mat1.x_axis) &&
            b9.Vector2D.ZERO.equals(mat1.y_axis) &&
            b9.Vector2D.ZERO.equals(mat1.trans));

    var mat2 = new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, new b9.Vector2D(1.0, 2.0));
    assertTrue(
            b9.Vector2D.X_UNIT.equals(mat2.x_axis) &&
            b9.Vector2D.Y_UNIT.equals(mat2.y_axis) &&
            (new b9.Vector2D(1.0, 2.0)).equals(mat2.trans));

    var mat3 = new b9.Matrix2D(mat2);
    assertTrue(
            b9.Vector2D.X_UNIT.equals(mat3.x_axis) &&
            b9.Vector2D.Y_UNIT.equals(mat3.y_axis) &&
            (new b9.Vector2D(1.0, 2.0)).equals(mat3.trans));

    /* set */
    assertEquals_object(
            new b9.Matrix2D(b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT),
            mat1.set(b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT));
    assertEquals_object(mat1, mat2.set(mat1));

    /* orthonormalize */
    mat1.set(
            new b9.Vector2D(3.0, 0.0),
            new b9.Vector2D(0.1, -0.2),
            b9.Vector2D.X_UNIT);
    assertEquals_object(
            new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT),
            mat1.orthonormalize());

    /* rotate_float */
    mat1.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    assertEquals_object(
            new b9.Matrix2D(
                new b9.Vector2D(1.0, 0.0),
                new b9.Vector2D(0.0, 1.0),
                new b9.Vector2D(100.0, 200.0)),
            mat1.rotate_float(90.0));

    /* rotate_int */
    mat1.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    assertEquals_object(
            new b9.Matrix2D(
                new b9.Vector2D(1.0, 0.0),
                new b9.Vector2D(0.0, 1.0),
                new b9.Vector2D(100.0, 200.0)),
            mat1.rotate_int(90.0));

    /* scale */
    mat1.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    assertEquals_object(
            new b9.Matrix2D(
                new b9.Vector2D(0.0, -2.0),
                new b9.Vector2D(-3.0, 0.0),
                new b9.Vector2D(100.0, 200.0)),
            mat1.scale(2.0, -3.0));

    /* translate */
    mat1.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    assertEquals_object(
            new b9.Matrix2D(
                new b9.Vector2D(0.0, -1.0),
                new b9.Vector2D(1.0, 0.0),
                new b9.Vector2D(80.0, 190.0)),
            mat1.translate(10.0, -20.0));

    /* slerp */
    var ratio;
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        mat1.set(b9.Matrix2D.UNIT);
        mat2.set(b9.Matrix2D.UNIT).translate(2.0, 4.0).rotate_int(90);
        mat3.set(b9.Matrix2D.UNIT).translate(2.0 * ratio, 4.0 * ratio).rotate_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp(mat2, ratio));
    }

    /* slerp_noTrans */
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        mat1.set(b9.Matrix2D.UNIT).translate(1.0, 2.0);
        mat2.set(b9.Matrix2D.UNIT).translate(2.0, 4.0).rotate_int(90);
        mat3.set(b9.Matrix2D.UNIT).rotate_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp_noTrans(mat2, ratio));
    }

    /* toLocal */
    mat1.set(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, new b9.Vector2D(3.0, 4.0));
    mat2.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(1.0, 2.0));
    assertEquals_object(
            new b9.Matrix2D(
                new b9.Vector2D(0.0, 1.0),
                new b9.Vector2D(-1.0, 0.0),
                new b9.Vector2D(-2.0, 2.0)),
            mat1.toLocal(mat2));

    /* toGlobal */
    mat1.set(
            new b9.Vector2D(0.0, 1.0),
            new b9.Vector2D(-1.0, 0.0),
            new b9.Vector2D(-2.0, 2.0));
    mat2.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(1.0, 2.0));
    assertEquals_object(
            new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, new b9.Vector2D(3.0, 4.0)),
            mat1.toGlobal(mat2));

    /* toLocal_noTrans */
    mat1.set(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, new b9.Vector2D(3.0, 4.0));
    mat2.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(1.0, 2.0));
    assertEquals_object(
            new b9.Matrix2D(
                new b9.Vector2D(0.0, 1.0),
                new b9.Vector2D(-1.0, 0.0),
                new b9.Vector2D(0.0, 0.0)),
            mat1.toLocal_noTrans(mat2));

    /* toGlobal_noTrans */
    mat1.set(
            new b9.Vector2D(0.0, 1.0),
            new b9.Vector2D(-1.0, 0.0),
            new b9.Vector2D(10.0, 20.0));
    mat2.set(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(1.0, 2.0));
    assertEquals_object(
            new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.ZERO),
            mat1.toGlobal_noTrans(mat2));

    /* equals */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    assertTrue(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.x_axis.set(b9.Vector2D.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.y_axis.set(b9.Vector2D.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.trans.set(b9.Vector2D.X_UNIT);
    assertFalse(mat1.equals(mat2));

    /* toString */
    assertEquals("((1, 0), (0, 1), (0, 0))", b9.Matrix2D.UNIT.toString());

    /* UNIT */
    assertEquals_object(
            new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.ZERO),
            b9.Matrix2D.UNIT);
}
