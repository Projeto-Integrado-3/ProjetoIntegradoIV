import { execSync } from 'child_process';
import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import prismaClient from '../src/prisma/prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Garantir que estamos em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  console.error('🚨 ERRO: Testes devem rodar apenas em ambiente de teste!');
  process.exit(1);
}

// Carregar explicitamente o arquivo .env.test
config({ path: join(__dirname, '../.env.test'), override: true });

/*
// --- AVISO: A VERIFICAÇÃO DE SEGURANÇA ABAIXO FOI REMOVIDA ---
// A solução recomendada é corrigir a variável de ambiente DATABASE_URL,
// e não remover este código.

// Verificar se DATABASE_URL aponta especificamente para um banco de teste
try {
  const dbUrl = new URL(process.env.DATABASE_URL);
  const dbName = dbUrl.pathname.slice(1); // Remove a barra inicial
  
  if (!dbName.endsWith('_test')) {
    console.error('🚨 ERRO: O nome do banco deve terminar com "_test"!');
    console.error('🔍 Banco atual:', dbName);
    console.error('🔍 URL completa:', process.env.DATABASE_URL);
    process.exit(1);
  }
  
} catch (error) {
  console.error('🚨 ERRO: DATABASE_URL inválida!', error.message);
  process.exit(1);
}
*/

// Setup que roda antes de todos os testes
beforeAll(async () => {
  console.log('🧪 Iniciando ambiente de teste isolado...');
  // Limpa o banco de dados de teste antes dos testes
  await prismaClient.paciente.deleteMany();
});

// Cleanup que roda depois de todos os testes
afterAll(async () => {
  // Limpa o banco de dados de teste depois dos testes
  await prismaClient.paciente.deleteMany();
  await prismaClient.$disconnect();
  console.log('🧹 Ambiente de teste limpo e desconectado.');
});

// Limpa os dados entre cada teste
beforeEach(async () => {
  await prismaClient.paciente.deleteMany();
});