# 🔧 Guia de Troubleshooting - mycash+

## Problema: `npm run dev` não funciona

### ✅ Verificações Básicas

1. **Verificar se está no diretório correto:**
   ```powershell
   cd "c:\CURSOR\Dashboard Mycash"
   ```

2. **Verificar se as dependências estão instaladas:**
   ```powershell
   npm install
   ```

3. **Verificar versões do Node e npm:**
   ```powershell
   node --version  # Deve ser v18 ou superior
   npm --version   # Deve ser 9 ou superior
   ```

### 🚀 Como Executar o Servidor de Desenvolvimento

1. **Abra o PowerShell ou Terminal:**
   - Pressione `Win + X` e escolha "Terminal" ou "PowerShell"
   - Ou use o terminal integrado do VS Code/Cursor

2. **Navegue até o diretório do projeto:**
   ```powershell
   cd "c:\CURSOR\Dashboard Mycash"
   ```

3. **Execute o comando:**
   ```powershell
   npm run dev
   ```

4. **Aguarde a mensagem:**
   ```
   VITE v5.x.x  ready in XXX ms
   ➜  Local:   http://localhost:5173/
   ```

5. **Abra o navegador em:**
   - http://localhost:5173/

### ⚠️ Problemas Comuns

#### 🔴 Erro: "A execução de scripts foi desabilitada neste sistema" (PSSecurityException)
**Este é o erro mais comum no Windows!**

**Erro completo:**
```
npm : O arquivo C:\Program Files\nodejs\npm.ps1 não pode ser carregado porque 
a execução de scripts foi desabilitada neste sistema.
```

**Soluções (escolha uma):**

**Opção 1: Alterar Execution Policy (Recomendado para desenvolvimento)**
```powershell
# Execute como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Depois execute novamente:
```powershell
npm run dev
```

**Opção 2: Usar CMD ao invés de PowerShell**
- Abra o **Prompt de Comando** (CMD) ao invés do PowerShell
- Navegue até o projeto: `cd "c:\CURSOR\Dashboard Mycash"`
- Execute: `npm run dev`

**Opção 3: Usar Terminal do VS Code/Cursor**
- O terminal integrado do VS Code/Cursor geralmente tem permissões diferentes
- Pressione `Ctrl + `` (backtick) para abrir o terminal integrado
- Execute: `npm run dev`

**Opção 4: Bypass temporário (apenas para esta sessão)**
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

**Verificar Execution Policy atual:**
```powershell
Get-ExecutionPolicy
```

**Valores possíveis:**
- `Restricted` - Bloqueia todos os scripts (causa o erro)
- `RemoteSigned` - Permite scripts locais e scripts remotos assinados (recomendado)
- `Unrestricted` - Permite todos os scripts (menos seguro)

#### Erro: "npm não é reconhecido"
**Solução:** Instale o Node.js de https://nodejs.org/

#### Erro: "Cannot find module"
**Solução:** Execute `npm install` para instalar as dependências

#### Erro: "Port 5173 is already in use"
**Solução:** 
- Feche outros processos usando a porta 5173
- Ou altere a porta no `vite.config.ts`:
  ```typescript
  export default defineConfig({
    server: {
      port: 5174  // Use outra porta
    }
  })
  ```

#### O servidor inicia mas não abre no navegador
**Solução:** 
- Abra manualmente: http://localhost:5173/
- Verifique se não há erros no console do terminal

#### Terminal fica "travado" após executar `npm run dev`
**Isso é normal!** O servidor de desenvolvimento fica rodando continuamente. Para parar:
- Pressione `Ctrl + C` no terminal

### 📝 Comandos Úteis

```powershell
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Verificar erros de lint
npm run lint
```

### 🔍 Verificar se o servidor está rodando

1. **Ver processos Node:**
   ```powershell
   Get-Process -Name node -ErrorAction SilentlyContinue
   ```

2. **Verificar porta 5173:**
   ```powershell
   netstat -ano | findstr :5173
   ```

### 💡 Dicas

- **Sempre execute `npm install` após clonar o repositório ou atualizar dependências**
- **Mantenha o terminal aberto enquanto o servidor está rodando**
- **Use `Ctrl + C` para parar o servidor quando necessário**
- **Se algo não funcionar, tente limpar o cache:**
  ```powershell
  npm cache clean --force
  rm -rf node_modules
  npm install
  ```
