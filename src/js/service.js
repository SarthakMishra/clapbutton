import { Http } from './http';

/**
 * Clap service for interacting with the backend.
 */
export class Service {
  /**
   * Create a new clap service.
   * @param {string} backendUrl The URL where the backend is.
   * @param {boolean} isDev If the button is running in development mode.
   */
  constructor(backendUrl, isDev = false) {
    this.http = new Http(backendUrl);
    this.isDev = isDev;
  }

  /**
   * Get the clap count of a page.
   * @param {string} url The page URL.
   */
  async getClaps(url) {
    if (this.isDev) {
      return 0;
    }

    const response = await this.http.get('/clap', { name: 'url', value: url });
    return parseInt(response.claps, 10); // Assuming response is an object { claps: "number" }
  }

  /**
   * Submit claps for a page.
   * @param {string} url The page URL.
   * @param {number} claps The number of claps to send.
   */
  async clap(url, claps) {
    if (this.isDev) {
      return;
    }

    await this.http.post('/clap', { url, claps });
  }
}
