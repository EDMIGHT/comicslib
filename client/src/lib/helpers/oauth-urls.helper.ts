export class OAuthUrlHelper {
  public static Google() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_AUTH_REDIRECT_URL!,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  }
  public static Github() {
    const rootUrl = 'https://github.com/login/oauth/authorize';

    const options = {
      client_id: process.env.GITHUB_CLIENT_ID!,
      scope: 'user',
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  }
}
