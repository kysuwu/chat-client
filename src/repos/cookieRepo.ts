import fs from "fs/promises";

export class CookieRepo {
  constructor(private profile: string) {
    
  } 
  async read(): Promise<string | null> {
    try {
      const data = await fs.readFile(this.profile, 'utf-8');
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
    await fs.writeFile(this.profile, json, 'utf-8');
  }
}