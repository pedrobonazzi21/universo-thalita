import { createClient } from "@libsql/client";

const client = createClient({
  url: "libsql://selibi-db-pedrobonazzi21.aws-us-east-2.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ5MjE4NjMsImlkIjoiMDE5Zjk1YTEtZmUwMS03Y2ZmLTgxNTctODAyNDc0ZGQ2NzJhIiwia2lkIjoiTU1SNjA4WlotUV8yOUtjMzdnSUJ0R2FjTkctR0M2MUlpSVlHTDlaOUZQRSIsInJpZCI6IjYxMDRjODNhLTc2YjYtNGQzYS1iZTFkLWU1ZDRlNWJkMGEyMiJ9.gRtfAd7SQWCKtTAofZhlkaz4Zv59Avq27RmFMdiJBk7rsyUg2fYa5fs45tqAl9WZV8mpZxMnH1YgUIn8EsMnCw",
});

async function main() {
  const r = await client.execute("PRAGMA table_info(Obra)");
  console.log("Obra columns:", r.rows.map((x: any) => x.name).join(", "));
  const c = await client.execute("PRAGMA table_info(Capa)");
  console.log("Capa columns:", c.rows.map((x: any) => x.name).join(", "));
  const count = await client.execute("SELECT COUNT(*) as n FROM Obra");
  console.log("Obra count:", count.rows[0].n);
  const capaCount = await client.execute("SELECT COUNT(*) as n FROM Capa");
  console.log("Capa count:", capaCount.rows[0].n);
}

main();
