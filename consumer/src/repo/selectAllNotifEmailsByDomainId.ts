import pool from "../config/db";
import { NotifEmail } from "../models/NotifEmail";
export async function selectAllNotifEmailsByDomainId(
  domainId: string
): Promise<NotifEmail[]> {
  try {
    const query = `
        SELECT id, domain_id, email, created_at
        FROM emails
        WHERE domain_id = $1
      `;

    const result = await pool.query(query, [domainId]);

    // I don't think we need to worry about throwing an error if zero emails are associated with
    // the domain.
    // It's possible that some people will not have an email and only store
    // submissions. Keep for now until we decide concretely.

    /*     if (result.rows.length === 0) {
      throw new Error(`No emails for domain name ${domainId} found.`);
    } */

    return result.rows as NotifEmail[];
  } catch (error) {
    throw error;
  }
}
