<template>
  <div class="softphone-container rounded-lg shadow-md p-4 bg-white flex flex-col items-center max-w-sm mt-1">
    <div class="call-state text-center text-blue-400 mb-4">{{ callState }}</div>
    <div class="video-container relative mb-2">
      <video ref="videoRef" class="rounded-full w-32 h-32 object-cover" autoplay muted poster="../assets/call-ava.jpg"></video>
    </div>
    <div class="call-duration text-center mb-2 min-h-8 mt-4 text-green-500 text-2xl">
      {{ callDuration }}
    </div>
    <div class="button-container flex justify-center mt-2">
      <button
        v-if="callState === 'call-awaiting'"
        class="call-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
        @click="startCall"
      >
        Call
      </button>
      <button
        v-else
        class="hangup-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
        @click="hangUp"
      >
        Hang Up
      </button>
      <button
        v-if="callState === 'in-call'"
        class="pause-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
        @click="pause"
      >
        Pause
      </button>
      <button
        v-if="callState === 'paused'"
        class="resume-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        @click="startCall"
      >
        Resume
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onUnmounted, Ref } from 'vue';
import { from, useObservable } from '@vueuse/rxjs'
import { buffer, bufferCount, endWith, filter, interval, map, pairwise, scan, skipWhile, startWith, switchMap, takeUntil, tap } from 'rxjs';

type CallState = 'call-awaiting' | 'in-call' | 'paused' 

