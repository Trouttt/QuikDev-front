module.exports = {
  testEnvironment: 'jsdom', //por ser teste front
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // pastas q ele vai ignorar
  collectCoverage: true, //teste de coberura
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/stories.tsx'], // pegar dos arquivos ts e tsx,
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'] // ele vai passar essas infos desse arquivo antes de todos os testes
}
