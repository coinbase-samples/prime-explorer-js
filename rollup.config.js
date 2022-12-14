import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import builtins from 'rollup-plugin-node-polyfills';
import globals from 'rollup-plugin-node-globals';
import sveltePreprocess from "svelte-preprocess";
import {config} from 'dotenv';
import replace from '@rollup/plugin-replace';
import dotenv from "dotenv"
dotenv.config() // inject the content of the .env file into 'process.env'


const path = require('path');
const production = !process.env.ROLLUP_WATCH;
const license = require('rollup-plugin-license');


function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}



export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [

		replace({
			preventAssignment: true,
			// stringify the object
			__myapp: JSON.stringify({
				env: {
					isProd: production,
					...config().parsed // attached the .env config
				}
			}),
		}),
		license({
			thirdParty: {
				output: path.join(__dirname, 'dist', 'dependencies.txt'),
				includePrivate: true, // Default is false.
			},
		}),

		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: {
					plugins: [
						require("tailwindcss"),
						require("autoprefixer"),
					],
				},
			}),
		}),

		globals({
			crypto:true
		}),
		builtins({
			crypto:true
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
			preferBuiltins: false
		}),

		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};