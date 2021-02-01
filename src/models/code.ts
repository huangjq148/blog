import { useState } from 'react';
import request from '@/utils/request';

type Code = { value: string; label: string; status: string };

const fetchRemoteCode = async (codeName: string) => {
  return request(`/code/${codeName}`);
};

function arrToEnum(code: Code[]) {
  const result = {};
  if (code?.length) {
    // eslint-disable-next-line array-callback-return
    code.map((item: Code) => {
      result[item.value] = {
        text: item.label,
        status: item.status,
      };
    });
  }
  return result;
}

export default () => {
  const [codes, setCodes] = useState({});
  const [codeEnum, setCodeEnum] = useState({});

  async function fetchCode(codeName: string) {
    const result = await fetchRemoteCode(codeName);
    setCodes({
      ...codes,
      [codeName]: result.map((item: Code) => ({ value: item.value, label: item.label })),
    });
    setCodeEnum({
      ...codeEnum,
      [codeName]: arrToEnum(result),
    });
    return result;
  }

  async function getCode(codeName: string, isCodeCache: boolean = true) {
    let result = '';
    // eslint-disable-next-line no-empty
    // if (!codes[codeName] || isCodeCache === false) {
    if (!codes[codeName]) {
      result = await fetchCode(codeName);
    }

    return result;
  }

  return { codes, codeEnum, getCode };
};
