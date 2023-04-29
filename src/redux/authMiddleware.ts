export const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('auth/')) {
    const authState = store.getState().auth;
    localStorage.setItem('auth', JSON.stringify(authState));
  }
  return result;
};
