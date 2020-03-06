from forex_python.converter import CurrencyCodes, CurrencyRates, Decimal
from flask import flash

c = CurrencyRates()
cc = CurrencyCodes()

def check_valid_code(convert_from, convert_to):
    if (convert_to not in c.get_rates('USD') and convert_from not in c.get_rates('USD')):
        flash(f'Not a valid currency code: {convert_from}', 'error')
        flash(f'Not a valid currency code: {convert_to}', 'error')
        return False
    elif (convert_to not in c.get_rates('USD')):
        flash(f'Not a valid currency code: {convert_to}', 'error')
        return False
    elif (convert_from not in c.get_rates('USD')):
        flash(f'Not a valid currency code: {convert_from}', 'error')
        return False
    return True
    
def calc_conversion(convert_from, convert_to, amount):
    symbol = cc.get_symbol(f'{convert_to}')
    conversion = c.convert(f'{convert_from}', f'{convert_to}', Decimal(f'{amount}'))
    return f'{symbol}{round(conversion, 2)}'
