## Objetivo

Resolver o travamento ao digitar nos campos Ação, Contexto e Intenção (apenas uma letra aparece por vez) sem remover a barra de formatação.

## Causa Provável

* `onChange` dispara setState a cada tecla, provocando re-render do pai e potencial reset do `contentEditable`, gerando o flash de placeholder.

* Efeitos que escrevem em `innerHTML` durante digitação causam perda de seleção/estado do editor.

## Alterações Propostas

### 1) Tornar o editor realmente não-controlado

* Remover qualquer sincronização do DOM com `html` enquanto o editor está em foco.

* Usar apenas remount para resetar (já existe `key={editorKey}` no `Home.tsx`).

* Arquivo: `src/components/ContentEditable.tsx`

  * Remover o efeito que limpa `innerHTML` quando `html === ''` durante digitação.

  * Manter apenas a inicialização na primeira montagem.

### 2) Eliminar o debounce no envio para o estado

* Enviar `onChange` imediatamente no `RichTextEditor` (sem `setTimeout`).

* Arquivo

