// Importa a função 'normalizeTitle'
const {normalizeTitle} = require ('../../src/validation');

// Agrupa um bloco de testes relacionado para manter a organização
describe('Validação de tarefas', () => {

    test('Remove espaços do início e do fim do título', () => {
        expect(normalizeTitle('  Teste Unitário  ')).toBe('Teste Unitário');
    });

    test('Retorna string vazia se o título for um número', () => {
        expect(normalizeTitle(15487)).toBe('');
    });

    // Caso de teste 1: entrada nula
    // Caso de teste 2: entrada indefinida
    test('Retorna string vazia se o título for nulo', () => {
        expect(normalizeTitle(null)).toBe('');
    });

    test('Retorna string vazia se o título for indefinido', () => {
        expect(normalizeTitle(undefined)).toBe('');
    });

    // Agora faça 3 casos de teste para a função validateTaskInput()

    

    

});


