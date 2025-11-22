import { Coordinates } from "@/types/global";

type RoutingMachineProps = {
  startPosition: Coordinates;
  endPosition: Coordinates;
};

const RoutingMachine = ({
  startPosition,
  endPosition,
}: RoutingMachineProps) => {
  console.log(startPosition, "START");
  console.log(endPosition, "END");
  return null;
};

export default RoutingMachine;
