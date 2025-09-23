#!/usr/bin/env node

/**
 * Environment Check Script for Test Database Configuration
 * 
 * This script helps verify that your environment is properly configured
 * to run tests without the "database name must end with _test" error.
 */

import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verificador de Configuração de Ambiente para Testes\n');
console.log('='.repeat(60));

// Check current environment DATABASE_URL
const currentDatabaseUrl = process.env.DATABASE_URL;

console.log('📋 Status Atual do Ambiente:');
console.log(`DATABASE_URL definida: ${currentDatabaseUrl ? 'SIM' : 'NÃO'}`);

if (currentDatabaseUrl) {
    console.log(`Valor atual: ${currentDatabaseUrl}`);
    
    try {
        const dbUrl = new URL(currentDatabaseUrl);
        const dbName = dbUrl.pathname.slice(1);
        
        console.log(`Nome do banco: ${dbName}`);
        console.log(`Termina com '_test': ${dbName.endsWith('_test') ? 'SIM ✅' : 'NÃO ❌'}`);
        
        if (!dbName.endsWith('_test')) {
            console.log('\n🚨 PROBLEMA IDENTIFICADO!');
            console.log('A variável DATABASE_URL aponta para um banco que não termina com "_test"');
            console.log('Os testes irão falhar por razões de segurança.\n');
        }
    } catch (error) {
        console.log(`❌ URL inválida: ${error.message}`);
    }
} else {
    console.log('✅ DATABASE_URL não está definida - os testes usarão .env.test');
}

// Check .env.test configuration
console.log('\n📋 Configuração do .env.test:');
try {
    const envTestPath = join(__dirname, '.env.test');
    
    if (existsSync(envTestPath)) {
        const envTestContent = readFileSync(envTestPath, 'utf8');
        const databaseUrlLine = envTestContent.split('\n').find(line => line.startsWith('DATABASE_URL='));
        
        if (databaseUrlLine) {
            const envTestUrl = databaseUrlLine.split('=')[1].replace(/"/g, '');
            console.log(`Arquivo existe: SIM`);
            console.log(`DATABASE_URL configurada: ${envTestUrl}`);
            
            try {
                const dbUrl = new URL(envTestUrl);
                const dbName = dbUrl.pathname.slice(1);
                console.log(`Nome do banco no .env.test: ${dbName}`);
                console.log(`Termina com '_test': ${dbName.endsWith('_test') ? 'SIM ✅' : 'NÃO ❌'}`);
            } catch (error) {
                console.log(`❌ URL inválida no .env.test: ${error.message}`);
            }
        }
    } else {
        console.log('❌ Arquivo .env.test não encontrado');
    }
} catch (error) {
    console.log(`❌ Erro ao ler .env.test: ${error.message}`);
}

console.log('\n🎯 RECOMENDAÇÕES:');

if (currentDatabaseUrl && !currentDatabaseUrl.includes('_test')) {
    console.log('1. Execute: unset DATABASE_URL');
    console.log('2. Ou defina: export DATABASE_URL="postgresql://postgres:password@localhost/testdb_test?sslmode=disable"');
} else if (!currentDatabaseUrl) {
    console.log('✅ Ambiente configurado corretamente para testes!');
} else {
    console.log('✅ DATABASE_URL atual é válida para testes!');
}

console.log('\n💡 Para testar, execute: npm test');