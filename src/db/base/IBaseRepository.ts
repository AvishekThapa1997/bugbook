import "server-only";
export interface IBaseRepository<Client> {
  getClient(): Client;
}
