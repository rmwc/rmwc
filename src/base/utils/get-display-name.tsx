export const getDisplayName = (childInput: any): string => {
  const child: any = Array.isArray(childInput) ? childInput[0] : childInput;
  return child?.type?.displayName || child?.constructor?.displayName || child?.displayName || child?.displayName || 'Unknown';
};
