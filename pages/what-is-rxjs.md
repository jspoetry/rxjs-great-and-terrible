---
layout: section
---

# Что такое RxJS

---
layout: center
title: ReactiveX
---

<div class="grid items-center min-w-[500px] absolute-vclick">
  <img class="mb-8 justify-self-center" src="../assets/rx-logo.png" width="256" height="256">

  # RxJS {v-click.hide="1" class="text-center"}

  <h1 v-click="[1, 3]" class="text-left justify-self-start mt-2">
    Reactive extensions for <LanguageCycler :runCycle="$clicks === 2" class="ml-3 absolute" />
  </h1>

  <h1 v-click="3" class="text-center -mt-2">

  [ReactiveX](https://reactivex.io/) 
  </h1>

</div>

<!-- 
RxJS - это библиотека для композиции асинхронных и событийноориентированных программ на основе наблюдаемаех последовательностей
 -->

---
layout: center
---

# RxJS -- это библиотека для реактивного программирования с использованием наблюдаемых объектов, облегчающая создание асинхронного или основанного на обратных вызовах кода

---

# Что даёт RxJS

<v-clicks>

1. Observable (a.k.a наблюдаемый объект)
2. Подписка
3. Операторы
</v-clicks>

<!--
Сделать больше текст
-->

---
title: Постер с Потоком
---

<ImageFrame>
 <img src="../assets/stream-movie.jpg" >
</ImageFrame>

---
title: Иллюстрация потока
layout: center
---

<div v-click.hide="5" class="click-stream text-4xl justify-self-center mb-8">*click*</div>

<v-switch>
  <template #1>
    <MarbleDiagram
      ascii="--------------------------------------" 
      :width="600" 
      :height="100" 
    />
  </template>

  <template #2>
    <MarbleDiagram
      ascii="--C-----C-----C-----C-----C------C----" 
      v-click
      :width="600" 
      :height="100" 
    />
  </template>

  <template #3>
    <MarbleDiagram
      ascii="--C-----C-----C-----C-----C------C----|" 
      v-click
      :width="600" 
      :height="100" 
    />
  </template>

</v-switch>

<style>
  .click-stream {
    animation: irregular-click 10s ease-in-out infinite;
  }
  .click-stream.slidev-vclick-hidden {
    animation: none;
  }

@keyframes irregular-click {
  0% { opacity: 1; }      /* Fully visible */
  19% { opacity: 0.1; }    /* Quick dip in opacity */
  25% { opacity: 1; }    /* Slightly brighter */
  40% { opacity: 0.15; }    /* Slightly brighter */
  46% { opacity: 1; }    /* Slightly brighter */
  60% { opacity: 0.2; }   /* Very faint */
  63% { opacity: 1; }    /* Slightly brighter */
  72% { opacity: 0.3; }   /* Somewhat visible */
  80% { opacity: 1; }     /* Back to fully visible */
  88% { opacity: 0.3; }     /* Back to fully visible */
  90% { opacity: 1; }     /* Back to fully visible */
  100% { opacity: 0.1; }     /* Back to fully visible */
}
</style>

<!--
TODO: Решить проблему с кликами
-->

---
layout: statement
disabled: true
---

# Поток === последовательность событий растянутая во времени

<!-- Но это концепция. А что насчёт кода? -->

---
class: absolute-vclick
---

# Observable {v-click.hide}
# Подписка {v-click="1"}


````md magic-move {at: 1}
```ts {*}{lines: true}
import { fromEvent } from 'rxjs'

const clicks$ = fromEvent('click', document)
```
```ts {*|5-7|9}{lines: true}
import { fromEvent } from 'rxjs'

const clicks$ = fromEvent('click', document)

const subscription = click$.subscribe((clickElement) => {
  console.log(clickElement)
})
```
````

<!-- Чтобы представить поток, RxJS даёт нам такой объект как Observable. Обсервабл можно перевести как "Наблюдаемый объект". Этот объект микс между массивом и EventEmitter'ом. Но такой пример кажется ничем не отличается от addEventListener. Это всё, что даёт нам Rx? -->

---
layout: two-cols-header
---

# Единый интерфейс отписки

<v-click at="1">

````md magic-move {at: 2}
```ts
const subscription = fromEvent('click', document).subscribe();
subscription.unsubscribe();
```
```ts
const subscription = timer(1000).subscribe();
subscription.unsubscribe();
```
```ts
const subscription = fromFetch('https://holyjs.ru/speakers').subscribe();
subscription.unsubscribe();
```
```ts
const subscription = webSocket('wss://holyjs.ru').subscribe();
subscription.unsubscribe();
```
````

</v-click>

::left:: 

<div class="col-wrapper">

```ts{*|none}{at: 2}
const handler = () => {
  // do something
};

document.addEventListener('click', handler);

document.removeEventListener('click', handler);
```

```ts{*|none|*|none}{at: 1}
const timerId = setTimeout(() => {
  // do something
}, 1000);

clearTimeout(timerId);
```
</div>

::right::

<div class="col-wrapper">

```ts{*|none|none|*|none}{at: 1}
const controller = new AbortController();
const { signal } = controller;

fetch('https://holyjs.ru/speakers', { signal })
  .then(response => {
    // Handle response
  })

controller.abort();
```

```ts{*|none|none|none|*}{at: 1}
const socket = new WebSocket('wss://holyjs.ru');

socket.close();
```

</div>

<style>
  .col-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 15px;
    justify-content: space-between;
    align-content: space-between;
  }
