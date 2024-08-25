
export const BASE_URL = "http://localhost:3000/api";

export const IndoorBillsEndpoints = {
  CREATEINDOORBILL_API: BASE_URL + "/createindoorbill",
  GETINDOORBILL_API: BASE_URL + "/getipdbill",
  GETSEARCHIPDBILLS_API: BASE_URL + "/searchipdbills",
  EDITINDOORBILL_API: BASE_URL + "/editindoorbill",
  DELETEINDOORBILL_API: BASE_URL + "/deleteindoorbill",
  GETINDOORBILLBYID_API: BASE_URL + "/getindoorbillbyid",
}
export const IpdCaseEndpoints = {
  CREATEIPDCASE_API: BASE_URL + "/createindoorcasepaper",
  GETIPDCASE_API: BASE_URL + "/getindoorcasepaperbypaggination",
  GETSEARCHIPDCASE_API: BASE_URL + "/getindoorcasepaperbysearch",
  EDITIPDCASE_API: BASE_URL + "/editindoorcasepaper",
  DELETEIPDCASE_API: BASE_URL + "/deleteindoorcasepaper",
}
