---
layout: center
---

# Basic Marble Diagram

<MarbleDiagram
  ascii="--a--b--c--|" 
  :width="600" 
  :height="100" 
  :labels="true" 
/>

---

# Operator Transformation

<MarbleDiagram 
  ascii="--a--b--c--|" 
  :operators="[{ type: 'map', args: [(x) => x.toUpperCase()], resultAscii: '--A--B--C--|' }]"
  :width="600" 
  :height="200" 
  :labels="true" 
/>

---

# Live Observable Demo

<MarbleDiagram
  :observable="myObservable$"
  :duration="7000"
  :width="600"
  :height="100"
  :labels="true"
/>

<script setup>
import { interval, take, map } from 'rxjs';
import MarbleDiagram from '../components/MarbleDiagram.vue';
import LanguageCycler from '../components/LanguageCycler.vue';

// Define an Observable to visualize
const myObservable$ = interval(1000).pipe(take(5),map(x => x * 2));
</script>