import { Effect, Reducer, Subscription } from 'umi';

import enums from "../../config/enum"

export interface Code { label: string, value: string }

export interface CodeModelState {
    codes: Object,
}
export interface CodeModelType {
    namespace: 'codes';
    state: CodeModelState;
    effects: {
        query: Effect;
    };
    reducers: {
        save: Reducer<CodeModelState>;
    };
    subscriptions: { setup: Subscription };
}
const IndexModel: CodeModelType = {
    namespace: 'codes',
    state: {
        codes: enums
    },
    effects: {
        *query({ code }, { call, put }) {
            let result
            if (code === "sex") {
                result = [{ value: "0", label: "男" }, { value: "1", label: "女" }]
            } else if (code === "status") {
                result = [{ value: "0", label: "已认证" }, { value: "1", label: "未认证" }]
            }
            yield put({
                type: 'save',
                code,
                data: result
            });
        },
    },
    reducers: {
        save(state = { codes: {} }, { code, data }): CodeModelState {
            let result = state;
            if (!state.codes[code]) {
                result = {
                    ...state,
                    codes: { ...state.codes, [code]: data }
                }
            }
            return result;
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({
                        type: 'query',
                    })
                }
            });
        }
    }
};
export default IndexModel;
