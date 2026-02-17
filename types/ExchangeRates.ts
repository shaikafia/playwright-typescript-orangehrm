

export type ExchangeRates = {
    success: boolean;
    error?: {
      code: number;
      type: string;
      info: string;
    };
  };