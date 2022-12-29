
 export const enumToString = ( input ) => {
    return input.substring( 0, 1).concat( input.replace( "_", " ").substring( 1 ).toLowerCase() );
};