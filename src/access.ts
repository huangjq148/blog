// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    menuFilter: (item: { menuCode: string }) => {
      return currentUser?.menuCodes?.includes(item.menuCode);
    },
    // canAdmin: currentUser && currentUser.access === 'admin',
  };
}
