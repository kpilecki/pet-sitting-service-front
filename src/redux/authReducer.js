const initialState = {
    token: localStorage.getItem( "token" ) || undefined,
    id: localStorage.getItem( "id" ) || 0,
    username: localStorage.getItem( "username" ) || '',
    email: '',
    roles: localStorage.getItem( "roles" ) || [],
    isLoggedIn: localStorage.getItem( "isLoggedIn" ) || false
};

const authReducer = ( state = initialState, action ) => {
    if( action.type === 'logout-success' ){
        localStorage.clear();
        const emptyState = {
            token: undefined,
            id: 0,
            username: '',
            email: '',
            roles: [],
            isLoggedIn: false
        }

        return { ...emptyState };
    } else if( action.type === 'login-success' ){

        localStorage.setItem( "token", action.payload.token );
        localStorage.setItem( "id", action.payload.id );
        localStorage.setItem( "roles", action.payload.roles );
        localStorage.setItem( "username", action.payload.username );
        localStorage.setItem( "isLoggedIn", action.payload.isLoggedIn );

        return {
            ...action.payload,
            isLoggedIn: true
        };
    }
    return state;
};

export default authReducer;