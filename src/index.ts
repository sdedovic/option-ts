export class NoSuchElementException extends Error {}

export abstract class Option<T> {
  /** An Option factory which creates Some.of(x) if the argument is not null,
   *  and None if it is null.
   *
   *  @param  x the value
   *  @return   Some.of(value) if value != null, None if value == null
   */
  static of<T>(x: T): Option<T> {
    if (x == null) return None;
    else return new Some(x);
  }

  /**
   * Returns true if the option is $NONE, false otherwise.
   */
  abstract isEmpty(): boolean;

  /**
   * Returns the option's value.
   * The option must be nonEmpty.
   * @throws {NoSuchElementException} Will throw if the option is empty.
   */
  abstract get(): T;

  /**
   * Returns true if the option is an instance of $some, false otherwise.
   */
  isDefined(): boolean {
    return !this.isEmpty();
  }

  /**
   * Returns the option's value if the option is nonempty, otherwise
   * return defaultValue.
   *
   *  @param {T} defaultValue - the default expression.
   */
  getOrElse(defaultValue: T): T {
    if (this.isEmpty()) return defaultValue;
    else return this.get();
  }

  /**
   * Returns a {@link Some} containing the result of applying `f` to this {@link Option}'s
   * value if this {@link Option} is nonempty.
   * Otherwise return {@link None}.
   *
   * Note: This is similar to `flatMap` except here `f` does not need to wrap its result in an {@link Option}.
   *
   * @param {(T) => R} f - The function to apply
   * @see flatMap
   */
  map<R>(f: (i: T) => R): Option<R> {
    if (this.isEmpty()) return None;
    else return new Some(f(this.get()));
  }

  /**
   * Returns the result of applying `f` to this {@link Option}'s value if
   * this {@link Option} is nonempty.
   * Returns {@link None} if this {@link Option} is empty.
   * Slightly different from `map` in that `f` is expected to
   * return an {@link Option} (which could be {@link None}).
   *
   *  @param {(T) => R} f - the function to apply
   *  @see map
   */
  flatMap<R>(f: (i :T) => Option<R>): Option<R> {
    if (this.isEmpty()) return None;
    else return f(this.get());
  }

  /**
   * Returns this {@link Option} if it is nonempty '''and''' applying the predicate `p` to
   * this {@link Option}'s value returns true. Otherwise, return {@link None}.
   *
   *  @param {(T) => boolean} p - the predicate used for testing.
   */
  filter(p: (i: T) => boolean): Option<T> {
    if (this.isEmpty() || p(this.get())) return this;
    else return None;
  }

  /** Apply the given procedure $f to the option's value,
   *  if it is nonempty. Otherwise, do nothing.
   *
   *  @param  f   the procedure to apply.
   *  @see map
   *  @see flatMap
   */
  forEach<U>(f: (i: T) => U) {
    if (!this.isEmpty()) f(this.get());
  }
}

/**
 * @class `Some<T>` represents existing values of type `T`.
 */
export class Some<T> extends Option<T> {
  constructor(private readonly value: T) {
    super();
  }

  get(): T {
    return this.value;
  }

  isEmpty(): boolean {
    return false;
  }
}

/**
 * This class represents non-existent values.
 */
class _None extends Option<null | undefined | unknown | any> {
  isEmpty(): boolean {
    return true;
  }

  get(): any {
    throw new NoSuchElementException('None.get');
  }
}

export type None = Option<undefined>;
export const None: None = new _None();