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
    var mat1 = new b9.Matrix();
    assertTrue(
            b9.Vector.ZERO.equals(mat1.x_axis) &&
            b9.Vector.ZERO.equals(mat1.y_axis) &&
            b9.Vector.ZERO.equals(mat1.z_axis) &&
            b9.Vector.ZERO.equals(mat1.trans));

    var mat2 = new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.Z_UNIT, new b9.Vector(1.0, 2.0));
    assertTrue(
            b9.Vector.X_UNIT.equals(mat2.x_axis) &&
            b9.Vector.Y_UNIT.equals(mat2.y_axis) &&
            b9.Vector.Z_UNIT.equals(mat2.z_axis) &&
            (new b9.Vector(1.0, 2.0)).equals(mat2.trans));

    var mat3 = new b9.Matrix(mat2);
    assertTrue(
            b9.Vector.X_UNIT.equals(mat3.x_axis) &&
            b9.Vector.Y_UNIT.equals(mat3.y_axis) &&
            b9.Vector.Z_UNIT.equals(mat3.z_axis) &&
            (new b9.Vector(1.0, 2.0)).equals(mat3.trans));

    /* set */
    assertEquals_Matrix(
            new b9.Matrix(b9.Vector.Y_UNIT, b9.Vector.Z_UNIT, b9.Vector.X_UNIT, b9.Vector.Y_UNIT),
            mat1.set(b9.Vector.Y_UNIT, b9.Vector.Z_UNIT, b9.Vector.X_UNIT, b9.Vector.Y_UNIT));
    assertEquals_Matrix(mat1, mat2.set(mat1));

    /* fromQuaternion */
    // TODO

    /* orthonormalize */
    mat1.set(
            new b9.Vector(0.1, 0.2, 0.3),
            new b9.Vector(0.0, 3.0, 3.0),
            new b9.Vector(0.0, 0.0, 0.1),
            b9.Vector.X_UNIT);
    assertEquals_Matrix(
            new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.Z_UNIT, b9.Vector.X_UNIT),
            mat1.orthonormalize());

    /* rotateX_float */
    mat1.set(
            new b9.Vector(0.0, 0.0, -1.0),
            new b9.Vector(-1.0, 0.0, 0.0),
            new b9.Vector(0.0, 1.0, 0.0),
            new b9.Vector(100.0, 200.0, 300.0));
    assertEquals_Matrix(
            new b9.Matrix(
                new b9.Vector(0.0, 0.0, -1.0),
                new b9.Vector(0.0, 1.0, 0.0),
                new b9.Vector(1.0, 0.0, 0.0),
                new b9.Vector(100.0, 200.0, 300.0)),
            mat1.rotateX_float(90.0));

    /* rotateY_float */
    mat1.set(
            new b9.Vector(0.0, 0.0, -1.0),
            new b9.Vector(-1.0, 0.0, 0.0),
            new b9.Vector(0.0, 1.0, 0.0),
            new b9.Vector(100.0, 200.0, 300.0));
    assertEquals_Matrix(
            new b9.Matrix(
                new b9.Vector(0.0, -1.0, 0.0),
                new b9.Vector(-1.0, 0.0, 0.0),
                new b9.Vector(0.0, 0.0, -1.0),
                new b9.Vector(100.0, 200.0, 300.0)),
            mat1.rotateY_float(90.0));

    /* rotateZ_float */
    mat1.set(
            new b9.Vector(0.0, 0.0, -1.0),
            new b9.Vector(-1.0, 0.0, 0.0),
            new b9.Vector(0.0, 1.0, 0.0),
            new b9.Vector(100.0, 200.0, 300.0));
    assertEquals_Matrix(
            new b9.Matrix(
                new b9.Vector(-1.0, 0.0, 0.0),
                new b9.Vector(0.0, 0.0, 1.0),
                new b9.Vector(0.0, 1.0, 0.0),
                new b9.Vector(100.0, 200.0, 300.0)),
            mat1.rotateZ_float(90.0));

    /* rotateX_int */
    mat1.set(
            new b9.Vector(0.0, 0.0, -1.0),
            new b9.Vector(-1.0, 0.0, 0.0),
            new b9.Vector(0.0, 1.0, 0.0),
            new b9.Vector(100.0, 200.0, 300.0));
    assertEquals_Matrix(
            new b9.Matrix(
                new b9.Vector(0.0, 0.0, -1.0),
                new b9.Vector(0.0, 1.0, 0.0),
                new b9.Vector(1.0, 0.0, 0.0),
                new b9.Vector(100.0, 200.0, 300.0)),
            mat1.rotateX_int(90.0));

    /* rotateY_int */
    mat1.set(
            new b9.Vector(0.0, 0.0, -1.0),
            new b9.Vector(-1.0, 0.0, 0.0),
            new b9.Vector(0.0, 1.0, 0.0),
            new b9.Vector(100.0, 200.0, 300.0));
    assertEquals_Matrix(
            new b9.Matrix(
                new b9.Vector(0.0, -1.0, 0.0),
                new b9.Vector(-1.0, 0.0, 0.0),
                new b9.Vector(0.0, 0.0, -1.0),
                new b9.Vector(100.0, 200.0, 300.0)),
            mat1.rotateY_int(90.0));

    /* rotateZ_int */
    mat1.set(
            new b9.Vector(0.0, 0.0, -1.0),
            new b9.Vector(-1.0, 0.0, 0.0),
            new b9.Vector(0.0, 1.0, 0.0),
            new b9.Vector(100.0, 200.0, 300.0));
    assertEquals_Matrix(
            new b9.Matrix(
                new b9.Vector(-1.0, 0.0, 0.0),
                new b9.Vector(0.0, 0.0, 1.0),
                new b9.Vector(0.0, 1.0, 0.0),
                new b9.Vector(100.0, 200.0, 300.0)),
            mat1.rotateZ_int(90.0));

    /* scale */
