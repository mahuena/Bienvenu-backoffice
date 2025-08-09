import {MenuItem} from './MenuItem'
import {useIntl} from 'react-intl'

export function MenuInner() {
    const intl = useIntl()
    return (
        <>
            <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard'/>
            <MenuItem
                title='Housing'
                to='/housing'
            />

            <MenuItem
                to='/schools'
                title='Schools'
            />
            <MenuItem
                to='/cultural-tips'
                title='Cutural Tips'
            />
            <MenuItem
                to='/key-phrases'
                title='Key Phrases'
            />
        </>
    )
}
