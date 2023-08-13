export type Null<T> = T | null;
export type NullNumber = Null<number>;
export type NullString = Null<string>;
export type NullBoolean = Null<boolean>;
export type NullDate = Null<Date>;
export type OverrideKey<O, Key extends keyof O, T> = Omit<O, Key> & { [P in Key]: T };
export type NestedPartial<T> = {
	[P in keyof T]?: NestedPartial<T[P]>;
};
