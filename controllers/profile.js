const handleProfileGet = (req, res, knex) => {
    const {id} = req.params;

    //validate the id using a regular expression
    const idRegex = /^\d+$/;
    if(!idRegex.test(id)) {
        return res.status(400).json({error:"Invalid id"});
    }

    //continue with the database quey if the id is valid
    knex
        .select('*')
        .from('users')
        .where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
    })
    .catch(err => res.status(400).json('error getting user')) 
}

module.exports = {
    handleProfileGet : handleProfileGet
}