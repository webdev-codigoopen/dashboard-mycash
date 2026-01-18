# 🔧 Solução Rápida: Erro de Execution Policy

## ❌ Erro que você está vendo:
```
npm : O arquivo C:\Program Files\nodejs\npm.ps1 não pode ser carregado porque 
a execução de scripts foi desabilitada neste sistema.
```

## ✅ SOLUÇÃO RÁPIDA (Escolha uma):

### 🎯 Opção 1: Alterar Execution Policy (RECOMENDADO)

1. **Abra o PowerShell como Administrador:**
   - Pressione `Win + X`
   - Escolha "Terminal (Admin)" ou "PowerShell (Admin)"
   - Clique "Sim" quando pedir permissão

2. **Execute este comando:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   
3. **Digite `S` (Sim) quando perguntar**

4. **Feche o PowerShell de Administrador**

5. **Volte ao terminal normal e execute:**
   ```powershell
   cd "c:\CURSOR\Dashboard Mycash"
   npm run dev
   ```

### 🎯 Opção 2: Usar CMD (Prompt de Comando)

1. **Abra o Prompt de Comando (CMD):**
   - Pressione `Win + R`
   - Digite `cmd` e pressione Enter

2. **Navegue até o projeto:**
   ```cmd
   cd "c:\CURSOR\Dashboard Mycash"
   ```

3. **Execute:**
   ```cmd
   npm run dev
   ```

### 🎯 Opção 3: Usar Terminal do Cursor/VS Code

1. **No Cursor/VS Code, pressione `Ctrl + `` (backtick)**
   - Isso abre o terminal integrado

2. **Execute:**
   ```powershell
   npm run dev
   ```
   - O terminal integrado geralmente tem permissões diferentes

### 🎯 Opção 4: Bypass Temporário

Execute este comando no PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -Command "cd 'c:\CURSOR\Dashboard Mycash'; npm run dev"
```

---

## 📝 Explicação

O Windows bloqueia a execução de scripts PowerShell por padrão por segurança. O npm usa um script PowerShell (`npm.ps1`) para funcionar, então precisa de permissão.

A **Opção 1** é a melhor para desenvolvimento, pois:
- ✅ Permite scripts locais (como npm)
- ✅ Ainda bloqueia scripts remotos não assinados (seguro)
- ✅ Apenas afeta seu usuário (não o sistema todo)
- ✅ É permanente (não precisa fazer toda vez)

---

## 🔍 Verificar se funcionou

Depois de aplicar a Opção 1, verifique:
```powershell
Get-ExecutionPolicy
```

Deve retornar: `RemoteSigned`
