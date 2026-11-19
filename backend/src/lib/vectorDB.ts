import { join } from "path";
import { connect } from "@lancedb/lancedb";
import { LanceDB } from "@langchain/community/vectorstores/lancedb";
import { embeddings } from "../llm/model";
import { cwd } from "process";

const DB_PATH = join(cwd(), "lancedb");
const TABLE = "cars";

async function createVectorDB(): Promise<LanceDB> {
  const db = await connect(DB_PATH);

  for await (const name of db.listTables()) {
    if (name === TABLE) {
      const table = await db.openTable(TABLE);
      return new LanceDB(embeddings, { table });
    }
  }

  return new LanceDB(embeddings, { uri: DB_PATH, tableName: TABLE });
}

export const vectorDB = await createVectorDB();
