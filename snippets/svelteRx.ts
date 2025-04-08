<script>
  import { interval, startWith } from 'rxjs';

  const timer$ = interval(1000).pipe(
    startWith(0)
  );
</script>

<p>Счетчик: {$timer$}</p>