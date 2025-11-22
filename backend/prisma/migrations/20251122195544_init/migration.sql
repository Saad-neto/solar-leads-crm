-- CreateEnum
CREATE TYPE "StatusCliente" AS ENUM ('TRIAL', 'ACTIVE', 'PAUSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NOVO', 'CONTATADO', 'QUALIFICADO', 'ORCAMENTO_ENVIADO', 'NEGOCIACAO', 'FECHADO', 'PERDIDO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "logo" TEXT,
    "corPrimaria" TEXT NOT NULL DEFAULT '#10b981',
    "corSecundaria" TEXT NOT NULL DEFAULT '#3b82f6',
    "subdominio" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "status" "StatusCliente" NOT NULL DEFAULT 'TRIAL',
    "planValue" DECIMAL(10,2) NOT NULL DEFAULT 997.00,
    "setupPago" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT NOT NULL,
    "cidade" TEXT,
    "valorConta" TEXT,
    "tipoImovel" TEXT,
    "interesse" TEXT,
    "origem" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NOVO',
    "notas" TEXT,
    "conversaCompleta" BOOLEAN NOT NULL DEFAULT false,
    "respostasBot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contatadoEm" TIMESTAMP(3),
    "qualificadoEm" TIMESTAMP(3),
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionWAHA" (
    "id" TEXT NOT NULL,
    "sessionName" TEXT NOT NULL,
    "qrCode" TEXT,
    "status" TEXT NOT NULL DEFAULT 'STOPPED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "SessionWAHA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_subdominio_key" ON "Cliente"("subdominio");

-- CreateIndex
CREATE INDEX "Cliente_email_idx" ON "Cliente"("email");

-- CreateIndex
CREATE INDEX "Cliente_subdominio_idx" ON "Cliente"("subdominio");

-- CreateIndex
CREATE INDEX "Lead_clienteId_createdAt_idx" ON "Lead"("clienteId", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_telefone_idx" ON "Lead"("telefone");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_clienteId_idx" ON "Usuario"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionWAHA_sessionName_key" ON "SessionWAHA"("sessionName");

-- CreateIndex
CREATE UNIQUE INDEX "SessionWAHA_clienteId_key" ON "SessionWAHA"("clienteId");

-- CreateIndex
CREATE INDEX "SessionWAHA_sessionName_idx" ON "SessionWAHA"("sessionName");

-- CreateIndex
CREATE INDEX "SessionWAHA_status_idx" ON "SessionWAHA"("status");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
