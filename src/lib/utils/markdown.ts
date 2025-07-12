import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import shell from 'highlight.js/lib/languages/shell';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';

// 지원 언어 목록
const supportedLanguages = [
	{ name: 'javascript', module: javascript },
	{ name: 'typescript', module: typescript },
	{ name: 'css', module: css },
	{ name: 'html', module: html },
	{ name: 'json', module: json },
	{ name: 'shell', module: shell },
	{ name: 'python', module: python },
	{ name: 'java', module: java },
	{ name: 'sql', module: sql },
	{ name: 'yaml', module: yaml },
	{ name: 'markdown', module: markdown }
];

/** highlight.js 초기화 및 언어 등록 */
export function initializeHighlight(): void {
	supportedLanguages.forEach(({ name, module }) => {
		hljs.registerLanguage(name, module);
	});
}

/** parser 초기화 */
export function initializeMarkdown(): void {
	marked.use({
		breaks: true,
		gfm: true
	});
}

/** markdown을 html로 변환 */
export function parseMarkdown(content: string): string {
	return marked.parse(content) as string;
}

export function highlightCodeBlocks(): void {
	if (typeof window === 'undefined') return;

	const codeBlocks = document.querySelectorAll('pre code:not(.hljs)');
	codeBlocks.forEach((block) => {
		hljs.highlightElement(block as HTMLElement);
	});
}

export function initializeMarkdownSystem(): void {
	initializeHighlight();
	initializeMarkdown();
} 