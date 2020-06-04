import { useRouteMatch } from "react-router-dom";

const useMatchedResource = (route, resource) => {
  const match = useRouteMatch(route);
  const matchedResource = match
    ? resource.find((r) => r.id === match.params.id)
    : null;

  return matchedResource;
};

export default useMatchedResource;
