import { ShipData } from "../redux/actions";

interface Material {
  count: number | string,
  name: string,
  explanation: string,
  notes: (d: ShipData) => string
};

export default Material;
