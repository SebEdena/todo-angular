import { defineConfig } from 'rollup';
import generatePackageJSON from 'rollup-plugin-generate-package-json';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  input: ['src/index.ts', 'src/models/index.ts', 'src/schemas/index.ts'],
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'commonjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
  ],
  external: ['drizzle-orm', 'drizzle-orm/pg-core', 'drizzle-zod', 'nestjs-zod'],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    generatePackageJSON({
      outputFolder: 'dist',
      baseContents: (pkg) => ({
        name: pkg.name,
        version: pkg.version,
        private: true,
        main: 'index.cjs',
        module: 'index.mjs',
        types: 'index.d.ts',
        exports: {
          '.': {
            import: './index.mjs',
            require: './index.cjs',
            types: './index.d.ts',
          },
          './models': {
            import: './models/index.mjs',
            require: './models/index.cjs',
            types: './models/index.d.ts',
          },
          './schemas': {
            import: './schemas/index.mjs',
            require: './schemas/index.cjs',
            types: './schemas/index.d.ts',
          },
        },
        dependencies: pkg.dependencies,
      }),
    }),
  ],
});
