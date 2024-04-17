interface BaseNotifEmail {
  domain_id: string;
  email: string;
}

interface NotifEmail extends BaseNotifEmail {
  id: string;
  created_at: Date;
}

export { BaseNotifEmail, NotifEmail };
