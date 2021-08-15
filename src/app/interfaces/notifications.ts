export interface NotificationBase {
  emailEnable: boolean;
  email: string;
  telegramEnable: boolean;
  telegram: NotificationTelegram;
  webPushEnable: boolean;
  webPush: string;
}

export interface NotificationTelegram {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}
