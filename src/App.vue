<script setup lang="ts">
import GaugeChart from "./components/GaugeChart.vue";
import { useIrradiationData } from "./composables/useIrradiationData";

const { isLoading, error, dateStart, percentage, totalExpected } =
  useIrradiationData();
</script>

<template>
  <div class="flex flex-col justify-start gap-4 w-80 lg:w-96">
    <div class="flex flex-col items-start gap-1 self-start" v-show="!isLoading">
      <h2 class="text-lg font-bold text-gray-800">Your solar irradiation</h2>
      <p class="text-sm text-gray-600 text-start">
        Total expected solar energy this period: <span class="font-bold">{{ totalExpected }}kWh</span>
      </p>
    </div>
    <GaugeChart
      :percentage="percentage"
      :isLoading="isLoading"
      :error="error"
      title="Total Solar Irradiation"
    />
    <p class="text-center text-sm text-gray-600" v-show="!isLoading">
      Since {{ dateStart }}, your panels have received {{ percentage }}% of the
      total expected sun
    </p>
  </div>
</template>

<style scoped></style>
