interface CurrencyFormatOptions {
    value: number;
    currency?: string;
    format?: string;
    minFractionDigits?: number;
    thousandsSeparator?: string;
   }
   
   export const DivisaFormater = ({value, currency = 'MXN', format = 'es-MX', minFractionDigits = 0, thousandsSeparator = ','}: CurrencyFormatOptions) => {
    const formatter = new Intl.NumberFormat(format, {
      style: 'currency',
      currency,
      minimumFractionDigits: minFractionDigits,
      useGrouping: true,
    });
    
    const formattedValue = formatter.format(value);
    return formattedValue.replace(',', thousandsSeparator);
   }