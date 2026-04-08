import { createTheme } from '@mantine/core';

import { ButtonStyle } from '../styles/global/Button';
import { CardStyle } from '../styles/global/Card';
import { PaperStyle } from '../styles/global/Paper';
import { 
    TextInputStyle, 
    SelectStyle, 
    NumberInputStyle, 
    MultiSelectStyle,
    DateInputStyle
} from '../styles/global/Inputs';
import { TextStyle, TitleStyle } from '../styles/global/Text';
import { TableStyle } from './Table';
import { ModalStyle } from './global/Modal';
import { NavLinkStyle } from './global/NavLink';

export const appTheme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',

    headings: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
        sizes: {
            h1: { fontWeight: '700' },
            h2: { fontWeight: '700' },
        }
    },

    components: {
        Button: ButtonStyle,
        Paper: PaperStyle,
        Card: CardStyle,
        Table: TableStyle,
        Modal: ModalStyle,
        NavLink: NavLinkStyle,
        
        TextInput: TextInputStyle,
        Select: SelectStyle,
        NumberInput: NumberInputStyle,
        MultiSelect: MultiSelectStyle,
        DateInput: DateInputStyle,
        
        Text: TextStyle,
        Title: TitleStyle,
    }
});