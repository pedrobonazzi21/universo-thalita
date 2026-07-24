import { createClient } from "@libsql/client";

const url = "libsql://selibi-db-pedrobonazzi21.aws-us-east-2.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ5MjE4NjMsImlkIjoiMDE5Zjk1YTEtZmUwMS03Y2ZmLTgxNTctODAyNDc0ZGQ2NzJhIiwia2lkIjoiTU1SNjA4WlotUV8yOUtjMzdnSUJ0R2FjTkctR0M2MUlpSVlHTDlaOUZQRSIsInJpZCI6IjYxMDRjODNhLTc2YjYtNGQzYS1iZTFkLWU1ZDRlNWJkMGEyMiJ9.gRtfAd7SQWCKtTAofZhlkaz4Zv59Avq27RmFMdiJBk7rsyUg2fYa5fs45tqAl9WZV8mpZxMnH1YgUIn8EsMnCw";

console.log("Connecting to Turso...");
const client = createClient({ url, authToken });

const sql = `
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "firebaseUid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Obra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'Livro',
    "ano" INTEGER NOT NULL,
    "sinopse" TEXT,
    "capaUrl" TEXT,
    "editora" TEXT,
    "genero" TEXT,
    "nossaResenha" TEXT,
    "dataResenha" DATETIME,
    "notaEquipe" REAL,
    "personagens" TEXT,
    "curiosidades" TEXT,
    "timeline" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataPublicacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capaUrl" TEXT,
    "parceria" BOOLEAN NOT NULL DEFAULT false,
    "linkAfiliado" TEXT,
    "obraId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "PostTag" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    PRIMARY KEY ("postId", "tagId"),
    CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Comentario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "texto" TEXT NOT NULL,
    "nota" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "curtidasCount" INTEGER NOT NULL DEFAULT 0,
    "obraId" TEXT,
    "postId" TEXT,
    "usuarioId" TEXT NOT NULL,
    "parentId" TEXT,
    CONSTRAINT "Comentario_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comentario_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comentario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nota" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obraId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Avaliacao_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Curtida" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comentarioId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Curtida_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curtida_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Relacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "obraDeId" TEXT NOT NULL,
    "obraParaId" TEXT NOT NULL,
    CONSTRAINT "Relacao_obraDeId_fkey" FOREIGN KEY ("obraDeId") REFERENCES "Obra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Relacao_obraParaId_fkey" FOREIGN KEY ("obraParaId") REFERENCES "Obra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_firebaseUid_key" ON "User"("firebaseUid");
CREATE UNIQUE INDEX IF NOT EXISTS "Obra_slug_key" ON "Obra"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_key" ON "Post"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Tag_nome_key" ON "Tag"("nome");
CREATE UNIQUE INDEX IF NOT EXISTS "Avaliacao_obraId_usuarioId_key" ON "Avaliacao"("obraId", "usuarioId");
CREATE UNIQUE INDEX IF NOT EXISTS "Curtida_comentarioId_usuarioId_key" ON "Curtida"("comentarioId", "usuarioId");
`;

async function main() {
  const statements = sql.split(";").filter((s) => s.trim());
  for (const stmt of statements) {
    if (!stmt.trim()) continue;
    console.log(`Executing: ${stmt.trim().substring(0, 60)}...`);
    await client.execute(stmt.trim());
  }
  console.log("Done! All tables created on Turso.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
