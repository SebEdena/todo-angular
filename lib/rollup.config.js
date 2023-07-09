import terser from '@rollup/plugin-terser';
import { readdirSync } from 'fs';
import { defineConfig } from 'rollup';
import generatePackageJSON from 'rollup-plugin-generate-package-json';
import typescript from 'rollup-plugin-typescript2';

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true,
    clean: true,
  }),
  terser(),
];

const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJSON({
    outputFolder: `dist/${folderName}`,
    baseContents: (pkg) => ({
      name: `${pkg.name}/${folderName}`,
      version: pkg.version,
      private: true,
      main: './index.cjs',
      module: './index.mjs',
      types: './index.d.ts',
      dependencies: pkg.dependencies,
    }),
  }),
];

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: './dist/index.cjs',
        format: 'commonjs',
      },
      {
        file: './dist/index.mjs',
        format: 'esm',
      },
    ],
    external: ['drizzle-orm', 'drizzle-orm/pg-core', 'drizzle-zod', 'nestjs-zod'],
    plugins: [
      ...plugins,
      generatePackageJSON({
        outputFolder: 'dist',
        baseContents: (pkg) => ({
          name: pkg.name,
          version: pkg.version,
          private: true,
          main: './index.cjs',
          module: './index.mjs',
          types: './index.d.ts',
          dependencies: pkg.dependencies,
        }),
      }),
    ],
  },
  ...getDirectories('./src').map((folder) => {
    return {
      input: `src/${folder}/index.ts`,
      output: [
        {
          file: `dist/${folder}/index.cjs`,
          format: 'commonjs',
          sourcemap: true,
          exports: 'named',
        },
        {
          file: `dist/${folder}/index.mjs`,
          format: 'esm',
          sourcemap: true,
          exports: 'named',
        },
      ],
      plugins: subfolderPlugins(folder),
      external: ['drizzle-orm', 'drizzle-orm/pg-core', 'drizzle-zod', 'nestjs-zod'],
    };
  }),
]);
