import type { ComponentType } from "react";
import { SessionGate } from "@/presentation/app/SessionGate";

export function withSession<P extends object>(Page: ComponentType<P>) {
  function Guarded(props: P) {
    return (
      <SessionGate>
        <Page {...props} />
      </SessionGate>
    );
  }
  Guarded.displayName = `WithSession(${Page.displayName ?? Page.name ?? "Page"})`;
  return Guarded;
}
