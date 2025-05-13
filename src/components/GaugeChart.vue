<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center">
      <div
        class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      ></div>
      <p class="text-gray-600">Loading solar data...</p>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="max-w-md rounded-lg bg-white p-5 text-center shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto mb-4 h-12 w-12 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h2 class="mb-2 text-lg font-bold text-gray-800">Error Loading Data</h2>
      <p class="text-gray-600">
        Sorry, we couldn't load your solar data. Please try again later.
      </p>
    </div>

    <!-- Data loaded state -->
    <div
      v-else
      class="relative mx-auto mt-5 flex w-fit flex-col items-center gap-3"
    >
      <div class="relative w-fit">
        <!-- Gauge chart -->
        <div class="gauge">
          <div class="semi-circle"></div>
          <div
            class="semi-circle--gauge"
            :style="{
              transform: `rotate(${gaugeRotationValue}deg) translate3d(0,0,0)`,
            }"
          ></div>
        </div>

        <div
          class="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 transform text-4xl font-medium text-gray-600"
        >
          {{ percentage }}%
        </div>
        <div
          class="absolute bottom-0 left-0 z-20 -translate-x-full text-sm font-medium text-gray-600"
        >
          {{ minValue }}%
        </div>
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full transform text-sm font-medium text-gray-600"
        >
          {{ (minValue + maxValue) / 2 }}%
        </div>
        <div
          class="absolute right-0 bottom-0 translate-x-full text-sm font-medium text-gray-600"
        >
          {{ maxValue }}%
        </div>
      </div>
      <div class="text-md font-bold text-gray-600">{{ title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define interface for props
interface GaugeProps {
  percentage?: number;
  title?: string;
  isLoading?: boolean;
  error?: string;
}

// Props for data and customization
const props = withDefaults(defineProps<GaugeProps>(), {
  percentage: 100,
});

const minValue = computed(() => {
  if (props.percentage <= 50) return 0;
  else if (props.percentage <= 100) return 50;
  else return 100;
});

const maxValue = computed(() => {
  if (props.percentage <= 50) return 100;
  else if (props.percentage <= 100) return 150;
  else return 200;
});

// Calculate the gauge rotation angle based on the percentage
const gaugeRotationValue = computed(() => {
  const min = minValue.value;
  const max = maxValue.value;
  const range = max - min;

  // Clamp value between min and max
  const clampedValue = Math.min(max, Math.max(min, props.percentage));

  // Calculate the percentage of the arc to fill (0 to 1)
  const normalizedPercentage = (clampedValue - min) / range;

  // Convert to rotation degrees (0% => 0 degrees, 100% => 180 degrees)
  return normalizedPercentage * 180;
});
</script>

<style scoped lang="scss">
$baseFontSize: 16;

/* Adjust inner width - smaller value creates thicker gauge ring */
$thickness: 85;

@function getSize($val) {
  @return #{$val / $baseFontSize}rem;
}

.gauge {
  position: relative;
  overflow: hidden;

  display: block;
  width: 100%;

  margin: auto;
}

// Gauge text styling
.gauge-text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 10;
}
.semi-circle {
  position: relative;

  display: block;
  width: getSize(200);
  height: getSize(100);

  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;

  &::before {
    content: "";

    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;

    display: block;
    width: getSize($thickness * 2);
    height: getSize($thickness);
    margin-left: getSize(-$thickness);

    background: #fff;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  }
}

.semi-circle--gauge {
  position: absolute;
  top: 0;
  left: 0;

  width: getSize(200);
  height: getSize(200);

  background: transparent;

  transform: rotate(120deg) translate3d(0, 0, 0);
  transform-origin: center center;
  backface-visibility: hidden;
  transition: all 0.3s ease-in-out;

  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0%;
    z-index: 2;

    display: block;
    width: getSize(202);
    height: getSize(102);
    margin: -1px 0 0 -1px;

    background: #f2f2f2;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  }
}

.semi-circle {
  background: #5b86ba;
}
</style>
