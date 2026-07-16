import { readFile } from 'node:fs/promises'

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')

if (!html.includes('/Project1/assets/')) {
  throw new Error('GitHub Pages build must load assets from /Project1/assets/.')
}

if (/\b(?:src|href)=["']\/assets\//.test(html)) {
  throw new Error('Root-relative /assets/ URLs do not work from the Project1 Pages subpath.')
}

console.log('GitHub Pages asset paths are valid.')
