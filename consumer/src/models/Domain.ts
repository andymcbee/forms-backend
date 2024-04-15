interface BaseDomain {
  domain_name: string;
  proxy_domain?: string;
}

interface Domain extends BaseDomain {
  id: number;
  created_at: Date;
}

export { BaseDomain, Domain };
