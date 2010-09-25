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
    /* xAxis */
    /* yAxis */
    /* trans */
    var mat1 = new b9.Matrix2D();
    assertTrue(b9.Vector2D.ZERO.isEqual(mat1.xAxis()) &&
            b9.Vector2D.ZERO.isEqual(mat1.yAxis()) &&
            b9.Vector2D.ZERO.isEqual(mat1.trans()));

    var mat2 = new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, new b9.Vector2D(1.0, 2.0));
    assertTrue(b9.Vector2D.X_UNIT.isEqual(mat2.xAxis()) &&
            b9.Vector2D.Y_UNIT.isEqual(mat2.yAxis()) &&
            (new b9.Vector2D(1.0, 2.0)).isEqual(mat2.trans()));

    var mat3 = new b9.Matrix2D(mat2);
    assertTrue(b9.Vector2D.X_UNIT.isEqual(mat3.xAxis()) &&
            b9.Vector2D.Y_UNIT.isEqual(mat3.yAxis()) &&
            (new b9.Vector2D(1.0, 2.0)).isEqual(mat3.trans()));

    /* set */
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT),
            mat1.set(b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT));
    assertEqualsMatrix2D(mat1, mat2.set(mat1));

    /* orthonormalize */
    mat1.set(new b9.Vector2D(0.1, 0.0), new b9.Vector2D(3.0, 3.0), b9.Vector2D.Y_UNIT);
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.Y_UNIT),
            mat1.orthonormalize());

    /* rotateFloat */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(1.0, 0.0));
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT),
            mat1.rotateFloat(90.0));

    /* rotateInt */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(1.0, 0.0));
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT),
            mat1.rotateInt(90.5));

    /* scale */
    mat1.set(new b9.Vector2D(0.5, 0.0), new b9.Vector2D(0.0, -0.25), new b9.Vector2D(1.0, 0.0));
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT),
            mat1.scale(2.0, -4.0));

    /* translate */
    mat1.set(b9.Matrix2D.UNIT).rotateInt(90);
    assertEqualsMatrix2D(
            new b9.Matrix2D(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-2.0, 1.0)),
            mat1.translate(1.0, 2.0));

    /* interp */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, -1.0);
    mat2.rotateInt(40);
    mat3.set(mat1);
    mat3.trans().set(0.5, -0.5);
    mat3.rotateInt(20);
    assertEqualsMatrix2D(mat3, mat1.interp(mat2, 0.5));

    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, -1.0);
    mat2.rotateInt(-40);
    mat3.set(mat1);
    mat3.trans().set(0.5, -0.5);
    mat3.rotateInt(-20);
    assertEqualsMatrix2D(mat3, mat1.interp(mat2, 0.5));

    /* interpNoTrans */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, 1.0);
    mat2.rotateInt(40);
    mat3.set(mat1);
    mat3.rotateInt(20);
    assertEqualsMatrix2D(mat3, mat1.interpNoTrans(mat2, 0.5));

    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, 1.0);
    mat2.rotateInt(-40);
    mat3.set(mat1);
    mat3.rotateInt(-20);
    assertEqualsMatrix2D(mat3, mat1.interpNoTrans(mat2, 0.5));

    /* toLocal */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    assertEqualsMatrix2D(
            new b9.Matrix2D(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(2.0, -1.0)),
            mat1.toLocal(mat2));

    /* toGlobal */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(2.0, -1.0));
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    assertEqualsMatrix2D(b9.Matrix2D.UNIT, mat1.toGlobal(mat2));

    /* toLocalNoTrans */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    assertEqualsMatrix2D(new b9.Matrix2D(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), b9.Vector2D.ZERO),
            mat1.toLocalNoTrans(mat2));

    /* toGlobalNoTrans */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(2.0, -1.0));
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    assertEqualsMatrix2D(b9.Matrix2D.UNIT, mat1.toGlobalNoTrans(mat2));

    /* lookAt */
    assertEqualsMatrix2D(
            new b9.Matrix2D(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(1.0, 2.0)),
            mat1.lookAt(new b9.Vector2D(1.0, 2.0), new b9.Vector2D(3.0, 2.0)));

    /* isEqual */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    assertTrue(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.xAxis().set(b9.Vector2D.ZERO);
    assertFalse(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.yAxis().set(b9.Vector2D.ZERO);
    assertFalse(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.trans().set(b9.Vector2D.X_UNIT);
    assertFalse(mat1.isEqual(mat2));

    /* toString */
    assertEquals("((1, 0), (0, 1), (0, 0))", b9.Matrix2D.UNIT.toString());

    /* ZERO */
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.ZERO, b9.Vector2D.ZERO, b9.Vector2D.ZERO), b9.Matrix2D.ZERO);

    /* UNIT */
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.ZERO), b9.Matrix2D.UNIT);
}