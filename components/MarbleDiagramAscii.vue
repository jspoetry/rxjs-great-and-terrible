<template>
  <div class="marble-diagram-container" :style="containerStyle">
    <!-- Input stream -->
    <MarbleDiagramCore
      :containerWidth="width"
      :diagramWidth="diagramWidth"
      :height="singleHeight"
      :duration="duration"
      :labels="labels"
      :events="inputEvents"
      :completeEvents="completeEvents"
      :totalDuration="duration"
    />

    <!-- Operators visualization (if operators are provided) -->
    <div v-if="hasOperators" class="operator-container">
      <div class="operator-label">
        {{ operatorLabel }}
      </div>
    </div>

    <!-- Output stream (if operators are provided) -->
    <MarbleDiagramCore
      v-if="hasOperators"
      :containerWidth="width"
      :diagramWidth="diagramWidth"
      :height="singleHeight"
      :duration="duration"
      :labels="labels"
      :events="outputEvents"
      :completeEvents="completeOutputEvents"
      :totalDuration="duration"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import MarbleDiagramCore from './MarbleDiagramCore.vue';

interface Operator {
  type: string;
  args?: any[];
  resultAscii?: string;
}

interface MarbleEvent {
  time: number;
  value: any;
  type: 'next' | 'error' | 'complete';
  color?: string;
}

interface MarbleDiagramAsciiProps {
  ascii: string;
  duration?: number;
  height?: number;
  width?: number;
  labels?: boolean;
  operators?: Operator[];
}

const inputEvents = ref<MarbleEvent[]>([]);
const outputEvents = ref<MarbleEvent[]>([]);
const completeEvents = ref<MarbleEvent[]>([]);
const completeOutputEvents = ref<MarbleEvent[]>([]);

const props = withDefaults(defineProps<MarbleDiagramAsciiProps>(), {
  duration: 2000,
  height: 100,
  width: 600,
  labels: true,
  operators: () => [],
});

const hasOperators = computed(() => props.operators && props.operators.length > 0);
const operatorLabel = computed(() => {
  if (props.operators && props.operators.length > 0) {
    const operator = props.operators[0];
    const args = operator.args ? `(${operator.args.join(', ')})` : '';
    return `${operator.type}${args}`;
  }
  return '';
});
const singleHeight = computed(() => props.height ? props.height / (hasOperators.value ? 2 : 1) : 100);
const containerStyle = computed(() => ({
  height: `${props.height}px`,
}));

const parseAscii = (ascii: string, totalFrames: number): [MarbleEvent[], MarbleEvent[]] => {
  const events: MarbleEvent[] = [];
  const complete: MarbleEvent[] = [];
  let afterComplete = false;

  for (let i = 0; i < ascii.length; i++) {
    const char = ascii[i];
    const time = i / (totalFrames - 1);
    
    if (char === '-') continue;

    if (char === '|') {
      afterComplete = true;
      // Check if the completion marker is immediately after a value
      if (i > 0 && ascii[i - 1] !== '-') {
        // Adjust the time to be slightly less than the previous value
        const lastIndex = events.length - 1;
        const previousEvent = events[lastIndex];
        if (previousEvent) {
          events.splice(lastIndex, 1, { time: time + 0.025, value: '|', type: 'complete' }, previousEvent)
        } else {
          events.push({ time, value: '|', type: 'complete' });
        }
      } else if (i === 0) {
        events.push({ time: 1, value: '|', type: 'complete'})
      } else {
        events.push({ time, value: '|', type: 'complete' });
      }
    } else if (char === '#') {
      if (afterComplete) {
        complete.push({ time, value: 'X', type: 'error' });
      } else {
        events.push({ time, value: 'X', type: 'error' });
      }
    } else {
      if (afterComplete) {
        complete.push({ time, value: char, type: 'next' });
      } else {
        events.push({ time, value: char, type: 'next' });
      }
    }
  }

  return [events, complete];
};

const calculateDiagramWidth = (ascii: string, width: number): number => {
  const baseWidth = (width / maxLength.value) * ascii.length;
  return Math.max(baseWidth, 100); // Ensure a minimum width
};

const maxLength = computed(() => {
  const outputAscii = props.operators && props.operators[0]?.resultAscii;
  return Math.max(props.ascii.length, outputAscii ? outputAscii.length : 0);
});

const diagramWidth = computed(() => calculateDiagramWidth(props.ascii, props.width));

onMounted(() => {
  const totalFrames = maxLength.value;
  const [input, complete] = parseAscii(props.ascii, totalFrames);
  inputEvents.value = input;
  completeEvents.value = complete;
  if (props.operators && props.operators.length > 0 && props.operators[0].resultAscii) {
    const [output, completeOutput] = parseAscii(props.operators[0].resultAscii, totalFrames);
    outputEvents.value = output;
    completeOutputEvents.value = completeOutput;
  }
});
</script>

<style scoped>
.marble-diagram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.operator-container {
  margin: 10px 0;
}

.operator-label {
  font-weight: bold;
}
</style>