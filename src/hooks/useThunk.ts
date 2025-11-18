import type { AsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "./useRedux";

// success response
type Fulfilled<T> = T extends AsyncThunk<infer Returned, any, any> ? Returned : never;

// error response
type Rejected<T> = T extends AsyncThunk<any, any, any> ? any : never;

// run dispatch
export function useThunk<T extends AsyncThunk<any, any, any>>(thunk: T) {
    const dispatch = useAppDispatch();

    async function run(arg: Parameters<T>[0]): Promise<
        | { ok: true; data: Fulfilled<T>; }
        | { ok: false; error: Rejected<T>; }
    > {
        const result = await dispatch(thunk(arg));

        if (result.meta.requestStatus === "fulfilled") {
            return {
                ok: true,
                data: result.payload as Fulfilled<T>
            };
        }

        return {
            ok: false,
            error: result.payload as Rejected<T>
        };
    }

    return { run };
}
