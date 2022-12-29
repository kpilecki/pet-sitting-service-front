
 export const enumToString = ( input ) => {
    return input.substring( 0, 1).concat( input.replace( "_", " ").substring( 1 ).toLowerCase() );
};

 export const parseErrors = ( errors ) => {
     const temp = errors.response.data.errors;
     let err = {};

     temp.forEach( v => {
         err[ v.field ] = v.defaultMessage;
     })
     return err;
 };