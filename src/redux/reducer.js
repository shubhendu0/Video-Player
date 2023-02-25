export const videoUrl = (state="" , action) =>{
    switch(action.type){
        case "CHANGE_URL":{
            const data = action.payload
            return data;
        }
        default :
            return state;
    }
}