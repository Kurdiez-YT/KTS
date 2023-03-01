export enum MarketDataPeriod {
  ONE_MINUTE = '1m',
  THREE_MINUTE = '3m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  FOUR_HOURS = '4h',
  SIX_HOURS = '6h',
  EIGHT_HOURS = '8h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
  THREE_DAYS = '3d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1M',
}

export function numMinutes(period: MarketDataPeriod): number {
  const msInMinute = 60 * 1000;
  switch (period) {
    case MarketDataPeriod.ONE_MINUTE:
      return 1 * msInMinute;
    case MarketDataPeriod.THREE_MINUTE:
      return 3 * msInMinute;
    case MarketDataPeriod.FIVE_MINUTES:
      return 5 * msInMinute;
    case MarketDataPeriod.FIFTEEN_MINUTES:
      return 15 * msInMinute;
    case MarketDataPeriod.THIRTY_MINUTES:
      return 30 * msInMinute;
    case MarketDataPeriod.ONE_HOUR:
      return 60 * msInMinute;
    case MarketDataPeriod.TWO_HOURS:
      return 2 * 60 * msInMinute;
    case MarketDataPeriod.FOUR_HOURS:
      return 4 * 60 * msInMinute;
    case MarketDataPeriod.SIX_HOURS:
      return 6 * 60 * msInMinute;
    case MarketDataPeriod.EIGHT_HOURS:
      return 8 * 60 * msInMinute;
    case MarketDataPeriod.TWELVE_HOURS:
      return 12 * 60 * msInMinute;
    case MarketDataPeriod.ONE_DAY:
      return 24 * 60 * msInMinute;
    case MarketDataPeriod.THREE_DAYS:
      return 3 * 24 * 60 * msInMinute;
    case MarketDataPeriod.ONE_WEEK:
      return 7 * 24 * 60 * msInMinute;
    case MarketDataPeriod.ONE_MONTH:
      return 30 * 24 * 60 * msInMinute;
    default:
      throw new Error(`Invalid MarketDataPeriod: ${period}`);
  }
}
