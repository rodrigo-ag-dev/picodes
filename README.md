# Dicas de Matemática (2º ano letivo)

Pequeno site estático com dicas de matemática para o 2º ano letivo.

Conteúdo:
- `index.html` — página principal
- `styles.css` — estilos
- `script.js` — lógica e dicas

Como hospedar no Vercel

Opção A — Importar do GitHub (recomendado):
1. Crie um repositório no GitHub e envie (push) o conteúdo desta pasta.
   - No PowerShell:

```powershell
git init
git add .
git commit -m "Site de dicas de matemática"
# crie o repositório no GitHub pela interface web e copie a URL do repo
git remote add origin <URL_DO_REPO>
git push -u origin main
```

2. Acesse https://vercel.com, faça login e clique em "New Project" → "Import Git Repository" → selecione o repo.
3. Siga as opções (o projeto é estático — sem build). Clique em Deploy.

Opção B — Usar Vercel CLI (direto do computador):
1. Instale o Vercel CLI (requer Node.js):

```powershell
npm install -g vercel
```

2. Faça login:

```powershell
vercel login
```

3. Dentro da pasta do projeto (onde está `index.html`), rode:

```powershell
vercel --prod
```

Observações
- O site é estático: não há etapa de build. O Vercel detectará e hospedará como static site.
- Se quiser usar o deploy contínuo (push → deploy), conecte o repositório GitHub ao Vercel (Opção A).

Arquivo de configuração `vercel.json` (opcional) já incluído para URLs limpas.

Suporte e testes
- Abra `index.html` localmente para testar antes do deploy.
- Verifique no console do navegador se não houver erros (F12).

