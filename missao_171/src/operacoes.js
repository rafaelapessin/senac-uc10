
/* ======================== QUESTÃO 1 ======================== */

function calcularDesconto(valor, percentual) {
    if (valor <= 0 || percentual < 0 || percentual > 100) {
        throw new Error("Dados inválidos");
    }

    const desconto = valor * (percentual / 100);
    return valor - desconto;
}

/* ======================== QUESTÃO 2 ======================== */

function verificarAprovacao(nota) {
    if (nota < 0 || nota > 10) {
        throw new Error("Nota inválida");
    }

    if (nota >= 7) {
        return "Aprovado";
    }

    return "Reprovado";
}

/* ======================== QUESTÃO 3 ======================== */

function validarCadastro(nome, idade, email) {
    if (!nome || nome.trim() === "") {
        return false;
    }

    if (!idade || idade < 18 || idade > 100) {
        return false;
    }

    if (!email || !email.includes("@")) {
        return false;
    }

    return true;
}

/* ======================== QUESTÃO 4 ======================== */

function calcularFrete(valorCompra, distancia) {
    if (valorCompra < 0 || distancia < 0) {
        throw new Error("Valores inválidos");
    }

    if (valorCompra >= 200) {
        return 0;
    }

    return distancia * 2;
}

/* ======================== QUESTÃO 5 ======================== */

function converterCelsiusParaFahrenheit(celsius) {
    if (typeof celsius !== "number") {
        throw new Error("A temperatura deve ser numérica");
    }

    return (celsius * 9 / 5) + 32;
}

/* ======================== QUESTÃO 6 ======================== */

function calcularTotal(quantidade, precoUnitario) {
    if (quantidade < 0 || precoUnitario < 0) {
        throw new Error("Valores inválidos");
    }

    return quantidade * precoUnitario;
}

/* ======================== QUESTÃO 7 ======================== */

function validarSenha(senha) {
    if (senha.length < 8) {
        return false;
    }

    return true;
}

/* ======================== QUESTÃO 8 ======================== */

function verificarEstoque(estoque, quantidadeSolicitada) {
    if (quantidadeSolicitada <= 0) {
        throw new Error("Quantidade inválida");
    }

    if (quantidadeSolicitada > estoque) {
        return "Estoque insuficiente";
    }

    return "Pedido aprovado";
}

/* ======================== QUESTÃO 9 ======================== */

function calcularMedia(nota1, nota2) {
    if (
        nota1 < 0 ||
        nota1 > 10 ||
        nota2 < 0 ||
        nota2 > 10
    ) {
        throw new Error("Notas inválidas");
    }

    return (nota1 + nota2) / 2;
}

/* ======================== EXPORTAÇÕES ======================== */

module.exports = {
    calcularDesconto,
    verificarAprovacao,
    validarCadastro,
    calcularFrete,
    converterCelsiusParaFahrenheit,
    calcularTotal,
    validarSenha,
    verificarEstoque,
    calcularMedia
};
