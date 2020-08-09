module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.admin > 1) {
            middleware(req, res, next)
        }else{
            res.status(401).send("Esse usuário não é da diretoria")
        }
    }
}