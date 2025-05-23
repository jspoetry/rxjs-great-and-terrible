---
layout: two-cols-header
title: Обо мне
---

<div class="grid grid-cols-2 gap-12"> 
  <div class="text">

  # Обо мне

  <v-clicks>

  - 6 лет во фронтенде, больше 3-х лет работаю над realtime- и WebRTC-проектах
  - В прошлом — разработчик WebSDK для WebRTC-платформы Voximplant
  - Сейчас — в команде видеоконференций Jazz
  - Выступал на предыдущем Холи с докладом про [захват медиа в WebRTC-приложениях](https://holyjs.ru/archive/2024%20Autumn/talks/7a73217c51984396b666b9c8d4df4a00)

  </v-clicks>

  </div>

  <div class="images">
    <ImageFrame class="max-h-120">
      <img src="../assets/about-me-photo.jpg">
    </ImageFrame>
  </div>
</div>

---
layout: two-cols
class: absolute-vclick
---

# Асинхронная природа <br> WebRTC-приложения

<v-clicks>

- Захват медиа
- Воспроизведение медиа
- WebSocket
- WebRTC-соединение

</v-clicks>

::right::

<div class="overflow-hidden flex justify-center items-center h-full">
  <SlidevVideo v-click="[1, 2]" autoplay muted loop>
    <source src="../assets/media-capture.mp4" />
  </SlidevVideo><SlidevVideo v-click="[2, 3]" autoplay muted loop>
    <source src="../assets/demo-jazz.mp4" />
  </SlidevVideo>
  <SlidevVideo class="-mt-1 h-full" v-click="[3, 4]" autoplay muted loop>
    <source src="../assets/websocket.mp4" />
  </SlidevVideo>
  <SlidevVideo v-click="[4, 5]" autoplay muted loop>
    <source src="../assets/webrtc.mp4" />
  </SlidevVideo>

</div>
<!--
TODO: Иллюстрации для каждого пункта
-->

---

# Почему не RxJS

<div class="number-blocks">

<v-clicks>

1. Только для Angular-приложений
2. Нужно переписать весь проект
3. В моём фреймворке уже есть реактивность
4. Очень сложный
5. Супер старый

</v-clicks>
</div>

<ImageFrame v-click v-drag="[217,62,536,516]">
  <img src="../assets/rxjs-great-and-powerful.png">
</ImageFrame>

<!--
Когда я слышал об RxJS, я даже его особо не рассматривал как инструмент, который я могу использовать в своих приложениях.

Много булетов
-->

---
title: Они не знают, что я просто чилловый парень
---

<ImageFrame>
  <img src="../assets/they-dont-know.png">
</ImageFrame>

<!--
  И в этом докладе я хочу поделиться почти двухлетним опытом использования RxJS в проекте на Реакте. И моя мотивация в этом докладе рассказать про то, как можно интегрировать RxJS в приложении на других фреймворках.
-->