</style>


---

# Операторы 

````md magic-move
```ts {*}{lines: true}
import { fromEvent } from 'rxjs'

const clicks$ = fromEvent('click', document)

const subscription = click$.subscribe((clickElement) => {
  console.log(clickElement)
})
```
```ts{*|3,7|4-6|4|5|6|9-11}{lines: true}
import { fromEvent, debounceTime, map, filter } from 'rxjs'

const clicks$ = fromEvent('click', document).pipe(
  debounceTime(200),
  map((click) => click.target),
  filter((target) => target.tagName === 'BUTTON')
)

clicks$.subscribe((clickElement) => {
  console.log(clickElement) // Только кнопка
})
```
````

<!--
RxJS предоставляет нам ещё такие штуки как операторы. Это утилити функции на каждый случай, которые позволяет нам в одну или пару строчек декларативно расширить поведение нашего пайпа. Каждый оператор получает результат предыдущего оператора, таким образом у нас получается конвейер
TODO: Иллюстрации операторов
-->

---

# 100+ операторов

<SlidevVideo autoplay muted loop>
  <source src="../assets/rx-js-operators.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Операторов много и это иногда приводят как критерий, что RxJS слишком сложный, потому что нужно так много функций выучить, прежде чем ты сможешь писать на RxJS. Конечно, это не так. Часто используемых операторов не так много.
TODO: сравнить с lodash'ом
-->

---

# Think of RxJS as Lodash for events

<ImageFrame>
  <img src="../assets/think-about-it.jpg" />
</ImageFrame>

<!--
Вы не заучиваете весь лодаш - вы просто ищете нужные функции
-->

---
disabled: true
---

# TODO: Operator Decision Tree

<!-- 
 TODO: мем про дрейка
 -->

---
layout: two-cols-header
---

# Виды операторов

::left::

## Порождающие операторы {v-click="12"}
  <v-click>

  - Creation Operators
  - Join Creation Operators
  </v-click>

  <!-- ```ts
  const clicks$ = fromEvent('click', document);
  const refreshInterval$ = interval(5000);
  ``` -->

::right::

## Потоковые операторы {v-click="13"}
  <v-click>

  - Transformation Operators
  - Filtering Operators
  - Join Operators
  - Multicasting Operators
  - Error Handling Operators
  - Utility Operators
  - Conditional and Boolean Operators
  - Mathematical and Aggregate Operators
  </v-click>

<!-- TODO: примеры с кодом -->

---

# Разные операторы, но примерно то&nbsp;же самое

<div class="text-2xl grid items-center mt-10" v-click>


<div class="mb-4">
  <template v-for="(operator, i) of ['take', 'takeLast', 'takeWhile', 'takeUntil']">
    <span v-mark="{ at: [2 + i, 3 + i], color: 'var(--sb-blue)' }">{{ operator }}</span> 
    <template v-if="i !== 3"> - </template>
  </template>
</div>

</div>

<v-switch>
  <template #1>
    <MarbleDiagram
      ascii="1--2--3--4--5--6--7--|"
      :operators="[{ type: 'take', args: [3], resultAscii: '1--2--3|' }]"
      :width="600"
      :height="200"
      :labels="true"
    />
  </template>

  <template #2>
    <MarbleDiagram
      ascii="1--2--3--4--5--6--7--|"
      :operators="[{ type: 'takeLast', args: [3], resultAscii: '|765' }]"
      :width="600"
      :height="200"
      :labels="true"
    />
  </template>

  <template #3>
    <MarbleDiagram
      ascii="1--2--3--4--5--6--7--|"
      :operators="[{ type: 'takeWhile', args: ['(value) => value < 4'], resultAscii: '1--2--3|' }]"
      :width="600"
      :height="200"
      :labels="true"
    />
  </template>

  <template #4>
    <MarbleDiagram
      ascii="1--2--3--4--5--6--7--|"
      :operators="[{ type: 'takeUntil', args: ['notifier$'], resultAscii: '1--2|' }]"
      :width="600"
      :height="200"
      :labels="true"
    />
  </template>
</v-switch>
