const SERVER = 'http://informatica.ieszaidinvergeles.org:9043/qApp/public/api/'
const SERVER_SHORT = 'http://informatica.ieszaidinvergeles.org:9043/qApp/public/'
const BODY_RENDER = 'https://crafatar.com/renders/body/'
const HEAD_RENDER = 'https://crafatar.com/avatars/'
const COLORS = [
                {color: 'BLACK', code: '&0'},{color: 'DARK_BLUE', code: '&1'},{color: 'DARK_GREEN', code: '&2'},
                {color: 'DARK_TURQUOISE', code: '&3'},{color: 'DARK_RED', code: '&4'},{color: 'PURPLE', code: '&5'},
                {color: 'DARK_YELLOW', code: '&6'},{color: 'LIGHT_GRAY', code: '&7'},{color: 'DARK_GRAY', code: '&8'},
                {color: 'LIGHT_BLUE', code: '&9'},{color: 'LIGHT_GREEN', code: '&a'},{color: 'LIGHT_TURQUOISE', code: '&b'},
                {color: 'LIGHT_RED', code: '&c'},{color: 'MAGENTA', code: '&d'},{color: 'LIGHT_YELLOW', code: '&e'},
                {color: 'WHITE', code: '&f'},{color: 'rainbow', code: 'rainbow'}
                ]

export default Object.freeze({
    SERVER: SERVER,
    SERVER_SHORT: SERVER_SHORT,
    BODY_RENDER: BODY_RENDER,
    HEAD_RENDER: HEAD_RENDER,
    COLORS: COLORS
})

