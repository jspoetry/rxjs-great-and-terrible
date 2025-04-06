<template>
  <div class="marble-diagram">
    <svg :width="containerWidth" :height="height">
      <!-- Timeline -->
      <line 
        :x1="padding" 
        :y1="height/2" 
        :x2="containerWidth-padding" 
        :y2="height/2" 
        class="timeline"
      />
      
      <!-- Arrow at end -->
      <polygon
        :points="`${containerWidth-padding-10},${height/2-5} ${containerWidth-padding},${height/2} ${containerWidth-padding-10},${height/2+5}`"
        class="arrow"
      />

      <!-- Marble events -->
      <g v-for="event in events" :key="event.time">
        <!-- Render different shapes for different event types -->
        <circle
          v-if="event.type === 'next'"
          :cx="getXPosition(event.time)"
          :cy="height/2"
          :r="marbleRadius"
          :style="{
            fill: event.color || getColorForValue(event.value),
            '--time': event.time
          }"
          class="marble"
        />
        
        <text
          v-if="event.type === 'next' && labels"
          :x="getXPosition(event.time)"
          :y="height/2"
          class="marble-text"
          :style="{ '--time': event.time }"
        >
          {{ event.value }}
        </text>

        <!-- Complete line -->
        <line
          v-if="event.type === 'complete'"
          :x1="getXPosition(event.time) - 40"
          :y1="height/2-(marbleRadius * 1.3)"
          :x2="getXPosition(event.time) - 40"
          :y2="height/2+(marbleRadius * 1.3)"
          stroke-width="2"
          class="complete-line"
          :style="{ '--time': event.time }"
        />

        <!-- Error X -->
        <g v-if="event.type === 'error'" :style="{ '--time': event.time }">
          <line
            :x1="getXPosition(event.time)-marbleRadius"
            :y1="height/2-marbleRadius"
            :x2="getXPosition(event.time)+marbleRadius"
            :y2="height/2+marbleRadius"
            class="error-x"
          />
          <line
            :x1="getXPosition(event.time)-marbleRadius"
            :y1="height/2+marbleRadius"
            :x2="getXPosition(event.time)+marbleRadius"
            :y2="height/2-marbleRadius"
            class="error-x"
          />
        </g>
      </g>
    </svg>
    <div v-if="completeEvents.length" class="complete-column" :style="{ left: `${completePosition}px` }">
      <div v-for="(event, i) in completeEvents" :key="event.value" class="complete-event" :style="{ '--step': i + 1 }">
        <div class="marble-complete" :style="{ '--color': getColorForValue(event.value) }">{{ event.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface MarbleEvent {
  time: number;
  value: any;
  type: 'next' | 'error' | 'complete';
  color?: string;
}

interface MarbleDiagramProps {
  events: MarbleEvent[];
  completeEvents: MarbleEvent[];
  duration: number;
  height: number;
  containerWidth: number; // Renamed from width
  diagramWidth: number;
  labels: boolean;
}

const props = defineProps<MarbleDiagramProps>();

const padding = 20;
const marbleRadius = 15;

const getXPosition = (time: number) => {
  return padding + (props.diagramWidth - 2 * padding) * time;
};

const colors = [
  '#3498db', // Blue
  '#5AB0FF', // Light Blue
  '#2ecc71', // Green
  '#f1c40f', // Yellow
  '#e74c3c', // Red
  '#9b59b6', // Purple
  '#1abc9c', // Teal
  '#d35400', // Orange
];

const getColorForValue = (value: any) => {
  const hash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return hash;
  };

  const valueString = String(value);
  const index = Math.abs(hash(valueString)) % colors.length;
  return colors[index];
};

const completePosition = computed(() => {
  const completeEvent = props.events.find(event => event.type === 'complete');
  if (completeEvent) {
    return getXPosition(completeEvent.time) - padding - marbleRadius * 2;
  }
  return 0; // Default to 0 if no complete event is found
});
</script>

<style scoped>
.marble-diagram {
  font-family: sans-serif;
  position: relative; /* Required for absolute positioning of complete-column */
}

.timeline {
  stroke: #fff;
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line 2s forwards ease-in-out;
}

.arrow {
  fill: #fff;
  opacity: 0;
  animation: fade-in 0.5s forwards;
  animation-delay: 1.5s;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

.marble {
  stroke: #000;
  stroke-width: 1;
  opacity: 0;
  animation: appear 0.5s forwards;
  animation-delay: calc(var(--time) * 2s);
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.marble-text {
  font-size: 16px;
  text-anchor: middle;
  dominant-baseline: middle;
  opacity: 0;
  animation: appear 0.5s forwards;
  animation-delay: calc(var(--time) * 2s + 0.2s);
}

.complete-line {
  stroke: #fff;
  opacity: 0;
  animation: appear 0.5s forwards;
  animation-delay: calc(var(--time) * 2s);
}

.error-x {
  stroke: #fff;
  stroke-width: 2;
  opacity: 0;
  animation: appear 0.5s forwards;
  animation-delay: calc(var(--time) * 2s);
}

.complete-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: -25%;
  right: 8%;
}

.complete-event {
  margin: 5px 0;
  opacity: 0;
  animation: appear 0.5s forwards;
  animation-delay: calc((var(--step) * 0.2s) + 2s);
}

.marble-complete {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: var(--color);
  stroke: #000;
  stroke-width: 1;
}
</style>