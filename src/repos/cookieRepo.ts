import fs from "fs/promises";
import os from 'os';

const HOME = os.homedir();
const COOKIE_FILE = HOME + '/anonchat.json';

export class CookieRepo {
  async read(): Promise<string | null> {
    try {
      const data = await fs.readFile(COOKIE_FILE, 'utf-8');
      const json = JSON.parse(data);
      return json.cookie;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async write(cookie: string): Promise<void> {
    const json = JSON.stringify({ cookie });
    await fs.writeFile(COOKIE_FILE, json, 'utf-8');
  }
}