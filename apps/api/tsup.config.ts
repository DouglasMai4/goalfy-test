import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/infra/http/server.ts'],
	format: ['cjs'],
	target: 'es2024',
	splitting: false,
	sourcemap: true,
	clean: true,
});
