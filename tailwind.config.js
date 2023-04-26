const production = !process.env.ROLLUP_WATCH;

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [],
  content: ['./src/**/*.svelte'],
  safelist: {
    standard: [],
    deep: [],
    greedy: [],
  },
  mode: 'jit',
  purge: {
    enabled: production, // disable purge in dev
  },
};
