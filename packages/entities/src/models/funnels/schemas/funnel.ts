import { Base } from "../../../common";

export interface Stage {
  stageId: string;
  key: string;
  name: string;
  desc: string;
  dealprobability: number;
}

export interface Funnel extends Base {
  name: string;
  stages: Stage[];
  account: string;
}
