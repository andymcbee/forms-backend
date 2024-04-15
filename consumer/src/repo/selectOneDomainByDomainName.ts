import pool from "../config/db";
import { Domain } from "../models/Domain";

export async function selectOneDomainByDomainName(
  domainName: string
): Promise<Domain> {
  try {
    const query = `
        SELECT id, domain_name, proxy_domain, created_at
        FROM domains
        WHERE domain_name = $1
      `;

    const result = await pool.query(query, [domainName]);

    if (result.rows.length === 0) {
      throw new Error(`No domain with domain name ${domainName} found.`);
    }

    if (result.rows.length > 1) {
      throw new Error(`Multiple domains with domain name ${domainName} found.`);
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
