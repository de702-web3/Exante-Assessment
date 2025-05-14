<script setup lang="ts">
import { useIrradiationData } from "../composables/useIrradiationData";
import GaugeChart from "./GaugeChart.vue";

const { isLoading, error, dateStart, percentage, totalExpected } =
  useIrradiationData();
</script>

<template>
  <div
    class="lg:max-w-[550px] flex w-80 max-w-[250px] flex-col justify-start gap-4"
  >
    <div class="flex flex-col items-start gap-1 self-start" v-show="!isLoading">
      <h2 class="text-lg font-bold text-gray-800">Your solar irradiation</h2>
      <p class="text-start text-sm text-gray-600">
        Total expected solar energy this period:
        <span class="font-bold">{{ totalExpected }}kWh</span>
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
