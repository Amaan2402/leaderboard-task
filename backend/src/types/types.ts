export interface ErrorType extends Error {
  statusCode?: number;
}
export type isUserExistsType = {
  type: "id" | "name";
  id?: string;
  name?: string;
};
