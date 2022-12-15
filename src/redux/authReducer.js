const initialState = {
    token: localStorage.getItem( "token" ) || "",
    id: localStorage.getItem( "id" ) || 0,
    username: localStorage.getItem( "username" ) ||'',
    email: '',
    roles: localStorage.getItem( "roles" ) || [],
    isLoggedIn: false
};

const authReducer = ( state = initialState, action ) => {
    if( action.type === 'logout-success' ){
        return { ...initialState };
    } else if( action.type === 'login-success' ){

        localStorage.setItem( "token", action.payload.token );
        localStorage.setItem( "id", action.payload.id );
        localStorage.setItem( "roles", action.payload.roles );
        localStorage.setItem( "username", action.payload.username );
        
        return {
            ...action.payload,
            isLoggedIn: true
        };
    }
    return state;
};

export default authReducer;