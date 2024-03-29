import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { UserSecret } from 'src/models/userSecret';

import { CONFIG } from '../config';
import { UserSecretStorageService } from '../services/userSecretStorage';

// TODO (template preparation): Update interceptor according to API specs.

/**
 * Checks if a request should be intercepted.
 * @param config - Request config.
 */
function shouldInterceptSecret(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}

/**
 * Get authorization header value from secret.
 * @param secret User secret.
 */
function getAuthorizationHeaderValue(secret: UserSecret): string {
  return `Bearer ${secret.token}`;
}

/**
 * Interceptor to append secret to requests.
 * @param config Axios config.
 */
export async function addSecretBeforeRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
  if (!shouldInterceptSecret(config)) {
    return config;
  }

  const secret = await UserSecretStorageService.get();

  if (secret == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,

    // @ts-ignore: https://github.com/axios/axios/issues/5034
    headers: {
      ...headers,
      Authorization: getAuthorizationHeaderValue(secret),
    },
  };
}