//    mat1.set(new b9.Vector(0.5, 0.0), new b9.Vector(0.0, -0.25), new b9.Vector(1.0, 0.0));
//    assertEquals_Matrix(new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.X_UNIT),
//            mat1.scale(2.0, -4.0));

    /* translate */
//    mat1.set(b9.Matrix.UNIT).rotateInt(90);
//    assertEquals_Matrix(
//            new b9.Matrix(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-2.0, 1.0)),
//            mat1.translate(1.0, 2.0));

    /* slerp */
//    mat1.set(b9.Matrix.UNIT);
//    mat2.set(mat1);
//    mat2.trans.set(1.0, -1.0);
//    mat2.rotateInt(40);
//    mat3.set(mat1);
//    mat3.trans.set(0.5, -0.5);
//    mat3.rotateInt(20);
//    assertEquals_Matrix(mat3, mat1.interp(mat2, 0.5));
//
//    mat1.set(b9.Matrix.UNIT);
//    mat2.set(mat1);
//    mat2.trans.set(1.0, -1.0);
//    mat2.rotateInt(-40);
//    mat3.set(mat1);
//    mat3.trans.set(0.5, -0.5);
//    mat3.rotateInt(-20);
//    assertEquals_Matrix(mat3, mat1.interp(mat2, 0.5));

    /* slerp_noTrans */
//    mat1.set(b9.Matrix.UNIT);
//    mat2.set(mat1);
//    mat2.trans.set(1.0, 1.0);
//    mat2.rotateInt(40);
//    mat3.set(mat1);
//    mat3.rotateInt(20);
//    assertEquals_Matrix(mat3, mat1.interpNoTrans(mat2, 0.5));
//
//    mat1.set(b9.Matrix.UNIT);
//    mat2.set(mat1);
//    mat2.trans.set(1.0, 1.0);
//    mat2.rotateInt(-40);
//    mat3.set(mat1);
//    mat3.rotateInt(-20);
//    assertEquals_Matrix(mat3, mat1.interpNoTrans(mat2, 0.5));

    /* toLocal */
//    mat1.set(b9.Matrix.UNIT);
//    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
//    assertEquals_Matrix(
//            new b9.Matrix(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(2.0, -1.0)),
//            mat1.toLocal(mat2));

    /* toGlobal */
//    mat1.set(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(2.0, -1.0));
//    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
//    assertEquals_Matrix(b9.Matrix.UNIT, mat1.toGlobal(mat2));

    /* toLocal_noTrans */
//    mat1.set(b9.Matrix.UNIT);
//    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
//    assertEquals_Matrix(new b9.Matrix(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), b9.Vector.ZERO),
//            mat1.toLocalNoTrans(mat2));

    /* toGlobal_noTrans */
//    mat1.set(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(2.0, -1.0));
//    mat2.set(new b9.Vector(0.0, 1.0), new b9.Vector(-1.0, 0.0), new b9.Vector(-1.0, -2.0));
//    assertEquals_Matrix(b9.Matrix.UNIT, mat1.toGlobalNoTrans(mat2));

    /* lookAt */
//    assertEquals_Matrix(
//            new b9.Matrix(new b9.Vector(0.0, -1.0), new b9.Vector(1.0, 0.0), new b9.Vector(1.0, 2.0)),
//            mat1.lookAt(new b9.Vector(1.0, 2.0), new b9.Vector(3.0, 2.0)));

    /* equals */
    mat1.set(b9.Matrix.UNIT);
    mat2.set(mat1);
    assertTrue(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.x_axis.set(b9.Vector.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.y_axis.set(b9.Vector.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.z_axis.set(b9.Vector.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.trans.set(b9.Vector.X_UNIT);
    assertFalse(mat1.equals(mat2));

    /* toString */
    assertEquals("((1, 0, 0), (0, 1, 0), (0, 0, 1), (0, 0, 0))", b9.Matrix.UNIT.toString());

    /* UNIT */
    assertEquals_Matrix(
            new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.Z_UNIT, b9.Vector.ZERO),
            b9.Matrix.UNIT);
}
