import { describe, it, expect } from 'vitest';
import { SanitizedString } from './SanitizedString';

describe('SanitizedString', () => {

    describe('Contadores de Caracteres e Palavras', () => {
        it('deve contar corretamente os caracteres da string original', () => {
            const text = new SanitizedString('Olá, mundo!');
            expect(text.getCharCount()).toBe(11);
        });

        it('deve contar corretamente a quantidade de palavras', () => {
            const text = new SanitizedString('Esta é uma frase de teste.');
            expect(text.getWordCount()).toBe(6);
        });

        it('deve retornar zero palavras para strings vazias ou apenas com espacos', () => {
            const emptyText = new SanitizedString('');
            const spaceText = new SanitizedString('    ');
            
            expect(emptyText.getWordCount()).toBe(0);
            expect(spaceText.getWordCount()).toBe(0);
        });

        it('deve lidar com multiplos espacos entre palavras na contagem', () => {
            const text = new SanitizedString('Duas  palavras   aqui');
            expect(text.getWordCount()).toBe(3);
        });
    });

    describe('Higienizacao Basica (formato: none)', () => {
        it('deve remover acentuacoes corretamente', () => {
            const text = new SanitizedString('Ação, Coração e Emoção!');
            expect(text.format('none')).toBe('Acao Coracao e Emocao');
        });

        it('deve remover caracteres especiais preservando letras e numeros', () => {
            const text = new SanitizedString('@User_123! Qual é o seu #ID?');
            expect(text.format('none')).toBe('User123 Qual e o seu ID');
        });

        it('deve retornar string vazia caso o texto original seja nulo ou vazio', () => {
            const text = new SanitizedString('');
            expect(text.format('none')).toBe('');
        });
    });

    describe('Formatacao de Texto', () => {
        it('deve converter o texto higienizado para letras minusculas', () => {
            const text = new SanitizedString('TÊNIS Nike Air Max!');
            expect(text.format('lowercase')).toBe('tenis nike air max');
        });

        it('deve converter o texto higienizado para letras maiusculas', () => {
            const text = new SanitizedString('Promoção imperdível: 50% off!');
            expect(text.format('uppercase')).toBe('PROMOCAO IMPERDIVEL 50 OFF');
        });

        it('deve gerar um slug (kebab-case) valido', () => {
            const text = new SanitizedString('  Ação e   Reação!  ');
            // Remove acentos -> '  Acao e   Reacao  '
            // Trim e Lowercase -> 'acao e   reacao'
            // Replace espaços -> 'acao-e-reacao'
            expect(text.format('slug')).toBe('acao-e-reacao');
        });
    });

});