import { composeClient } from "@/main/compose-client";

const container = composeClient();

export function useClient() {
  return container;
}
