export interface Policy {
  id: string;
  name: string;
  condition: {
    rule: string;
    value: string | number;
  };
}