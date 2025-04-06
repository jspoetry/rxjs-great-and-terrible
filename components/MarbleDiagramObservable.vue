<template>
  <MarbleDiagramCore
    :width="width"
    :height="height"
    :duration="duration"
    :labels="labels"
    :events="events"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Observable } from 'rxjs';
import MarbleDiagramCore from './MarbleDiagramCore.vue';

interface MarbleEvent {
  time: number;
  value: any;
  type: 'next' | 'error' | 'complete';
  color?: string;
}

interface MarbleDiagramObservableProps {
  observable: Observable<any>;
  duration?: number;
  height?: number;
  width?: number;
  labels?: boolean;
}

const props = withDefaults(defineProps<MarbleDiagramObservableProps>(), {
  duration: 2000,
  height: 100,
  width: 600,
  labels: true,
});

const events = ref<MarbleEvent[]>([]);
const startTime = ref(0);

onMounted(() => {
  startTime.value = Date.now();
  const subscription = props.observable.subscribe({
    next: (value) => {
      const time = (Date.now() - startTime.value) / props.duration;
      events.value.push({ time, value, type: 'next' });
    },
    complete: () => {
      completeTime.value = (Date.now() - startTime.value) / props.duration;
    },
    error: (err) => {
      const time = (Date.now() - startTime.value) / props.duration;
      events.value.push({ time, value: err, type: 'error' });
    },
  });

  const completeTime = ref(0);
  onUnmounted(() => {
    subscription.unsubscribe();
    if (completeTime.value > 0) {
      events.value.push({ time: completeTime.value, value: '|', type: 'complete' });
    }
  });

  onUnmounted(() => {
    subscription.unsubscribe();
  });
});
</script>