import { isServer } from "@/utils/Environment/EnvironmentUtil";

const Provider = () => {
  const cookieFacade = async () => {
    if (isServer()) {
      return await import("./Cookie/CookieFacade.server");
    } else {
      return await import("./Cookie/CookieFacade.client");
    }
  };
  const authFacade = async () => {
    if (isServer()) {
      return await import("./Auth/AuthFacade.server");
    } else {
      return await import("./Auth/AuthFacade.client");
    }
  };

  return { authFacade, cookieFacade };
};

export default Provider;