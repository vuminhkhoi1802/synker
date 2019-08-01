module.exports = {
    getHomeData: (req, res) => {
        let query = "SELECT * FROM `content` ORDER BY id ASC";

        db.query(query, (err, result)=> {
            if (err) {
                res.redirect('/');
                
            }
            res.render('index.html', {
                
            })
        })
    }
}