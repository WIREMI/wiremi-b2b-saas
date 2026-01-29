/**
 * Currency Exchange API Service
 *
 * Supports multiple currency data providers:
 * - ExchangeRate-API (Primary, free tier)
 * - CurrencyAPI.com (Alternative)
 * - Fallback to mock data if API unavailable
 */

export interface ExchangeRate {
  currency: string
  rate: number
  name: string
  symbol: string
  flag: string
}

export interface ExchangeResponse {
  base: string
  rates: Record<string, number>
  lastUpdated: Date
  provider: string
}

// Comprehensive currency list with metadata
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
  { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr', flag: '🇮🇸' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', flag: '🇱🇧' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'रू', flag: '🇳🇵' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲' },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾' },
  { code: 'BAM', name: 'Bosnia Mark', symbol: 'KM', flag: '🇧🇦' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден', flag: '🇲🇰' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', flag: '🇷🇸' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$', flag: '🇺🇾' },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs.', flag: '🇻🇪' },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮' },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦' },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs.', flag: '🇧🇴' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷' },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲' },
] as const

// Wiremi markup configuration (20-30 basis points = 0.20% - 0.30%)
const MARKUP_BASIS_POINTS = 25 // 0.25%
const MARKUP_MULTIPLIER = 1 + (MARKUP_BASIS_POINTS / 10000)

class CurrencyAPIService {
  private cache: Map<string, { data: ExchangeResponse; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 60 * 60 * 1000 // 1 hour cache

  /**
   * Fetch exchange rates from ExchangeRate-API (free tier)
   * https://www.exchangerate-api.com/docs/free
   */
  private async fetchFromExchangeRateAPI(baseCurrency: string): Promise<ExchangeResponse> {
    try {
      const response = await fetch(`https://open.exchangerate-api.com/v6/latest/${baseCurrency}`)

      if (!response.ok) {
        throw new Error(`ExchangeRate-API error: ${response.status}`)
      }

      const data = await response.json()

      return {
        base: baseCurrency,
        rates: data.rates || {},
        lastUpdated: new Date(data.time_last_update_unix * 1000),
        provider: 'ExchangeRate-API',
      }
    } catch (error) {
      console.error('ExchangeRate-API fetch failed:', error)
      throw error
    }
  }

  /**
   * Apply Wiremi markup to exchange rates
   */
  private applyMarkup(rates: Record<string, number>): Record<string, number> {
    const markedUpRates: Record<string, number> = {}

    for (const [currency, rate] of Object.entries(rates)) {
      markedUpRates[currency] = rate * MARKUP_MULTIPLIER
    }

    return markedUpRates
  }

  /**
   * Get exchange rates with caching
   */
  async getExchangeRates(baseCurrency: string = 'USD'): Promise<ExchangeResponse> {
    const cacheKey = `rates_${baseCurrency}`
    const cached = this.cache.get(cacheKey)

    // Return cached data if fresh
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      // Fetch fresh data
      const data = await this.fetchFromExchangeRateAPI(baseCurrency)

      // Apply Wiremi markup
      data.rates = this.applyMarkup(data.rates)

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      })

      return data
    } catch (error) {
      // Return cached data if available, even if stale
      if (cached) {
        console.warn('Using stale cached data due to API error')
        return cached.data
      }

      // Fallback to mock data
      console.warn('Falling back to mock exchange rates')
      return this.getMockExchangeRates(baseCurrency)
    }
  }

  /**
   * Convert amount between currencies
   */
  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<{ convertedAmount: number; rate: number; fee: number }> {
    const rates = await this.getExchangeRates(fromCurrency)
    const rate = rates.rates[toCurrency]

    if (!rate) {
      throw new Error(`Exchange rate not available for ${toCurrency}`)
    }

    const convertedAmount = amount * rate
    const fee = amount * (MARKUP_BASIS_POINTS / 10000) // Fee is the markup amount

    return {
      convertedAmount,
      rate,
      fee,
    }
  }

  /**
   * Get formatted exchange rates for display
   */
  async getFormattedRates(baseCurrency: string = 'USD'): Promise<ExchangeRate[]> {
    const data = await this.getExchangeRates(baseCurrency)

    return SUPPORTED_CURRENCIES
      .filter(currency => currency.code !== baseCurrency && data.rates[currency.code])
      .map(currency => ({
        currency: currency.code,
        rate: data.rates[currency.code],
        name: currency.name,
        symbol: currency.symbol,
        flag: currency.flag,
      }))
  }

  /**
   * Mock exchange rates fallback
   */
  private getMockExchangeRates(baseCurrency: string): ExchangeResponse {
    const mockRates: Record<string, number> = {
      USD: 1.0,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.50,
      CNY: 7.24,
      AUD: 1.53,
      CAD: 1.36,
      CHF: 0.88,
      HKD: 7.83,
      SGD: 1.34,
      SEK: 10.87,
      KRW: 1319.50,
      NOK: 10.72,
      NZD: 1.67,
      INR: 83.12,
      MXN: 17.08,
      TWD: 31.45,
      ZAR: 18.75,
      BRL: 4.97,
      DKK: 6.89,
      PLN: 4.02,
      THB: 35.68,
      ILS: 3.64,
      IDR: 15678.90,
      CZK: 22.89,
      AED: 3.67,
      TRY: 28.95,
      HUF: 356.78,
      CLP: 912.34,
      SAR: 3.75,
      PHP: 55.87,
      MYR: 4.68,
      COP: 4123.45,
      RUB: 92.34,
    }

    // If base is not USD, adjust rates
    if (baseCurrency !== 'USD' && mockRates[baseCurrency]) {
      const baseRate = mockRates[baseCurrency]
      for (const [currency, rate] of Object.entries(mockRates)) {
        mockRates[currency] = rate / baseRate
      }
    }

    return {
      base: baseCurrency,
      rates: this.applyMarkup(mockRates),
      lastUpdated: new Date(),
      provider: 'Mock Data (Fallback)',
    }
  }

  /**
   * Get currency metadata
   */
  getCurrencyInfo(currencyCode: string) {
    return SUPPORTED_CURRENCIES.find(c => c.code === currencyCode)
  }

  /**
   * Get all supported currencies
   */
  getSupportedCurrencies() {
    return SUPPORTED_CURRENCIES
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear()
  }
}

// Export singleton instance
export const currencyAPI = new CurrencyAPIService()

// Export markup info for display
export const MARKUP_INFO = {
  basisPoints: MARKUP_BASIS_POINTS,
  percentage: (MARKUP_BASIS_POINTS / 100).toFixed(2) + '%',
  description: `Wiremi applies a competitive ${MARKUP_BASIS_POINTS} basis point (${(MARKUP_BASIS_POINTS / 100).toFixed(2)}%) markup on all currency exchanges.`,
}
