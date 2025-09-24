import { execSync } from "child_process";
import { config } from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import prismaClient from "../src/prisma/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Garantir que estamos em ambiente de teste
if (process.env.NODE_ENV !== "test") {
  console.warn(
    '⚠️ Rodando testes fora do ambiente "test". Prosseguindo mesmo assim.'
  );
}

// Configurar DATABASE_URL baseado no ambiente
if (process.env.GITHUB_ACTIONS) {
  // GitHub Actions: usar localhost (será sobrescrito pelo workflow)
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL =
      "postgresql://postgres:password@localhost:5432/heliumdb_test";
  }
} else {
  // Tenta carregar .env.test, se não existir, carrega .env padrão
  try {
    config({ path: join(__dirname, "../.env.test") });
  } catch (e) {
    config({ path: join(__dirname, "../.env") });
  }
}

// Verificar se DATABASE_URL aponta especificamente para um banco de teste
try {
  const dbUrl = new URL(process.env.DATABASE_URL);
  const dbName = dbUrl.pathname.slice(1); // Remove a barra inicial
  // Aceita qualquer nome de banco, apenas avisa se não for de teste
  if (!dbName.endsWith("_test")) {
    console.warn(
      '⚠️ O nome do banco não termina com "_test". Recomenda-se usar um banco exclusivo para testes.'
    );
    console.warn("🔍 Banco atual:", dbName);
    console.warn("🔍 URL completa:", process.env.DATABASE_URL);
  }
} catch (error) {
  console.error("🚨 ERRO: DATABASE_URL inválida!", error.message);
  process.exit(1);
}

// Setup que roda antes de todos os testes
beforeAll(async () => {
  console.log("🧪 Iniciando ambiente de teste isolado...");
  // Limpa o banco de dados de teste antes dos testes
  await prismaClient.paciente.deleteMany();
});

// Cleanup que roda depois de todos os testes
afterAll(async () => {
  // Limpa o banco de dados de teste depois dos testes
  await prismaClient.paciente.deleteMany();
  await prismaClient.$disconnect();
  console.log("🧹 Ambiente de teste limpo e desconectado.");
});

// Limpa os dados entre cada teste
beforeEach(async () => {
  await prismaClient.paciente.deleteMany();
});
