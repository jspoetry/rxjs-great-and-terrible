<template>
  <MarbleDiagramAscii
    v-if="ascii"
    :ascii="ascii"
    :width="width"
    :height="height"
    :duration="duration"
    :labels="labels"
    :operators="operators"
  />
  <MarbleDiagramObservable
    v-else-if="observable"
    :observable="observable"
    :width="width"
    :height="height"
    :duration="duration"
    :labels="labels"
  />
  <div v-else>
    Please provide either ascii or observable prop.
  </div>
</template>

<script setup lang="ts">
import MarbleDiagramAscii from './MarbleDiagramAscii.vue';
import MarbleDiagramObservable from './MarbleDiagramObservable.vue';
import { Observable } from 'rxjs';

interface Operator {
  type: string;
  args?: any[];
  resultAscii?: string;
}

interface MarbleDiagramProps {
  ascii?: string;
  observable?: Observable<any>;
  duration?: number;
  height?: number;
  width?: number;
  labels?: boolean;
  operators?: Operator[];
}

defineProps<MarbleDiagramProps>();
</script>