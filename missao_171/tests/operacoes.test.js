
const {
    calcularDesconto,
    verificarAprovacao,
    validarCadastro,
    calcularFrete,
    converterCelsiusParaFahrenheit,
    calcularTotal,
    validarSenha,
    verificarEstoque,
    calcularMedia
} = require("../src/operacoes");


/* ======================== QUESTÃO 1 ======================== */

describe("Questão 1 - calcularDesconto", () => {

    test("deve aplicar desconto de 10%", () => {
        expect(calcularDesconto(200, 10)).toBe(180);
    });

    test("deve retornar o valor original quando o desconto for zero", () => {
        expect(calcularDesconto(150, 0)).toBe(150);
    });

    test("deve retornar zero quando o desconto for de 100%", () => {
        expect(calcularDesconto(80, 100)).toBe(0);
    });

    test("deve lançar erro quando o valor for zero", () => {
        expect(() => calcularDesconto(0, 10))
            .toThrow("Dados inválidos");
    });

    test("deve lançar erro quando o percentual for negativo", () => {
        expect(() => calcularDesconto(100, -5))
            .toThrow("Dados inválidos");
    });

    test("deve lançar erro quando o percentual for maior que 100", () => {
        expect(() => calcularDesconto(100, 101))
            .toThrow("Dados inválidos");
    });

});


/* ======================== QUESTÃO 2 ======================== */

describe("Questão 2 - verificarAprovacao", () => {

    test("deve aprovar nota igual a 7", () => {
        expect(verificarAprovacao(7)).toBe("Aprovado");
    });

    test("deve aprovar nota igual a 10", () => {
        expect(verificarAprovacao(10)).toBe("Aprovado");
    });

    test("deve reprovar nota abaixo de 7", () => {
        expect(verificarAprovacao(6)).toBe("Reprovado");
    });

    test("deve reprovar nota igual a zero", () => {
        expect(verificarAprovacao(0)).toBe("Reprovado");
    });

    test("deve lançar erro para nota negativa", () => {
        expect(() => verificarAprovacao(-1))
            .toThrow("Nota inválida");
    });

    test("deve lançar erro para nota acima de 10", () => {
        expect(() => verificarAprovacao(11))
            .toThrow("Nota inválida");
    });

});


/* ======================== QUESTÃO 3 ======================== */

describe("Questão 3 - validarCadastro", () => {

    test("deve aceitar cadastro com todos os dados válidos", () => {
        expect(validarCadastro("Ana", 25, "ana@email.com"))
            .toBe(true);
    });

    test("deve rejeitar cadastro com todos os dados inválidos", () => {
        expect(validarCadastro("", 17, "anaemail.com"))
            .toBe(false);
    });

    test("deve rejeitar nome vazio", () => {
        expect(validarCadastro("", 25, "ana@email.com"))
            .toBe(false);
    });

    test("deve rejeitar nome contendo apenas espaços", () => {
        expect(validarCadastro("   ", 25, "ana@email.com"))
            .toBe(false);
    });

    test("deve rejeitar idade zero", () => {
        expect(validarCadastro("Ana", 0, "ana@email.com"))
            .toBe(false);
    });

    test("deve rejeitar idade abaixo de 18", () => {
        expect(validarCadastro("Ana", 17, "ana@email.com"))
            .toBe(false);
    });

    test("deve rejeitar idade acima de 100", () => {
        expect(validarCadastro("Ana", 101, "ana@email.com"))
            .toBe(false);
    });

    test("deve rejeitar e-mail vazio", () => {
        expect(validarCadastro("Ana", 25, ""))
            .toBe(false);
    });

    test("deve rejeitar e-mail sem @", () => {
        expect(validarCadastro("Ana", 25, "anaemail.com"))
            .toBe(false);
    });

    test("deve aceitar idade mínima de 18 anos", () => {
        expect(validarCadastro("Ana", 18, "ana@email.com"))
            .toBe(true);
    });

    test("deve aceitar idade máxima de 100 anos", () => {
        expect(validarCadastro("Ana", 100, "ana@email.com"))
            .toBe(true);
    });

});


/* ======================== QUESTÃO 4 ======================== */

describe("Questão 4 - calcularFrete", () => {

    test("caso 1: compra de 250 deve ter frete grátis", () => {
        expect(calcularFrete(250, 10)).toBe(0);
    });

    test("caso 2: compra de 100 e distância 10", () => {
        expect(calcularFrete(100, 10)).toBe(20);
    });

    test("caso 3: compra exatamente igual a 200", () => {
        expect(calcularFrete(200, 5)).toBe(0);
    });

    test("caso 4: compra igual a zero", () => {
        expect(calcularFrete(0, 10)).toBe(20);
    });

    test("caso 5: valor de compra negativo deve lançar erro", () => {
        expect(() => calcularFrete(-50, 10))
            .toThrow("Valores inválidos");
    });

    test("caso 6: distância negativa deve lançar erro", () => {
        expect(() => calcularFrete(100, -5))
            .toThrow("Valores inválidos");
    });

});


/* ======================== QUESTÃO 5 ======================== */

