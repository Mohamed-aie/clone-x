const createError = (status,message,details=null)=>{
    // crée une nouvelle instance d'erreur vide 
    const error = new Error()
    // définit le code d'état de l'erreur en fonction du paremetre "status"
    error.status = status
    // définit le code d'état de l'erreur en fonction du paremetre "message"
    error.message = message
    // permet d'ajouter des infos supplémentaires si besoin
    error.details = details

    return error;
}

module.exports = createError; 