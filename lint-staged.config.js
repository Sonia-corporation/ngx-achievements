module.exports = {
  '*.{ts,js}': files => {
    return [
      `npm run affected:lint:ts:hook --files=${files.join(',')}`,
    ];
  },
  '*.{md,json,yml,html}': [
    'npm run lint:workspace',
    'npm run affected:lint:other',
  ],
};