export default {
  props: {
    step: {
      type: Number,
      default: 1
    },
    captureMedia: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const videoRef = ref<HTMLVideoElement | null>(null)

  const startVideo = async () => {
    console.log('video ref')
    if (!videoRef.value) return;
    console.log('video exists')
    if (!videoRef.value.played && videoRef.value.srcObject) {
      videoRef.value.play()
      return;
    }
    const userMedia = await navigator.mediaDevices.getUserMedia({ video: true })
    videoRef.value.srcObject = userMedia
  }
  const stopVideo = () => {
    if (!videoRef.value) return
    videoRef.value.srcObject = null;
  }
  const pauseVideo = () => {
    videoRef.value?.pause()
  }

  const callState = ref('call-awaiting');
  const callDuration = ref(0)

  const getCallStateControllers = (callState: Ref<string>) => ({
    startCall: () => callState.value = 'in-call',
    hangUp: () => callState.value = 'call-awaiting',
    pause: () => callState.value = 'paused'
  })

  const { startCall, hangUp, pause } = getCallStateControllers(callState)


  if (props.step === 1) {
    // #region step-1
    // import { ref } from 'vue'

    const callState = ref('call-awaiting');
    const callDuration = ref(0)

    const startCall = () => {
      callState.value = 'in-call';
    };
    const hangUp = () => {
      callState.value = 'call-awaiting';
    };
    const pause = () => {
      callState.value = 'paused'
    };
    // #endregion step-1

      return {
        videoRef,
        callState,
        startCall,
        hangUp,
        pause,
        callDuration
      }
    }

    if (props.step === 2) {
      // #region step-2
      // import { interval } from 'rxjs'
      // import { useObservable } from '@vueuse/rxjs'

      const callState = ref('call-awaiting');
      const callDuration$ = interval(1000);
      const callDuration = useObservable(callDuration$)
      // #endregion step-2

      return {
        callState,
        callDuration,
        ...getCallStateControllers(callState)
      }
    }

    if (props.step === 3) {
      // #region step-3
      // import { map } from 'rxjs'

      const callState = ref('call-awaiting');
      const callDuration$ = interval(1000).pipe(
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-3

      return {
        callState,
        callDuration,
        ...getCallStateControllers(callState)
      }
    }

  if (props.step === 4) {
      // #region step-4
      // import { filter } from 'rxjs'
      // import { from } from '@vueuse/rxjs'

      const callState = ref('call-awaiting');
      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        filter((state) => state === 'in-call')
      )
      const callDuration$ = interval(1000).pipe(
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-4

      return {
        callState,
        callDuration,
        ...getCallStateControllers(callState)
      }
    }

    if (props.step === 5) {
      // #region step-5
      // import { switchMap } from 'rxjs'

      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        filter((state) => state === 'in-call'),
        tap(console.log)
      )
      const callDuration$ = callStarted$.pipe(
        switchMap(() => interval(1000)),
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-5

      return {
        callDuration,
        callState,
        ...getCallStateControllers(callState)
      }
    }

    if (props.step === 6) {
      // #region step-6
      // import { takeUntil } from 'rxjs'

      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        filter((state) => state === 'in-call'),
      )
      const callEnded$ = callState$.pipe(
        filter((state) => state === 'call-awaiting'),
      )
      const callDuration$ = callStarted$.pipe(
        switchMap(() => interval(1000).pipe(
          takeUntil(callEnded$),
        )),
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-6

      return {
        callDuration,
        callState,
        ...getCallStateControllers(callState)
      }
    }

    if (props.step === 7) {
      // #region step-7
      // import { startWith, endWith } from 'rxjs'

      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        filter((state) => state === 'in-call'),
      )
      const callEnded$ = callState$.pipe(
        filter((state) => state === 'call-awaiting'),
      )
      const callDuration$ = callStarted$.pipe(
        switchMap(() => interval(1000).pipe(
          takeUntil(callEnded$),
          endWith(0)
        )),
        startWith(0),
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-7

      return {
        callDuration,
        callState,
        ...getCallStateControllers(callState)
      }
    }
    if (props.step === 8) {
      // #region step-8
      const callState = ref('call-awaiting')
      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        filter((state) => state === 'in-call'),
      )
      const callEnded$ = callState$.pipe(
        filter((state) => state === 'call-awaiting'),
      )
      const callDuration$ = callStarted$.pipe(
        switchMap(() => interval(1000).pipe(
          takeUntil(callEnded$),
          filter(() => callState.value !== 'paused'),
          endWith(0)
        )),
        startWith(0),
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-8

      return {
        callDuration,
        callState,
        ...getCallStateControllers(callState)
      }
    }

    if (props.step === 9) {
      // #region step-9
      // import { pairwise } from 'rxjs';

      const callState = ref('call-awaiting')
      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        startWith(undefined),
        pairwise(),
        filter(([prevState, state]) => ( 
          state === 'in-call' && prevState !== 'paused'
         )),
      )
      const callEnded$ = callState$.pipe(
        filter((state) => state === 'call-awaiting'),
      )
      const callDuration$ = callStarted$.pipe(
        switchMap(() => interval(1000).pipe(
          takeUntil(callEnded$),
          filter(() => callState.value !== 'paused'),
          endWith(0)
        )),
        startWith(0),
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-9

      return {
        callDuration,
        callState,
        ...getCallStateControllers(callState)
      }
    }

    if (props.step === 10) {
      // #region step-10
      // import { scan } from 'rxjs'

      const callState = ref('call-awaiting')
      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        startWith(undefined),
        pairwise(),
        filter(([prevState, state]) => (
          state === 'in-call' && prevState !== 'paused'
        )),
      )
      const callEnded$ = callState$.pipe(
        filter((state) => state === 'call-awaiting'),
      )
      const callDuration$ = callStarted$.pipe(
        switchMap(() => interval(1000).pipe(
          takeUntil(callEnded$),
          filter(() => callState.value !== 'paused'),
          scan((acc, _value) => acc + 1, 1),
          endWith(0)
        )),
        startWith(0),
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-10

      if (props.captureMedia) {
        const controller = getCallStateControllers(callState)
        const startCall = async () => {
          startVideo()
          controller.startCall()
        }
        const hangUp = () => {
          stopVideo()
          controller.hangUp()
        }
        const pause = () => {
          pauseVideo()
          controller.pause()
        }
        return {
          callState,
          callDuration,
          videoRef,
          startCall,
          hangUp,
          pause
        }
      }

      return {
        callDuration,
        callState,
        ...getCallStateControllers(callState)
      }
    }
    
    if (props.step === 11) {
      // #region step-11
      // import { scan } from 'rxjs'

      const callState = ref('call-awaiting')
      const callState$ = from(callState)
      const callStarted$ = callState$.pipe(
        startWith(undefined),
        pairwise(),
        filter(([prevState, state]) => (
          state === 'in-call' && prevState !== 'paused'
        )),
      )
      const callEnded$ = callState$.pipe(
        filter((state) => state === 'call-awaiting'),
      )
      const callDuration$ = callStarted$.pipe(
        switchMap(() => interval(1000).pipe(
          takeUntil(callEnded$),
          filter(() => callState.value !== 'paused'),
          scan((acc, _value) => acc + 1, 1),
          endWith(0)
        )),
        startWith(0),
        map((seconds) => formatTime(seconds))
      );
      const callDuration = useObservable(callDuration$)
      // #endregion step-10

      return {
        callDuration,
        callState,
        ...getCallStateControllers(callState)
      }
    }
  return {
    videoRef,
    callState,
    callDuration,
    startCall,
    hangUp,
    pause
  }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>