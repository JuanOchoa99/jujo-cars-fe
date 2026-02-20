import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { getCognitoConfig } from './config';

let userPool: CognitoUserPool | null = null;

async function getUserPool(): Promise<CognitoUserPool> {
  if (userPool) return userPool;
  const config = await getCognitoConfig();
  userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolClientId,
  });
  return userPool;
}

export async function signUp(
  email: string,
  password: string,
  name?: string
): Promise<void> {
  const pool = await getUserPool();
  const attributes: CognitoUserAttribute[] = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
  ];
  if (name) {
    attributes.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
  }
  return new Promise((resolve, reject) => {
    pool.signUp(email, password, attributes, [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function signIn(email: string, password: string): Promise<{
  idToken: string;
  accessToken: string;
  refreshToken: string;
}> {
  const pool = await getUserPool();
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: pool,
  });
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();
        resolve({ idToken, accessToken, refreshToken });
      },
      onFailure: (err) => reject(err),
    });
  });
}

export async function confirmSignUp(email: string, code: string): Promise<void> {
  const pool = await getUserPool();
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: pool,
  });
  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function signOut(): Promise<void> {
  const pool = await getUserPool();
  const cognitoUser = pool.getCurrentUser();
  if (cognitoUser) cognitoUser.signOut();
}

export async function getSession(): Promise<{
  idToken: string;
  accessToken: string;
} | null> {
  const pool = await getUserPool();
  const cognitoUser = pool.getCurrentUser();
  if (!cognitoUser) return null;
  return new Promise((resolve) => {
    cognitoUser.getSession((err: unknown, session: unknown) => {
      const s = session as { isValid: () => boolean; getIdToken: () => { getJwtToken: () => string }; getAccessToken: () => { getJwtToken: () => string } } | null;
      if (err || !s || !s.isValid()) {
        resolve(null);
        return;
      }
      resolve({
        idToken: s.getIdToken().getJwtToken(),
        accessToken: s.getAccessToken().getJwtToken(),
      });
    });
  });
}

export async function getCurrentUserEmail(): Promise<string | null> {
  const pool = await getUserPool();
  const cognitoUser = pool.getCurrentUser();
  if (!cognitoUser) return null;
  return new Promise((resolve) => {
    cognitoUser.getSession((err: unknown, session: unknown) => {
      if (err || !session) {
        resolve(null);
        return;
      }
      const s = session as { getIdToken: () => { payload: { email?: string } } };
      resolve(s.getIdToken().payload.email ?? null);
    });
  });
}
