/** Maps event names to listener argument tuples. */
export type EventMap = { [event: string]: unknown[] };

type Listener<A extends unknown[]> = (...args: A) => void;
type AnyListener = (...args: unknown[]) => void;

/** A minimal, dependency-free, fully typed event emitter. */
export class TypedEmitter<E extends EventMap> {
  private readonly listeners = new Map<keyof E, Set<AnyListener>>();

  on<K extends keyof E>(event: K, listener: Listener<E[K]>): this {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(listener as unknown as AnyListener);
    return this;
  }

  once<K extends keyof E>(event: K, listener: Listener<E[K]>): this {
    const wrapper: Listener<E[K]> = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    return this.on(event, wrapper);
  }

  off<K extends keyof E>(event: K, listener: Listener<E[K]>): this {
    this.listeners.get(event)?.delete(listener as unknown as AnyListener);
    return this;
  }

  /** @returns whether at least one listener was called. */
  emit<K extends keyof E>(event: K, ...args: E[K]): boolean {
    const set = this.listeners.get(event);
    if (!set || set.size === 0) return false;
    for (const listener of [...set]) (listener as unknown as Listener<E[K]>)(...args);
    return true;
  }

  listenerCount(event: keyof E): number {
    return this.listeners.get(event)?.size ?? 0;
  }

  removeAllListeners(event?: keyof E): this {
    if (event === undefined) this.listeners.clear();
    else this.listeners.delete(event);
    return this;
  }
}
