export interface ActionParameter {
  enable: boolean;
  sensor: string;
  value: number;
}

export interface Action {
  automationEnable: boolean;
  automationParameter: ActionParameter[];
  automationAttemp: number;
  lastAction: string;
  routineTaskEnable: boolean;
  routineTaskSkipIfExceedParameter: boolean;
  routineTaskTime: string;
}

export interface ActionDetail {
  automationEnable?: boolean;
  automationParameter?: ActionParameter[];
  automationAttemp?: number;
  routineTaskEnable?: boolean;
  routineTaskSkipIfExceedParameter?: boolean;
  routineTaskTime?: string;
}
