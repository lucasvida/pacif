import { useState } from 'react';
import { Copy, Sparkles } from 'lucide-react';

interface PACIFForm {
  papel: string;
  acao: string;
  contexto: string;
  intencao: string;
  formato: string;
  formatoOutros: string;
}

export default function Home() {
  const [form, setForm] = useState<PACIFForm>({
    papel: '',
    acao: '',
    contexto: '',
    intencao: '',
    formato: '',
    formatoOutros: ''
  });

  const [promptGerado, setPromptGerado] = useState('');
  const [copiado, setCopiado] = useState(false);
  
  const handleInputChange = (campo: keyof PACIFForm, valor: string) => {
    setForm(prev => ({ ...prev, [campo]: valor }));
  };

  

  /* Removido editor Rich Text */

  const gerarPrompt = () => {
    const { papel, acao, contexto, intencao, formato, formatoOutros } = form;
    
    if (!papel || !acao || !contexto || !intencao || !formato) {
      alert('Por favor, preencha todos os campos do framework PACIF');
      return;
    }

    // Se for "Outros", usa o valor do campo formatoOutros
    const formatoFinal = formato === 'outros' ? formatoOutros : formato;
    
    if (formato === 'outros' && !formatoOutros) {
      alert('Por favor, especifique o formato desejado');
      return;
    }

    // Processa os campos para remover tags HTML para o prompt
    const processarCampo = (campo: string) => {
      // Remove tags HTML para o prompt
      return campo.replace(/<[^>]*>/g, '').trim();
    };

    const acaoProcessada = processarCampo(acao);
    const contextoProcessado = processarCampo(contexto);
    const intencaoProcessada = processarCampo(intencao);

    const prompt = `Papel: Você é ${papel}.\n\nAção: ${acaoProcessada}\n\nContexto: ${contextoProcessado}\n\nIntenção: ${intencaoProcessada}\n\nFormato: Apresente o resultado em formato de ${formatoFinal}.\n\nCom base nessas informações, por favor, desenvolva uma resposta completa e detalhada.`;
    
    setPromptGerado(prompt);
  };

  const copiarPrompt = async () => {
    if (promptGerado) {
      try {
        await navigator.clipboard.writeText(promptGerado);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
    }
  };

  const limparFormulario = () => {
    setForm({
      papel: '',
      acao: '',
      contexto: '',
      intencao: '',
      formato: '',
      formatoOutros: ''
    });
    setPromptGerado('');
    setCopiado(false);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Gerador de Prompts PACIF
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Crie prompts inteligentes e eficazes para IA usando o framework PACIF: Papel, Ação, Contexto, Intenção e Formato
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                P
              </span>
              Papel
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quem a IA vai representar?
              </label>
              <input
                type="text"
                value={form.papel}
                onChange={(e) => handleInputChange('papel', e.target.value)}
                placeholder="Ex: Analista Financeiro, Gerente de Marketing, Roteirista..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                A
              </span>
              Ação
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                O que você quer que ela faça?
              </label>
              <textarea
                value={form.acao}
                onChange={(e) => handleInputChange('acao', e.target.value)}
                placeholder="Ex: Gerar ideias para uma apresentação em slides, criar um e-mail corporativo, analisar dados..."
                rows={5}
                className="w-full min-h-[100px] max-h-[250px] p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200 overflow-y-auto resize-y"
              />

            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                C
              </span>
              Contexto
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual é a situação ou cenário?
              </label>
              <textarea
                value={form.contexto}
                onChange={(e) => handleInputChange('contexto', e.target.value)}
                placeholder="Ex: Estamos lançando um novo produto no mercado de tecnologia B2B, nosso público-alvo são empresas de médio porte..."
                rows={5}
                className="w-full min-h-[100px] max-h-[250px] p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duração-200 overflow-y-auto resize-y"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                I
              </span>
              Intenção
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual é o objetivo que você quer alcançar?
              </label>
              <textarea
                value={form.intencao}
                onChange={(e) => handleInputChange('intencao', e.target.value)}
                placeholder="Ex: Convencer a equipe a adotar um novo modelo de trabalho, aumentar as vendas em 20%, melhorar o engajamento..."
                rows={5}
                className="w-full min-h-[100px] max-h-[250px] p-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all duração-200 overflow-y-auto resize-y"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                F
              </span>
              Formato
            </h2>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual é a estrutura ou estilo desejado?
              </label>
              <select
                value={form.formato}
                onChange={(e) => handleInputChange('formato', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Selecione um formato...</option>
                <option value="texto">Texto</option>
                <option value="planilha">Planilha</option>
                <option value="gráfico">Gráfico</option>
                <option value="apresentação">Apresentação</option>
                <option value="e-mail">E-mail</option>
                <option value="relatório">Relatório</option>
                <option value="lista">Lista</option>
                <option value="roteiro">Roteiro</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            {form.formato === 'outros' && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especifique o formato desejado:
                </label>
                <textarea
                  value={form.formatoOutros}
                  onChange={(e) => handleInputChange('formatoOutros', e.target.value)}
                  placeholder="Ex: Tabela comparativa com 3 colunas, infográfico com estatísticas, vídeo script com duração de 2 minutos..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={gerarPrompt}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Gerar Prompt
              </button>
              <button
                onClick={limparFormulario}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Limpar
              </button>
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              Prompt Gerado
            </h2>
            
            {promptGerado ? (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                    {promptGerado}
                  </pre>
                </div>
                
                <button
                  onClick={copiarPrompt}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                    copiado 
                      ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                      : 'bg-purple-100 text-purple-700 border-2 border-purple-300 hover:bg-purple-200'
                  }`}
                >
                  <Copy className="w-5 h-5" />
                  {copiado ? 'Prompt Copiado!' : 'Copiar Prompt'}
                </button>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-12 h-12 text-purple-600" />
                </div>
                <p className="text-gray-500 text-lg">
                  Preencha o formulário PACIF e clique em "Gerar Prompt" para criar seu prompt personalizado
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Framework PACIF: Uma metodologia poderosa para criar prompts mais inteligentes e eficazes | Lucas Vida - feito com TRAE
          </p>
        </div>
      </div>
    </div>
  );
}
