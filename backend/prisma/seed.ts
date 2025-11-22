import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test cliente
  const hashedPassword = await bcrypt.hash('senha123', 10);

  const cliente = await prisma.cliente.upsert({
    where: { email: 'teste@solarlead.com' },
    update: {},
    create: {
      nome: 'Solar Energy Integrador Teste',
      email: 'teste@solarlead.com',
      senha: hashedPassword,
      telefone: '5511999999999',
      subdominio: 'teste',
      whatsapp: '5511999999999',
      corPrimaria: '#10b981',
      corSecundaria: '#3b82f6',
      status: 'TRIAL',
      setupPago: false,
    },
  });

  console.log('✅ Cliente teste criado:', cliente.email);

  // Create some sample leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '5511988888888',
        cidade: 'São Paulo',
        valorConta: 'DE_500_A_1000',
        tipoImovel: 'RESIDENCIAL',
        interesse: 'ORCAMENTO_AGORA',
        status: 'NOVO',
        origem: 'landing',
        clienteId: cliente.id,
      },
    }),
    prisma.lead.create({
      data: {
        nome: 'Maria Santos',
        email: 'maria@example.com',
        telefone: '5511977777777',
        cidade: 'Campinas',
        valorConta: 'ACIMA_1000',
        tipoImovel: 'COMERCIAL',
        interesse: 'FINANCIAMENTO',
        status: 'CONTATADO',
        origem: 'meta',
        utmSource: 'facebook',
        utmMedium: 'cpc',
        clienteId: cliente.id,
      },
    }),
    prisma.lead.create({
      data: {
        nome: 'Pedro Oliveira',
        email: 'pedro@example.com',
        telefone: '5511966666666',
        cidade: 'São Paulo',
        valorConta: 'DE_200_A_500',
        tipoImovel: 'RESIDENCIAL',
        interesse: 'APENAS_INFO',
        status: 'QUALIFICADO',
        origem: 'google',
        clienteId: cliente.id,
      },
    }),
  ]);

  console.log(`✅ ${leads.length} leads de exemplo criados`);

  console.log('\n🎉 Seed completed!');
  console.log('\n📝 Credenciais de teste:');
  console.log('Email: teste@solarlead.com');
  console.log('Senha: senha123');
  console.log(`Subdomínio: ${cliente.subdominio}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
