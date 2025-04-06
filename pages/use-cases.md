# RxJS и кейсы, которые он облегчает

---

# Таймеры

<v-clicks>

- Таймеры могут содержать много вложенной логики
- Императивное API

</v-clicks>


---
title: Мем чересчур императивное setTimeout АПИ
---

<ImageFrame>
  <img src="../assets/american-setTimeout.webp">
</ImageFrame>

--- 
class: absolute-vclick
title: Демо с софтфоном
---

<div class="grid grid-cols-2"> 
  <v-switch unmount>
    <template #0>
      <Softphone :step="1" />
    </template>
    <template #2>
      <Softphone :step="2" />
    </template>
    <template #3>
      <Softphone :step="3" />
    </template>
    <template #4>
      <Softphone :step="4" />
    </template>
    <template #5>
      <Softphone :step="5" />
    </template>
    <template #6>
      <Softphone :step="6" />
    </template>
    <template #7>
      <Softphone :step="7" />
    </template>
    <template #8>
      <Softphone :step="8" />
    </template>
    <template #9>
      <Softphone :step="9" />
    </template>
    <template #10>
      <Softphone :step="10" />
    </template>
    <template #11>
      <Softphone :step="10" captureMedia />
    </template>
  </v-switch>

<v-click at="1">

````md magic-move {at: 2, lines: true}
<<< @/components/Softphone.vue#step-1 ts {*}
<<< @/components/Softphone.vue#step-2 ts {*}
<<< @/components/Softphone.vue#step-3 ts {*}
<<< @/components/Softphone.vue#step-4 ts {*}
<<< @/components/Softphone.vue#step-5 ts {*}
<<< @/components/Softphone.vue#step-6 ts {*}
<<< @/components/Softphone.vue#step-7 ts {*}
<<< @/components/Softphone.vue#step-8 ts {*}
<<< @/components/Softphone.vue#step-9 ts {*}
<<< @/components/Softphone.vue#step-10 ts {*|*}
<<< @/snippets/callDurationReact.ts#useObservable {*|4,22|9,20|*}
````

</v-click>
</div>

<!-- 
 TODO: Добавить хайлайты
 TODO: Добавить диаграммы
 -->

---
layout: two-cols-header
---

# HTTP-клиенты

::left::

<v-clicks>

- Отменяемые запросы
- Повторные попытки
- Таймауты
- Удобный маппинг в объекты с типом `pending` | `success` | `failure`

</v-clicks>

::right::

<!-- TODO: расписать код -->

---

# WebSocket

<!--
TODO: Расписать преимущества вебсокета
TODO: Рассказать про холодный и горячий поток
-->