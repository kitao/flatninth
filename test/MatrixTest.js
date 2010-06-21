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

function testMatrix() {
    /* initialize */
    /* xAxis */
    /* yAxis */
    /* trans */
    var mat1 = new b9.Matrix();
    assertTrue(b9.Vector.ZERO.isEqual(mat1.xAxis()) &&
            b9.Vector.ZERO.isEqual(mat1.yAxis()) &&
            b9.Vector.ZERO.isEqual(mat1.trans()));

    var mat2 = new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, new b9.Vector(1.0, 2.0));
    assertTrue(b9.Vector.X_UNIT.isEqual(mat2.xAxis()) &&
            b9.Vector.Y_UNIT.isEqual(mat2.yAxis()) &&
            (new b9.Vector(1.0, 2.0)).isEqual(mat2.trans()));

    var mat3 = new b9.Matrix(mat2);
    assertTrue(b9.Vector.X_UNIT.isEqual(mat3.xAxis()) &&
            b9.Vector.Y_UNIT.isEqual(mat3.yAxis()) &&
            (new b9.Vector(1.0, 2.0)).isEqual(mat3.trans()));

    /* set */
    mat1.set(b9.Vector.Y_UNIT, b9.Vector.X_UNIT, b9.Vector.Y_UNIT);
    assertEqualsMatrix(new b9.Matrix(b9.Vector.Y_UNIT, b9.Vector.X_UNIT, b9.Vector.Y_UNIT), mat1);

    mat2.set(mat1);
    assertEqualsMatrix(mat1, mat2);

    /* orthonormalize */
    mat1.set(new b9.Vector(0.1, 0.0), new b9.Vector(3.0, 3.0), b9.Vector.Y_UNIT);
    mat1.orthonormalize();
    assertEqualsMatrix(new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.Y_UNIT), mat1);

    /* rotateFloat */
    mat1.set(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(1.0, 0.0));
    mat1.rotateFloat(90.0);
    assertEqualsMatrix(new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.X_UNIT), mat1);

    /* rotateInt */
    mat1.set(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(1.0, 0.0));
    mat1.rotateInt(90.5);
    assertEqualsMatrix(new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.X_UNIT), mat1);

    /* scale */
    mat1.set(new b9.Vector(0.5, 0.0), new b9.Vector(0.0, -0.25), new b9.Vector(1.0, 0.0));
    mat1.scale(2.0, -4.0);
    assertEqualsMatrix(new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.X_UNIT), mat1);

    /* translate */
    mat1.set(b9.Matrix.UNIT);
    mat1.rotateInt(90);
    mat1.translate(1.0, 2.0);
    assertEqualsMatrix(new b9.Matrix(
                new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-2.0, 1.0)), mat1);

    /* interp */
    mat1.set(b9.Matrix.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, -1.0);
    mat2.rotateInt(40);
    mat3.set(mat1);
    mat3.trans().set(0.5, -0.5);
    mat3.rotateInt(20);
    mat1.interp(mat2, 0.5);
    assertEqualsMatrix(mat3, mat1);

    mat1.set(b9.Matrix.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, -1.0);
    mat2.rotateInt(-40);
    mat3.set(mat1);
    mat3.trans().set(0.5, -0.5);
    mat3.rotateInt(-20);
    mat1.interp(mat2, 0.5);
    assertEqualsMatrix(mat3, mat1);

    /* interpNoTrans */
    mat1.set(b9.Matrix.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, 1.0);
    mat2.rotateInt(40);
    mat3.set(mat1);
    mat3.rotateInt(20);
    mat1.interpNoTrans(mat2, 0.5);
    assertEqualsMatrix(mat3, mat1);

    mat1.set(b9.Matrix.UNIT);
    mat2.set(mat1);
    mat2.trans().set(1.0, 1.0);
    mat2.rotateInt(-40);
    mat3.set(mat1);
    mat3.rotateInt(-20);
    mat1.interpNoTrans(mat2, 0.5);
    assertEqualsMatrix(mat3, mat1);

    /* toLocal */
    mat1.set(b9.Matrix.UNIT);
    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
    mat1.toLocal(mat2);
    assertEqualsMatrix(new b9.Matrix(
                new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(2.0, -1.0)), mat1);

    /* toGlobal */
    mat1.set(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(2.0, -1.0));
    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
    mat1.toGlobal(mat2);
    assertEqualsMatrix(b9.Matrix.UNIT, mat1);

    /* toLocalNoTrans */
    mat1.set(b9.Matrix.UNIT);
    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
    mat1.toLocalNoTrans(mat2);
    assertEqualsMatrix(new b9.Matrix(
                new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), b9.Vector.ZERO), mat1);

    /* toGlobalNoTrans */
    mat1.set(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(2.0, -1.0));
    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
    mat1.toGlobalNoTrans(mat2);
    assertEqualsMatrix(b9.Matrix.UNIT, mat1);

    /* lookAt */
    mat1.lookAt(new b9.Vector(1.0, 2.0), new b9.Vector(3.0, 2.0));
    assertEqualsMatrix(new b9.Matrix(
                new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(1.0, 2.0)), mat1);

    /* isEqual */
    mat1.set(b9.Matrix.UNIT);
    mat2.set(mat1);
    assertTrue(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.xAxis().set(b9.Vector.ZERO);
    assertFalse(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.yAxis().set(b9.Vector.ZERO);
    assertFalse(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.trans().set(b9.Vector.X_UNIT);
    assertFalse(mat1.isEqual(mat2));

    /* toString */
    assertEquals("((1, 0), (0, 1), (0, 0))", b9.Matrix.UNIT.toString());

    /* ZERO */
    assertEqualsMatrix(new b9.Matrix(b9.Vector.ZERO, b9.Vector.ZERO, b9.Vector.ZERO), b9.Matrix.ZERO);

    /* UNIT */
    assertEqualsMatrix(new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.ZERO), b9.Matrix.UNIT);
}
