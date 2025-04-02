// Skip interface with all properties needed
export interface Skip {
  id: string | number;
  size: number;
  price_before_vat: number;
  vat: number;
  hire_period_days: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  description?: string;
  weight_limit?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}