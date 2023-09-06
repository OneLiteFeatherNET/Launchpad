import { defineStore } from "pinia";

type EmitType = "success" | "error" | "warning" | "info";

const EMIT_TYPES: EmitType[] = ["success", "error", "warning", "info"];
const EMIT_ICONS = [
  "mdi-check",
  "mdi-alert",
  "mdi-alert-outline",
  "mdi-information-outline",
];
const EMIT_TIMEOUT = 2000;

export interface Emit {
  id?: string;
  type: EmitType;
  content: string;
  icon?: string;
  callback?: (id: string) => void;
}

export const useEmitter = defineStore("emit", {
  state: () => ({
    emits: [] as Emit[],
  }),
  actions: {
    emit(emit: Emit) {
      emit.callback ||= (id: string) => this.revokeEmit(id);
      emit.icon ||= EMIT_ICONS[EMIT_TYPES.indexOf(emit.type)];
      emit.id = crypto.randomUUID();

      this.emits.push(emit);
      setTimeout(() => emit.callback!(emit.id!), EMIT_TIMEOUT);
    },
    revokeEmit(id: string) {
      this.emits = this.emits.filter((current) => current.id !== id);
    },
  },
});
