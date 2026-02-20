# PureText 📝

O **PureText** é uma ferramenta de higienização e formatação de texto projetada para desenvolvedores e produtores de conteúdo. Ele remove caracteres especiais e acentuações instantaneamente, oferecendo também conversão de formatos (como *kebab-case* para URLs) e contagem em tempo real de palavras e caracteres.

## 🚀 Tecnologias

* **Vue 3** (Composition API)
* **TypeScript** (Typed Logic)
* **Tailwind CSS v4** (Modern UI com tema escuro)
* **Vite** (Next Generation Frontend Tooling)
* **Vitest** (Unit Testing)

## 🏗️ Arquitetura e Boas Práticas

O **PureText** foi construído com foco em manutenibilidade e testes, aplicando rigorosos princípios de engenharia de software:

* **Domain-Driven Design (DDD):** A lógica de higienização e formatação reside no `Value Object` `SanitizedString`, isolando as regras de manipulação de strings da camada de UI.
* **Object Calisthenics:** Código limpo e declarativo, sem a utilização de blocos `else` ou múltiplos níveis de indentação.
* **Performance:** Substituição de bibliotecas de terceiros (como o antigo `clipboard.js`) pela API nativa do navegador (`navigator.clipboard`).
* **Testabilidade:** Cobertura de testes unitários com Vitest para garantir que as expressões regulares e as regras de formatação funcionem perfeitamente.

## 📦 Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
```bash
git clone [https://github.com/luizhanauer/puretext.git](https://github.com/luizhanauer/puretext.git)
```

2. Acesse a pasta do projeto:

```bash
cd puretext
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

## 🧪 Como rodar os testes

A camada de domínio possui uma suíte de testes unitários para validar a remoção de caracteres e os contadores. Para executá-los, rode:

```bash
npm run test
```

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar a aplicação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Se você gostou do meu trabalho e quer me agradecer, você pode me pagar um café :)

<a href="https://www.paypal.com/donate/?hosted_button_id=SFR785YEYHC4E" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 150px !important;" ></a>

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.
