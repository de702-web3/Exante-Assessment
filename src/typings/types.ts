export interface IrradiationValue {
    datetime: string
    value: string
  }
  
  export interface IrradiationParameter {
    actualValues: IrradiationValue[]
    expectedValues?: IrradiationValue[]
  }
  
  export interface IrradiationData {
    location: string
    parameters: IrradiationParameter[]
  }
  
  export interface Policy {
    currency: string
    policyExpireDate: string
    policyNumber: string
    policyStartDate: string
    status: string
    triggerZoneUuid: string
    uuid: string
  }
  
  export interface PolicyData {
    policies: Policy[]
  }
  