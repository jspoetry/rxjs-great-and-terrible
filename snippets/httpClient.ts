import { ajax } from "rxjs/ajax";
import { map, timeout } from "rxjs/operators";

const httpRequest = (url: string) => {
  return ajax(url).pipe(map((response) => response.response));
};

const httpRequest = (url: string) => {
  return ajax(url).pipe(map((response) => response.response));
};
