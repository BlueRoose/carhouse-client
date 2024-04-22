import auth from "@/api/auth.js";
import cars from "@/api/cars.js";
import brands from "@/api/brands.js";
import types from "@/api/types.js";
import request from "@/api/request.js";
import search from "@/api/search.js";

export default {
  ...auth,
  ...cars,
  ...brands,
  ...types,
  ...request,
  ...search,
};