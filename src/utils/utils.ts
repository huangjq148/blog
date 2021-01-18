/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

// 将后端返回的菜单转为菜单码数组
export function translateMenuToArr(menuCodes: string[] = [], menus: { menuCode: ''; children: [] }[]){
    // eslint-disable-next-line array-callback-return
    menus.map((item: { menuCode: ''; children: [] }) => {
      menuCodes.push(item.menuCode);
      if (item.children) {
        translateMenuToArr(menuCodes, item.children);
      }
    });
    return menuCodes
}

/**
 * 下载文件
 * @param url
 */
export function downloadFile(url: string){
  try {
      const elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
      setTimeout(()=>{
          document.body.removeChild(elemIF)
      },5000)
  } catch (e) {
    alert("下载文件失败！");
  }
}
