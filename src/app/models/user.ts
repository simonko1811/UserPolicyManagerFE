export interface PolicyCondition {
  rule: string;
  value: string;
}

export interface Policy {
  id: string;
  name: string;
  condition: PolicyCondition;
}

export interface User {
  name: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  organizationUnit: string[];
  birthDate: string;
  registeredOn: string;
  policies: string[];
  policyObjects?: Policy[];  // 🔄 toto je nové
}
