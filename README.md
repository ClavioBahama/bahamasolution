# Bahama Solution

Site institucional Bahama Solution (HTML/CSS/JS).

**Stack:** HTML · CSS · JavaScript

**Documentação:**
- [Issue de organização](https://github.com/ClavioBahama/bahamasolution/issues/1) — revisão e sugestões

---

## 0. Pré-requisitos

Navegador moderno (Chrome, Edge ou Firefox).
Opcional: Node.js (`npx serve`) ou Python para servir a pasta localmente.

## 1. Instalação e Execução

```powershell
npx serve .   # servir a pasta em `http://localhost:3000`
python -m http.server 8000   # alternativa sem Node.js — abrir `http://localhost:8000`
```

## 2. Estrutura do Projeto

```text
bahamasolution/
├── index.html        # Início
├── sobre.html        # Sobre
├── servicos.html     # Serviços
├── produtos.html     # Produtos
├── contacto.html     # Contato
├── bahama.html       # página extra
├── styles.css
├── script.js
├── fotos/
└── Logotipo.png, mpesa.png, emola.png, visa.png
```

## 3. Funcionalidades

- Site institucional com páginas Início, Sobre, Serviços, Produtos e Contato.
- Meios de pagamento exibidos: M-Pesa, eMola e Visa.
- Identidade visual com logotipos e GIFs locais.

## 4. Arquivos e pontos de entrada

- `index.html` — página inicial.
- `script.js` — interatividade.

## 5. Segurança

Projeto estático: nenhuma credencial identificada no repositório.

## 6. Problemas Comuns

Abrir os arquivos com `file://` pode bloquear CSS/JS em alguns navegadores — use um servidor local.
Nomes de arquivos com acentos ou espaços precisam de codificação de URL.

## 7. Observações (organização)

> Revisão realizada em 17/11/2026 durante a padronização dos repositórios, inspirada no README do FreelaMZ.
- Site institucional com meios de pagamento M-Pesa, eMola e Visa.
- Sugestão: adicionar README com informações de contato e deploy.

## 8. Licença

Projeto pessoal/acadêmico. Verifique a licença de templates ou bibliotecas de terceiros antes de uso comercial.

