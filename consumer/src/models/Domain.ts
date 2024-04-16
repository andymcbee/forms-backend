interface BaseDomain {
  domain_name: string;
  proxy_domain?: string;
}

interface Domain extends BaseDomain {
  id: string;
  created_at: Date;
}

export { BaseDomain, Domain };
