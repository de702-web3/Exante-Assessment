import { computed } from "vue";
import policiesMockData from "../data/policies.json";
import { useQuery } from "@tanstack/vue-query";
import type { PolicyData } from "../typings/types";

export function usePolicyData() {
  const { data, isLoading, error } = useQuery<PolicyData>({
    queryKey: ["policyData"],
    queryFn: () => {
      return new Promise<PolicyData>((resolve) => {
        setTimeout(() => {
          resolve(policiesMockData);
        }, 1000);
      });
    },
  });

  return {
    data,
    isLoading,
    error,
  };
}
