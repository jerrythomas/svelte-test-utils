// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import dts from "rollup-plugin-dts";
import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
    },
    {
		input: 'src/register.js',
		external: ['ms'],
		output: [
			{ file: pkg.exports["./register"].main, format: 'cjs' },
			{ file: pkg.exports["./register"].module, format: 'es' }
		]
	},
	{
		input: "./types/index.d.ts",
		output: [{ file: 'index.d.ts', format: "es" }],
		plugins: [dts()],
	}
];