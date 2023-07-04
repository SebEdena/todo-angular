import { defineConfig } from 'rollup';
import generatePackageJSON from 'rollup-plugin-generate-package-json';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].cjs.js',
      format: 'commonjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      dir: 'dist',
      entryFileNames: '[name].esm.js',
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
        type: 'module',
        main: 'index.cjs.js',
        module: 'index.esm.js',
        types: 'index.d.ts',
        exports: {
          '.': {
            import: './index.esm.js',
            require: './index.cjs.js',
            types: './index.d.ts',
          },
          './models': {
            import: './models/index.esm.js',
            require: './models/index.cjs.js',
            types: './models/index.d.ts',
          },
          './schemas': {
            import: './schemas/index.esm.js',
            require: './schemas/index.cjs.js',
            types: './schemas/index.d.ts',
          },
        },
        dependencies: pkg.dependencies,
      }),
    }),
  ],
});
