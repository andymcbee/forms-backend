import pool from "../config/db";

export const doesDomainExist = async (domainName: string): Promise<boolean> => {
  try {
    const query = `SELECT domain_name FROM domains WHERE domain_name=$1`;

    const data = [domainName];

    const result = await pool.query(query, data);
    return result.rows.length > 0;
  } catch (error) {
    console.log("Error fetching  domain:", error);
    throw new Error("Error fetching  domain.");
  }
};
