# PACIF AI — Gerador de Prompts

Aplicação web em React + TypeScript + Vite que ajuda a criar prompts mais assertivos para IA usando o framework PACIF: Papel, Ação, Contexto, Intenção e Formato.

## O que é o PACIF
- Papel: quem a IA deve representar
- Ação: o que precisa ser feito
- Contexto: cenário e informações relevantes
- Intenção: objetivo final
- Formato: estrutura de saída desejada (inclui "Outros")

## Funcionalidades
- Formulário completo com os 5 campos do PACIF
- Geração automática de prompt ajustado às entradas
- Botão para copiar o prompt para a área de transferência
- Seleção de formato com opção "Outros" (permite especificar)
- Interface moderna e responsiva

## Como rodar localmente
Requisitos: Node.js 18+

```bash
npm install
npm run dev
# Abra http://localhost:5173
```

Build para produção:
```bash
npm run build
# Artefatos gerados em ./dist
```

## Estrutura
- Código principal da página: `src/pages/Home.tsx`
- Estilos globais: `src/index.css`
- Configuração do Vite: `vite.config.ts`

## Licença
Uso livre para fins educacionais e pessoais. Ajuste conforme sua necessidade. Feito com TRAE.
