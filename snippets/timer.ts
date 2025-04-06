// #region start
import { interval } from "rxjs";
import { useObservable } from "@vueuse/rxjs";

const time$ = interval(1000);

const time = useObservable(time$);
// #endregion start
