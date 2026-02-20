<template>
  <main class="min-h-screen bg-slate-900 text-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-500/30">
    
    <div class="max-w-6xl mx-auto space-y-10">
      
      <header class="text-center space-y-3">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          PureText
        </h1>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto">
          Higienize, remova acentos e formate strings instantaneamente.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div class="flex flex-col bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
            <label for="rawInput" class="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Texto Original
            </label>
            <div class="flex space-x-4 text-xs font-medium text-slate-500">
              <span>{{ words }} Palavras</span>
              <span>{{ chars }} Caracteres</span>
            </div>
          </div>
          
          <div class="p-6 flex-grow">
            <textarea 
              id="rawInput" 
              v-model="rawText"
              @input="processText"
              class="w-full h-72 sm:h-80 bg-transparent border-none text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-0 resize-none leading-relaxed"
              placeholder="Cole ou digite seu texto com caracteres especiais aqui..."
            ></textarea>
          </div>
        </div>

        <div class="flex flex-col bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
          
          <div class="px-6 py-4 border-b border-slate-700/50 bg-slate-800/50 flex flex-wrap gap-4 justify-between items-center">
            
            <div class="flex space-x-2">
              <button 
                v-for="fmt in formats" 
                :key="fmt.value"
                @click="setFormat(fmt.value)"
                :class="[
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200',
                  selectedFormat === fmt.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                ]"
              >
                {{ fmt.label }}
              </button>
            </div>

            <button 
              @click="copyToClipboard" 
              :disabled="!sanitizedText"
              class="flex items-center space-x-2 h-8 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg text-xs font-bold transition-all duration-200"
            >
              <span>{{ copySuccess ? 'Copiado!' : 'Copiar' }}</span>
            </button>
          </div>

          <div class="p-6 flex-grow relative">
            <textarea 
              id="sanitizedOutput" 
              readonly
              :value="sanitizedText"
              class="w-full h-72 sm:h-80 bg-transparent border-none text-white focus:outline-none resize-none leading-relaxed"
              placeholder="O resultado higienizado e formatado aparecerá aqui..."
            ></textarea>
          </div>
        </div>

      </div>

      <SiteFooter />

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SanitizedString, type TextFormat } from './domain/SanitizedString';
import SiteFooter from './components/SiteFooter.vue';

const rawText = ref('');
const sanitizedText = ref('');
const words = ref(0);
const chars = ref(0);
const copySuccess = ref(false);

const selectedFormat = ref<TextFormat>('none');

const formats: { label: string, value: TextFormat }[] = [
    { label: 'Normal', value: 'none' },
    { label: 'minúsculas', value: 'lowercase' },
    { label: 'MAIÚSCULAS', value: 'uppercase' },
    { label: 'kebab-case', value: 'slug' }
];

const processText = (): void => {
    const textObj = new SanitizedString(rawText.value);
    
    words.value = textObj.getWordCount();
    chars.value = textObj.getCharCount();
    sanitizedText.value = textObj.format(selectedFormat.value);
};

const setFormat = (format: TextFormat): void => {
    selectedFormat.value = format;
    processText(); // Reprocessa imediatamente com o novo formato
};

const copyToClipboard = async (): Promise<void> => {
    if (!sanitizedText.value) return;

    try {
        await navigator.clipboard.writeText(sanitizedText.value);
        copySuccess.value = true;
        
        setTimeout(() => {
            copySuccess.value = false;
        }, 2000);
    } catch (err) {
        console.error('Falha ao copiar texto:', err);
    }
};
</script>