describe("Questão 5 - converterCelsiusParaFahrenheit", () => {

    test("caso 1: deve converter 0 °C para 32 °F", () => {
        expect(converterCelsiusParaFahrenheit(0)).toBe(32);
    });

    test("caso 2: deve converter 100 °C para 212 °F", () => {
        expect(converterCelsiusParaFahrenheit(100)).toBe(212);
    });

    test("caso 3: deve converter -40 °C para -40 °F", () => {
        expect(converterCelsiusParaFahrenheit(-40)).toBe(-40);
    });

    test("caso 4: deve converter 25 °C para 77 °F", () => {
        expect(converterCelsiusParaFahrenheit(25)).toBe(77);
    });

    test('caso 5: deve lançar erro para a string "25"', () => {
        expect(() => converterCelsiusParaFahrenheit("25"))
            .toThrow("A temperatura deve ser numérica");
    });

    test('caso 6: deve lançar erro para a string "abc"', () => {
        expect(() => converterCelsiusParaFahrenheit("abc"))
            .toThrow("A temperatura deve ser numérica");
    });
    
});


/* ======================== QUESTÃO 6 ======================== */

describe("Questão 6 - calcularTotal", () => {

    test("teste A: deve calcular o total corretamente", () => {
        expect(calcularTotal(3, 10)).toBe(30);
    });

    test("teste B: deve retornar zero quando a quantidade for zero", () => {
        expect(calcularTotal(0, 10)).toBe(0);
    });

    test("teste C: deve lançar erro quando a quantidade for negativa", () => {
        expect(() => calcularTotal(-2, 10))
            .toThrow("Valores inválidos");
    });

    // Teste D original corrigido: o preço negativo provoca exceção.
    test("teste D corrigido: deve lançar erro para preço negativo", () => {
        expect(() => calcularTotal(2, -5))
            .toThrow("Valores inválidos");
    });

});


/* ======================== QUESTÃO 7 ======================== */

describe("Questão 7 - validarSenha", () => {

    test("teste A: deve aceitar senha com 8 caracteres", () => {
        expect(validarSenha("abc12345")).toBe(true);
    });

    test("teste B: deve rejeitar senha com menos de 8 caracteres", () => {
        expect(validarSenha("abc123")).toBe(false);
    });

    // Teste C original corrigido: a função aceita 8 ou mais caracteres.
    test("teste C corrigido: deve aceitar senha com 10 caracteres", () => {
        expect(validarSenha("abc1234567")).toBe(true);
    });

    test("teste D: deve aceitar senha com 12 caracteres", () => {
        expect(validarSenha("abc123456789")).toBe(true);
    });

});


/* ======================== QUESTÃO 8 ======================== */

describe("Questão 8 - verificarEstoque", () => {

    test("teste A: deve aprovar pedido quando há estoque suficiente", () => {
        expect(verificarEstoque(20, 5))
            .toBe("Pedido aprovado");
    });

    test("teste B: deve informar estoque insuficiente", () => {
        expect(verificarEstoque(5, 10))
            .toBe("Estoque insuficiente");
    });

    test("teste C: deve aprovar pedido com quantidade igual ao estoque", () => {
        expect(verificarEstoque(10, 10))
            .toBe("Pedido aprovado");
    });

    // Teste D original corrigido: quantidade zero é inválida.
    test("teste D corrigido: deve lançar erro para quantidade zero", () => {
        expect(() => verificarEstoque(10, 0))
            .toThrow("Quantidade inválida");
    });

    test("teste E: deve lançar erro para quantidade negativa", () => {
        expect(() => verificarEstoque(10, -2))
            .toThrow("Quantidade inválida");
    });

});


/* ======================== QUESTÃO 9 ======================== */

describe("Questão 9 - calcularMedia", () => {

    test("teste 1: deve calcular a média de 8 e 6", () => {
        expect(calcularMedia(8, 6)).toBe(7);
    });

    test("teste 2: deve retornar 10 para duas notas 10", () => {
        expect(calcularMedia(10, 10)).toBe(10);
    });

    test("teste 3: deve calcular a média de 0 e 8", () => {
        expect(calcularMedia(0, 8)).toBe(4);
    });

    // Teste 4 original corrigido: nota negativa provoca exceção.
    test("teste 4 corrigido: deve lançar erro para nota negativa", () => {
        expect(() => calcularMedia(-1, 8))
            .toThrow("Notas inválidas");
    });

    // Teste 5 original corrigido: nota acima de 10 provoca exceção.
    test("teste 5 corrigido: deve lançar erro para nota acima de 10", () => {
        expect(() => calcularMedia(5, 15))
            .toThrow("Notas inválidas");
    });

    // Três testes adicionais solicitados no enunciado.

    test("adicional 1: deve aceitar duas notas iguais a zero", () => {
        expect(calcularMedia(0, 0)).toBe(0);
    });

    test("adicional 2: deve aceitar duas notas iguais a dez", () => {
        expect(calcularMedia(10, 10)).toBe(10);
    });

    test("adicional 3: deve lançar erro para nota acima de 10", () => {
        expect(() => calcularMedia(11, 8))
            .toThrow("Notas inválidas");
    });

});
