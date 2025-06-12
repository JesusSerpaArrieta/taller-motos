const { sumar, restar, multiplicar, dividir } = require("../calculadora");

describe('calculadora.js', () => {
    it('invocar suma con 1 y 1 retorna 2', () => {
        const resultado = sumar(1, 1);
        expect(resultado).toBe(2);
    });

    it('invocar suma con 2 y 3 retorna 5', () => {
        const resultado = sumar(2, 3);
        expect(resultado).toBe(5);
    });

    it('invocar suma con -5 y 3 retorna -2', () => {
        const resultado = sumar(-5, 3);
        expect(resultado).toBe(-2);
    });

    it('invocar resta con 6 y 3 retorna 3', () => {
        const resultado = restar(6, 3);
        expect(resultado).toBe(3);
    });

    it('invocar resta con 8 y 6 retorna 2', () => {
        const resultado = restar(8, 6);
        expect(resultado).toBe(2);
    });

    it('invocar resta con 10 y -3 retorna 13', () => {
        const resultado = restar(10, -3);
        expect(resultado).toBe(13);
    });

    it('invocar multiplicacion con 8 y 3 retorna 24', () => {
        const resultado = multiplicar(8, 3);
        expect(resultado).toBe(24);
    });

    it('invocar multiplicacion con 5 y 0 retorna 0', () => {
        const resultado = multiplicar(5, 0);
        expect(resultado).toBe(0);
    });

    it('invocar multiplicacion con 7 y -3 retorna -21', () => {
        const resultado = multiplicar(7, -3);
        expect(resultado).toBe(-21);
    });

    it('invocar division con 20 y 10 retorna 2', () => {
        const resultado = dividir(20, 10);
        expect(resultado).toBe(2);
    });

    it('invocar division con 10 y 2 retorna 5', () => {
        const resultado = dividir(10, 2);
        expect(resultado).toBe(5);
    });

    it('invocar division con 8 y -4 retorna -2', () => {
        const resultado = dividir(8, -4);
        expect(resultado).toBe(-2);
    });
});
