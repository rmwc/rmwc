export type MergeInterfacesT<A, B> = A & Pick<B, Exclude<keyof B, keyof A>>;
