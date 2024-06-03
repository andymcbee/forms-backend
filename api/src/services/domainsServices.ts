import { doesDomainExist } from "../repo/domainsRepo";

export const checkDomain = async (domainName: string): Promise<boolean> => {
  try {
    console.log("Domain to check::::");
    console.log(domainName);
    return await doesDomainExist(domainName);
  } catch (error) {
    console.log("Error checking  domain:", error);
    throw new Error("Error checking  domain.");
  }
};
