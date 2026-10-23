# Controle de Tarefas

Aplicação CRUD simples para cadastrar, listar, concluir e excluir tarefas.

## Tecnologias
- HTML, CSS e JavaScript no frontend
- Node.js + Express na API
- SQLite como banco de dados
- Jest para testes automatizados
- Supertest para testar os endpoints HTTP

## Requisitos
Node.js 18 ou superior e npm.

## Como executar
1. Extraia o ZIP e abra a pasta `controle-tarefas` no terminal.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
4. Abra http://localhost:3000 no navegador.

O banco `tarefas.db` e a tabela são criados automaticamente na primeira execução.

## Como executar os testes
```bash
npm test
```
Os testes usam um banco SQLite temporário em memória, separado do banco de uso normal.

## Funcionalidades
- Cadastrar tarefa com título e descrição opcional
- Listar tarefas
- Marcar/desmarcar tarefa como concluída
- Excluir tarefa

## Estrutura
```text
controle-tarefas/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── src/
│   ├── app.js
│   ├── db.js
│   ├── server.js
│   ├── taskService.js
│   └── validation.js
├── tests/
│   ├── unit/
│   │   ├── validation.test.js
│   │   └── taskService.test.js
│   └── integration/
│       └── tasks.test.js
├── package.json
└── README.md
```

## Testes incluídos
Há 10 testes: validação do título, normalização de espaços, rejeição de título vazio, criação e listagem no banco, atualização e exclusão, além de testes HTTP para listar, criar, validar entrada, atualizar e excluir tarefas.

# Guia dos arquivos do projeto Controle de Tarefas

O projeto foi desenvolvido para demonstrar como diferentes tecnologias trabalham juntas em uma aplicação web: o usuário interage com uma interface, o JavaScript envia solicitações para o servidor Node.js, o servidor processa os dados e o SQLite armazena as tarefas. O Jest e o Supertest verificam se o comportamento está correto.

# Arquivos da interface — pasta public/

Esses arquivos são responsáveis pela parte visual que o usuário acessa no navegador.

## index.html — estrutura da página

Define os elementos da interface: título, formulário para cadastrar tarefas, campo de descrição, botão de cadastro e lista de tarefas. É a estrutura da aplicação, como se fosse o esqueleto de uma página web.

## style.css — aparência visual

Define cores, fontes, espaçamentos, bordas, botões, cartões das tarefas e adaptação para telas menores. É responsável pela apresentação visual, sem controlar as regras de negócio.

## app.js — comportamento da interface

Captura os eventos do formulário, envia requisições à API, carrega as tarefas e atualiza a página após cadastrar, concluir ou excluir uma tarefa. Ele utiliza fetch() para conversar com o servidor.

# Arquivos do servidor — pasta src/

Essa pasta contém o código executado no Node.js. É onde ficam as regras para validar, processar, armazenar e consultar as tarefas.

## server.js — inicialização do servidor

É o ponto de entrada da aplicação. Cria a conexão com o banco de dados, configura a aplicação e inicia o servidor na porta 3000. É o arquivo executado pelo comando npm start.

## db.js — conexão com o banco de dados

Configura o SQLite e cria a tabela tasks caso ela ainda não exista. A tabela possui campos como id, title, description, completed e created_at.

## app.js — rotas da API

Configura o Express e define os endpoints que recebem as solicitações da interface.
- GET /api/tasks: lista tarefas.
- POST /api/tasks: cadastra uma tarefa.
- PATCH /api/tasks/:id: altera o estado de conclusão.
- DELETE /api/tasks/:id: exclui uma tarefa.

## taskService.js — operações com tarefas

Concentra as funções responsáveis por criar, listar, atualizar e excluir registros no SQLite. Separar essas operações das rotas facilita a manutenção do código e permite testar o serviço isoladamente.


## validation.js — validação dos dados

Verifica se o título foi informado, remove espaços desnecessários e impede títulos com mais de 120 caracteres. Evita que dados inválidos sejam enviados para o banco.

# Arquivos de testes — pasta tests/

Os testes automatizados verificam se as funções e a comunicação entre os componentes funcionam como esperado.

## tests/unit/validation.test.js — testes unitários da validação

Verifica individualmente funções de validação: título vazio, espaços, título válido e limite de caracteres.
 
## tests/unit/taskService.test.js — testes unitários do serviço

Verifica as operações de criação, consulta, conclusão e exclusão de tarefas, utilizando SQLite em memória.

## tests/integration/tasks.test.js — testes de integração

Utiliza Supertest para enviar requisições HTTP à API e verificar as respostas, os códigos HTTP e a persistência dos dados no banco.

# Arquivos de configuração e documentação

## package.json — configuração do projeto

Define o nome do projeto, as dependências, os scripts de execução e as configurações do Jest. É nele que estão os comandos npm start e npm test.

## package-lock.json — versões das dependências

É gerado pelo npm e registra a árvore de dependências e suas versões resolvidas para tornar as instalações mais reproduzíveis.

## .gitignore — arquivos ignorados pelo Git

Evita que itens como node_modules/, arquivos de banco de dados e resultados de cobertura sejam adicionados ao controle de versão.

## README.md — manual do projeto

Explica o objetivo da aplicação, as tecnologias, a estrutura de pastas, os comandos de instalação e execução e os testes incluídos.

## tarefas.db — banco de dados

É criado automaticamente quando o servidor inicializa. Armazena as tarefas cadastradas, seus estados e as datas de criação.