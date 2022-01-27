import { HTTP_METHOD } from '@/constants';
import HTTPError from './HTTPError';

// ROUTE
const enum HTTP_URL {
  DEV = 'http://localhost:3000',
}

const LIMIT_DELAY_TWO_SECOND = <const>2000;

interface Error {
  message: string;
  status: number;
}

interface DefaultsHeader {
  mode?: string;
  cache?: string;
  credentials?: string;
  headers?: any;
  redirect?: string;
  referrer?: string;
}

interface ParamsProps {
  url: string;
  body?: string;
  headers: any;
  method: string;
}

interface OptionProps {
  from?: string;
  replaceURL?: string;
}

interface ReqeustParameter {
  method: string;
  headers: HeadersInit;
  body?: string;
  signal: AbortSignal;
}

export default class HTTPClient {
  private baseURL: string;
  private config: DefaultsHeader;

  constructor(defaults: DefaultsHeader) {
    this.baseURL = HTTP_URL.DEV;
    this.config = {
      mode: 'same-origin', // no-cors, cors, *same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {},
      redirect: 'follow', // manual, *follow, error
      referrer: 'client', // no-referrer, *client
      ...defaults,
    };
  }

  /**
   * 인스턴스 없이 호출 가능한 request 객체
   *
   * @param {Object} params
   * @returns
   */
  async request(params: ParamsProps, options: OptionProps) {
    const { url, body, headers, method } = params;
    const requestHeaders: HeadersInit = new Headers();
    const REQUEST_FROM = `${options.from || HTTP_METHOD.GET}`;
    const REQUEST_URL = `${options.replaceURL || this.baseURL}${url}`;

    for (const [key, value] of Object.entries(headers)) {
      requestHeaders.set(key, value as string);
    }

    /**
     * 참조 https://developer.mozilla.org/ko/docs/Web/API/AbortController
     */
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), LIMIT_DELAY_TWO_SECOND);
    const config: ReqeustParameter = {
      method,
      headers: requestHeaders,
      signal: controller.signal,
    };

    if (body) config.body = JSON.stringify(body);

    try {
      const response = await fetch(REQUEST_URL, config);
      return await this.parse(response);
    } catch (error) {
      throw new HTTPError(
        (error as Error).message,
        `[ REJECTION ] HTTPError\n> ${REQUEST_FROM}`,
        (error as Error).status,
        config,
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * 응답 본문 변환
   * - Fetch API의 Body 믹스인 활용(arrayBuffer(), blob(), json(), text(), formData())
   * - 여기서 사용하는 것은 json() 메서드, @TODO 추후 확장하기
   *
   * @param {Response} response
   * @returns
   */
  async parse(response: Response) {
    const { status } = response;
    try {
      const data = status !== 204 ? await response.json() : null;
      return { data, status };
    } catch (error) {
      return { status };
    }
  }

  /**
   * HTTP: 데이터 반환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Header} headers
   * @returns
   */
  get(url: string, headers: any, options: OptionProps) {
    return this.request(
      {
        url,
        headers: this.updateHeaders(headers),
        method: HTTP_METHOD.GET,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 생성 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async post(url: string, body: any, headers: any, options: OptionProps) {
    return await this.request(
      {
        url,
        body,
        headers: this.updateHeaders(headers),
        method: HTTP_METHOD.POST,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 전체 치환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async put(url: string, body: any, headers: any, options: OptionProps) {
    return await this.request(
      {
        url,
        body,
        headers: this.updateHeaders(headers),
        method: HTTP_METHOD.PUT,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 일부분 치환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async patch(url: string, body: any, headers: any, options: OptionProps) {
    return await this.request(
      {
        url,
        body,
        headers: this.updateHeaders(headers),
        method: HTTP_METHOD.PATCH,
      },
      options,
    );
  }

  /**
   * HTTP: 데이터 삭제 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Header} headers
   * @returns
   */
  async delete(url: string, headers: any, options: OptionProps) {
    return await this.request(
      {
        url,
        headers: this.updateHeaders(headers),
        method: HTTP_METHOD.DELETE,
      },
      options,
    );
  }

  updateHeaders(headers: any) {
    return { ...this.config.headers, ...headers };
  }
}
