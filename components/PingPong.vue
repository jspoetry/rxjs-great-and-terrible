<template>
  <div class="ping-pong-container">
    <h1>Ping-Pong Demo</h1>
    <div class="input-fields">
      <label for="interval">Ping Interval (ms):</label>
      <input type="number" id="interval" v-model="interval" />
      <label for="timeout">Timeout (ms):</label>
      <input type="number" id="timeout" v-model="timeout" />
    </div>

    <div class="columns" :class="{ 'timeout-error': timeoutError }">
      <div class="column">
        <h2>PING</h2>
        <div class="ping" :class="{ 'ping-active': pingActive }">PING</div>
        <div class="countdown" v-if="intervalCountdown > 0">
          Next ping in: {{ intervalCountdown }}ms
        </div>
      </div>
      <div class="column">
        <h2>PONG</h2>
        <div class="pong" :class="{ 'pong-active': pongActive }">PONG</div>
        <div class="countdown" v-if="timeoutCountdown > 0">
          Timeout in: {{ timeoutCountdown }}ms
        </div>
      </div>
    </div>

    <button @click="togglePonging">
      {{ ponging ? "Stop Ponging" : "Start Ponging" }}
    </button>
  </div>
</template>

<script>
// #region script
import { ref, onMounted, onUnmounted } from "vue";
import { useObservable, from } from "@vueuse/rxjs";
import { interval, Subject, timer, } from "rxjs";
import { map, takeUntil, tap, switchMap, startWith } from "rxjs/operators";

export default {
  setup() {
    const intervalInput = ref(1000);
    const timeoutInput = ref(3000);
    const ponging = ref(true);
    const pingActive = ref(false);
    const pongActive = ref(false);
    const timeoutError = ref(false);

    const stopSubject = new Subject();
    

    const intervalCountdown = useObservable(
      interval(100).pipe(
        map((i) => intervalInput.value - i * 100),
        takeUntil(stopSubject)
      ),
      0
    );

    const timeoutCountdown = useObservable(
      interval(100).pipe(
        map((i) => timeoutInput.value - i * 100),
        takeUntil(stopSubject)
      ),
      0
    );

    const ping$ = from(intervalInput).pipe(
      switchMap((intervalValue) => interval(intervalValue)),
      takeUntil(stopSubject),
      tap(() => {
        pingActive.value = true;
        setTimeout(() => {
          pingActive.value = false;
        }, 500);
      }),
      switchMap(() =>
        ponging.value
          ? timer(500).pipe(
              tap(() => {
                pongActive.value = true;
                setTimeout(() => {
                  pongActive.value = false;
                }, 500);
              })
            )
          : timer(0)
      )
    );

    const pingSubscription = ping$.subscribe();

    const togglePonging = () => {
      ponging.value = !ponging.value;
    };

    onUnmounted(() => {
      stopSubject.next();
      stopSubject.complete();
      pingSubscription.unsubscribe();
    });

    return {
      interval: intervalInput,
      timeout: timeoutInput,
      intervalCountdown,
      timeoutCountdown,
      timeoutError,
      ponging,
      pingActive,
      pongActive,
      togglePonging,
    };
  },
};
// #endregion script
</script>

<style scoped>
.ping-pong-container {
  font-family: sans-serif;
  text-align: center;
}

.input-fields {
  margin-bottom: 20px;
}

.input-fields label {
  margin-right: 10px;
}

.columns {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.column {
  border: 1px solid #ccc;
  padding: 20px;
  width: 45%;
  position: relative;
}

.countdown {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.timeout-error {
  background-color: #fdd;
}

.timeout-error .column {
  color: red;
}

.ping,
.pong {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  opacity: 0;
  transition: opacity 0.5s;
}

.ping-active,
.pong-active {
  opacity: 1;
}

.ping {
  left: 0;
  transform: translateY(-50%);
  transition: left 0.5s, opacity 0.5s;
}

.pong {
  left: 100%;
  transform: translateY(-50%);
  transition: left 0.5s, opacity 0.5s;
}

.ping-active {
  left: 50%;
}

.pong-active {
  left: 50%;
}
</style>