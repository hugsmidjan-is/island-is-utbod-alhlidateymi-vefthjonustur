export type GenericError = { code: number; message: string }

export type Ok<T> = { ok: true; value: T }
export type Err<T> = { ok: false; error: T }

export type Result<
  OkType = unknown,
  ErrType extends GenericError = GenericError,
> = Ok<OkType> | Err<ErrType>
