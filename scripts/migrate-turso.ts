import { createClient } from "@libsql/client";

const client = createClient({
  url: "libsql://selibi-db-pedrobonazzi21.aws-us-east-2.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ5MjE4NjMsImlkIjoiMDE5Zjk1YTEtZmUwMS03Y2ZmLTgxNTctODAyNDc0ZGQ2NzJhIiwia2lkIjoiTU1SNjA4WlotUV8yOUtjMzdnSUJ0R2FjTkctR0M2MUlpSVlHTDlaOUZQRSIsInJpZCI6IjYxMDRjODNhLTc2YjYtNGQzYS1iZTFkLWU1ZDRlNWJkMGEyMiJ9.gRtfAd7SQWCKtTAofZhlkaz4Zv59Avq27RmFMdiJBk7rsyUg2fYa5fs45tqAl9WZV8mpZxMnH1YgUIn8EsMnCw",
});

async function main() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Capa" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "url" TEXT NOT NULL,
      "editora" TEXT,
      "ano" INTEGER,
      "descricao" TEXT,
      "ordem" INTEGER NOT NULL DEFAULT 0,
      "obraId" TEXT NOT NULL,
      CONSTRAINT "Capa_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);

  const r = await client.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
  console.log("Tables:", r.rows.map((x: any) => x.name).join(", "));
  console.log("Done!");
}

main();
