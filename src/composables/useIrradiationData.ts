import { computed } from "vue";
import irradiationMockData from "../data/irradiation.json";
import { useQuery } from "@tanstack/vue-query";
import type { IrradiationData } from "../typings/types";
import moment from "moment";

export function useIrradiationData() {
  const { data, isLoading, error } = useQuery<IrradiationData>({
    queryKey: ["irradiationData"],
    queryFn: () => {
      return new Promise<IrradiationData>((resolve) => {
        setTimeout(() => {
          resolve(irradiationMockData);
        }, 1000);
      });
    },
  });

  const totalActualReceived = computed((): number => {
    const parameter = data.value?.parameters?.[0];
    if (!parameter?.actualValues) {
      return 0;
    }

    return parameter.actualValues.reduce((sum, item) => {
      return sum + parseFloat(item.value);
    }, 0);
  });

  // Calculate the total expected energy
  const totalExpected = computed((): number => {
    const parameter = data.value?.parameters?.[0];

    if (!parameter?.expectedValues) {
      return 0;
    }

    return parameter.expectedValues.reduce((sum, item) => {
      return sum + parseFloat(item.value);
    }, 0);
  });

  // Calculate percentage based on total sums
  const percentage = computed((): number => {
    if (totalExpected.value === 0) {
      return 0;
    }

    return Math.round((totalActualReceived.value / totalExpected.value) * 100);
  });

  const dateStart = computed((): string | null => {
    const parameter = data.value?.parameters?.[0];

    if (!parameter?.actualValues || parameter.actualValues.length === 0) {
      return null;
    }

    // Format the date as "13th January 2023" using Moment.js
    const dateTimeStr = parameter.actualValues[0].datetime;
    return moment(dateTimeStr).format('Do MMMM YYYY');
  });

  return {
    data,
    isLoading,
    error,
    percentage,
    totalExpected,
    totalActualReceived,
    dateStart,
  };
}
