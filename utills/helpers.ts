import { states } from "@/app/constants";

export const checkStateExist = (
  state: string,
  availableStates: string[]
): boolean => {
  const findAbvOfState = states
    .find(
      (s) =>
        s.name.toLowerCase() === state.toLowerCase() ||
        s.abv.toLowerCase() === state.toLowerCase()
    )
    ?.abv.toLowerCase();
  if (!findAbvOfState) {
    return false;
  }
  return availableStates.map((s) => s.toLowerCase()).includes(findAbvOfState);
};
