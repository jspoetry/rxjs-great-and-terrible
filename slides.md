---
# You can also start simply with 'default'
theme: ./sber
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collfections/94734566/slidev
# some information about your slides (markdown enabled)
title: |
  RxJS: Великий и Ужасный. Описываем сложную асинхронную логику вне зависимости от стека
info: |
  Как органично интегрировать RxJS в существующие проекты, выделить сложную асинхронную логику из компонентов и сделать код более читаемым и поддерживаемым.
  Карточка доклада на HolyJS - https://holyjs.ru/talks/7415b7af723d48e3901c9fc93d4517b9/
# apply unocss classes to the current slide
class: text-center
presenter: false
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: none
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
layout: intro
favicon: '/favicon.png'
---

# RxJS: Великий и Ужасный {.talk-title}
## Описываем сложную асинхронную логику<br> вне зависимости от стека

<div class="author">
  Николай Пугачев
</div>

<!--
Не читать название доклада
TODO: Подумать интро
Поработать с публикой
Аннонсировать софтфончик
-->

---
title: Вступление
src: ./pages/introduction.md
---

---
title: Что такое RxJS
src: ./pages/what-is-rxjs.md
---

---
title: RxJS vs Async
src: ./pages/rxjs-vs-async-js.md
---

---
title: Rx и Стейт менджмент
src: ./pages/state-management.md
---

---
title: RxJS и кейсы, в которых он помогает
src: ./pages/use-cases.md
---

---
title: Outro
src: ./pages/ending.md
---
