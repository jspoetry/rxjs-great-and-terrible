<template>
  <div class="language-cycler" :class="!runCycle && 'stopped'">
    {{ currentLanguage }}
  </div>
</template>

<script setup>
import { ref, watch, computed, toRef, } from 'vue';
import { interval, scan, switchMap, map,of, NEVER, skipWhile, skipUntil, switchScan  } from 'rxjs';
import { from, toObserver, useObservable } from '@vueuse/rxjs';
import { fromEvent } from 'rxjs';

const props = defineProps({
  runCycle: {
    type: Boolean,
    default: false
  }
});

const runCycle = toRef(props, 'runCycle')

const languages = [
  "JavaScript", "C#", "Java", "Scala", "C++", "Python", "Kotlin", "Swift", "Dart", "Clojure", "Lua", "Perl", "Ruby", "Go", "Groovy", "JRuby", "PHP", "Elixir", "Julia"
];

const language = useObservable(from(runCycle).pipe(
  switchMap((runCycle) => runCycle
    ? interval(2000).pipe(scan((acc) => (acc + 1) % languages.length, 0))
    : of(0)),
));

const currentLanguage = computed(() => languages[language.value ?? 0])
</script>

<style scoped>
.language-cycler {
  display: inline-block;
  animation: fade 2s infinite;
}

.stopped {
  animation: none;
}

@keyframes fade {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>