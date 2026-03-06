// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // ── Vue ──────────────────────────────────────────────────────────────────
    'vue/html-self-closing': ['error', {
      html: { void: 'always', normal: 'always', component: 'always' },
    }],
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    // Izinkan v-html untuk kasus tertentu
    'vue/no-v-html': 'warn',

    // ── TypeScript ────────────────────────────────────────────────────────────
    '@stylistic/max-statements-per-line': ['error', { max: 5 }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    // Nuxt auto-import: ref, computed, useHead, useState, dll tidak perlu diimport manual.
    // Rule ini akan false-positive jika tsconfig tidak membaca .nuxt/nuxt.d.ts dengan benar.
    'no-undef': 'off', // Diserahkan ke TypeScript compiler, bukan ESLint

    // ── General ───────────────────────────────────────────────────────────────
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
})
