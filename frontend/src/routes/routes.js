const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  messagesPath: () => [apiPath, 'data'].join('/'),
  mainPagePath: () => '/',
  emptyPath: () => '#',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  page404Path: () => '*',
};
